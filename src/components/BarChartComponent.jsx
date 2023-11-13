import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data }) => {

  const newData = data.map(item => {
    return {
      "month_name": item.month_name,
      "monthly_income": parseFloat(item.monthly_income),
      "assets": parseFloat(item.assets),
      "debt": parseFloat(item.debts),
      "expenses": parseFloat(item.expenses)
    };
  });

  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <BarChart width={600} height={300} data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="monthly_income" fill="#8884d8" name="Monthly Income" />
        <Bar dataKey="assets" fill="#82ca9d" name="Assets" />
        <Bar dataKey="debt" fill="#ffc658" name="Debts" />
        <Bar dataKey="expenses" fill="#FF5733" name="Expenses" />
      </BarChart>

    </div>
  );
};

export default BarChartComponent;
