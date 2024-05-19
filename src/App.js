import React, { useEffect, useState } from 'react';
import TableComponent from './Components/Table';
import { loadData } from './Helper/loadData';
import { Divider } from 'antd';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = await loadData();
        setData(parsedData);
        // console.log(parsedData)
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Divider><h1 className='text-4xl my-10'>Main Table</h1></Divider>
      {data == null ? <h1>processing</h1> : <TableComponent data={data} />}
    </div>
  );
};

export default App;