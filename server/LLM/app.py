# backend.py
from flask import Flask, request, jsonify
from langchain_community.document_loaders import CSVLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
import os
import warnings

app = Flask(__name__)

# Load environment variables
load_dotenv()

# Load CSV file
loader = CSVLoader(file_path="salaries_forLLM.csv")
documents = loader.load()

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings()

# Define batch size
batch_size = 1000

# Initialize FAISS index
warnings.filterwarnings("ignore")
db = None  # Placeholder for the FAISS index

# Initialize Chatbot
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613")
template = """
You are a job consultancy company representative. 
I will share a prospect's message with you and you will give me the best answer that I should send to this propects based on the record 
1/ Response should be according to the provided record, in terms of factual data and details.

2/ If the record are irrelevant, then simply say "Data can't be found" in a professional way.

Below is a message I received from the prospect:
 {message}

Here is a list of record of the information demaded by the propects in the similar scenario
{record}

Please write the best response that I should send to this prospect:
"""

prompt = PromptTemplate(input_variables=["message", "record"], template=template)
chain = LLMChain(llm=llm, prompt=prompt)


@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data['message']

    try:
        global db
        if db is None:
            db = FAISS.from_documents(documents, embeddings)

        # Retrieve chatbot response
        response = generate_response(message)
        return jsonify({'response': response})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def retrieve_info(query):
    similar_response = db.similarity_search(query, k=1)
    page_contents_array = [doc.page_content for doc in similar_response]
    return page_contents_array[0] if page_contents_array else None


def generate_response(message):
    record = retrieve_info(message)
    response = "Data can't be found" if record is None else chain.run(message=message, record=record)
    return response


if __name__ == '__main__':
    app.run(debug=True)
