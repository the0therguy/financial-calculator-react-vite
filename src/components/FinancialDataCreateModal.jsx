import {useState} from "react";
import {Select, Input, chakra, Button, useToast} from "@chakra-ui/react";

const FinancialDataCreateModal = () => {
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const years = [];
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState('');
  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push(year);
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const [businessName, setBussinessName] = useState("")
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [debts, setDebts] = useState(0)
  const [assets, setAssets] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const toast = useToast()

  const formSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/financial-datas/`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          business_name: businessName,
          month_name: selectedMonth,
          year: parseInt(selectedYear),
          monthly_income: parseFloat(monthlyIncome),
          expenses: parseFloat(expenses),
          debts: parseFloat(debts),
          assets: parseFloat(assets)
        })
      })

      if(response.status === 201)
      {
        setBussinessName("")
        setSelectedMonth("")
        setSelectedYear("")
        setBussinessName("")
        setMonthlyIncome(0)
        setExpenses(0)
        setAssets(0)
        setDebts(0)
        toast({
          title: "Your account is created.",
          description: "we are redirecting you to login page",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        const responseData = await response.json()
        toast({
          title: responseData,
          description: responseData,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }

    } catch (e) {
      console.log(e)
    }

  }


  return (
    <>
      <chakra.form onSubmit={formSubmit}>
        <Input variant='outline' size="sm" placeholder="Please enter your Bussiness Name" onChange={(e) => setBussinessName(e.target.value)} required />
        <Input variant='outline' size="sm" placeholder="Please enter your monthly income" onChange={(e)=>setMonthlyIncome(e.target.value)} type="number" required />
        <Input variant='outline' size="sm" placeholder="Please enter your assets" onChange={(e) => setAssets(e.target.value)} type="number" required />
        <Input variant='outline' size="sm" placeholder="Please enter your debts" onChange={(e) => setDebts(e.target.value)} type="number" required />
        <Input variant='outline' size="sm" placeholder="Please enter your expenses" onChange={(e) => setExpenses(e.target.value)} type="number" required />
        <Select size="sm" placeholder="Please select Year" value={selectedYear} onChange={handleYearChange} required >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select size="sm" value={selectedMonth} onChange={handleMonthChange} required>
          <option value="">Please select a month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
        <br/>
        <div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}>
          <Button
            type="submit"
            colorScheme='blue'
          >
            Submit
          </Button>
        </div>
      </chakra.form>
    </>
  )
}

export default FinancialDataCreateModal