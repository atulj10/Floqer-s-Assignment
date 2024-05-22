import React, { useState } from 'react'
import axios from 'axios';
import { Divider } from 'antd';


const Chatbox = () => {
    const [chat, setChat] = useState([
        {
            query: null,
            response: null
        }
    ]);
    const [loading, setLoading] = useState(false)
    const [currentQuery, setCurrentQuery] = useState('')

    const submitQuery = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/chatbot`, { message: currentQuery })
            //below code was only for testing of the design of the chatbot box
            // setTimeout(() => {
            //     setChat(prev => [...prev, { query: currentQuery, response: "reponse" }])
            //     setLoading(false)
            //     window.scrollBy(0, 100)
            // }, 2000);
            setCurrentQuery("")
            setChat(prev => [...prev, { query: currentQuery, response: response }])
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='flex flex-col p-5 '>
                <Divider><h1 className='text-3xl'>CHAT WITH US</h1></Divider>
                <div className='self-center rounded-t-lg w-[80%] my-5 mb-0 contentBox bg-blue-200 p-10 border-r-2 border-l-2 border-t-2 border-black'>
                    {chat.map((c, index) => (
                        <div key={index} className='flex flex-col w-full my-2'>
                            {c.response != null &&
                                (
                                    <div className='text-2xl bg-blue-400 w-[40%] p-3 rounded-t-2xl rounded-bl-2xl response self-start'>
                                        <p>{c.response}</p>
                                    </div>)}
                            {c.query != null &&
                                (
                                    <div className='text-2xl bg-blue-400 w-[40%] p-3 break-words rounded-t-2xl rounded-br-2xl query self-end'>
                                        <p>{c?.query}</p>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
                <div className='queryBox self-center  w-[80%]'>
                    <input type='textarea' className='border-2 bg-transparent rounded-bl-lg text-black border-r-0 border-black w-[80%]  focus:outline-none transition-all focus:border-3 focus:border-blue-500 py-3 px-8' placeholder='Enter your query' value={currentQuery} onChange={(e) => { setCurrentQuery(e.target.value) }} />
                    <button className='border-2 border-black rounded-br-lg w-[20%] p-3 px-8  hover:bg-black hover:text-white transition-all' onClick={submitQuery}>{loading ? "Processing" : "SEND"}</button>
                </div>
            </div>
        </>
    )
}

export default Chatbox
