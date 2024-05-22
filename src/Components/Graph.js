import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const Graph = ({ data }) => {
    const [main, setMain] = useState([
        { year: "2024", salary: 0 ,employee:0},
        { year: "2023", salary: 0 ,employee:0},
        { year: "2022", salary: 0 ,employee:0},
        { year: "2021", salary: 0 ,employee:0},
        { year: "2020", salary: 0 ,employee:0}
    ]);

    const adjustData = () => {
        try {
            const updatedData = main.map((item) => {
                let sum = 0;
                let count = 0;
                data.forEach((i) => {
                    if (i.work_year === item.year) {
                        count++;
                        sum += parseFloat(i.salary_in_usd);
                    }
                });
                return { ...item, salary: Math.floor(sum / count),employee:count };
            });
            setMain(updatedData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        adjustData();
        // console.log("data", main);
    }, [data]);

    return (
        <div className='mt-20'>
        <Divider ><h1 className='text-4xl my-20 '>Average Salary (in ML)</h1></Divider>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={main}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year">
                        <Label value="Year" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Salary (USD)" angle={-90} position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="employee" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="salary" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
