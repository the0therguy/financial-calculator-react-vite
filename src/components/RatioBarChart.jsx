import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RatioBarChart = ({data}) => {
  const newData = data.map(item => {
    return {
      "month_name": item.month_name,
      "income_ratio": parseFloat(item.income_ratio),
      "debt_to_asset_ratio": parseFloat(item.debt_to_asset_ratio),
      "financial_health_score": parseFloat(item.financial_health_score),
    };
  });
  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <BarChart width={500} height={250} data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income_ratio" fill="#5784d0" name="Income to expense ratio" />
        <Bar dataKey="debt_to_asset_ratio" fill="#82ca3d" name="Debt to asset ratio" />
        <Bar dataKey="financial_health_score" fill="#ffc618" name="Financial Health Score" />
      </BarChart>

    </div>
  )
}

export default RatioBarChart