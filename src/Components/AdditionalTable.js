import React from 'react';
import { Divider, Table } from 'antd';
import { careerColumns } from '../Columns/career';

const AdditionalTable = ({ careerData, year }) => {
  const data = Array.isArray(careerData) ? careerData.filter((i) => i.year === year) : [];

  return (
    <div>
      <Divider><h1 className='text-2xl'>Details for the Year {year}</h1></Divider>
      <Table dataSource={data} columns={careerColumns} rowKey="year" pagination={false} />
    </div>
  );
};

export default AdditionalTable;
