// TableComponent.js
import '../App.css'
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Graph from './Graph';
import { getDataCareer } from '../Helper/CareerBasedData';
import AdditionalTable from './AdditionalTable';
import { columns } from '../Columns/main';

const TableComponent = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [year,setYear]=useState(0)
  const [careerData, setCareerData] = useState([
    {
      year: "2024",
      Machine_Learning_Engineer: {},
      Data_Analyst: {},
      Data_Scientist: {},
      Data_Engineer: {},
      Research_Scientist: {},
    },
    {
      year: "2023",
      Machine_Learning_Engineer: {},
      Data_Analyst: {},
      Data_Scientist: {},
      Data_Engineer: {},
      Research_Scientist: {},
    },
    {
      year: "2022",
      Machine_Learning_Engineer: {},
      Data_Analyst: {},
      Data_Scientist: {},
      Data_Engineer: {},
      Research_Scientist: {},
    },
    {
      year: "2021",
      Machine_Learning_Engineer: {},
      Data_Analyst: {},
      Data_Scientist: {},
      Data_Engineer: {},
      Research_Scientist: {},
    },
    {
      year: "2020",
      Machine_Learning_Engineer: {},
      Data_Analyst: {},
      Data_Scientist: {},
      Data_Engineer: {},
      Research_Scientist: {},
    }
  ]);

  const filterData = () => {
    try {
      const filtered = data.filter(row => row['job_title'] === 'ML Engineer');
      setFilteredData(filtered);
    } catch (error) {
      console.log(error);
    }
  };


  const handleRowClick = (record) => {
    console.log("hey");
    setYear(record.work_year)
    setVisible(true)
  }

  useEffect(() => {
    filterData();
  }, [data]);

  useEffect(() => {
    getDataCareer({ data, careerData, setCareerData });
  }, [data]);

  return (
    <div className='flex flex-col'>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <Graph data={filteredData} />
      <div className={`model z-50 ${visible ? "visible" : ""} `}>
        <AdditionalTable  careerData={careerData} year={year}/>
        <button className='bg-white border-solid border-2 text-black border-black p-1 px-4 hover:bg-red-700 transition-all hover:text-white mt-10' onClick={() => setVisible(false)}>Close</button>
      </div>
    </div>
  );
};

export default TableComponent;
