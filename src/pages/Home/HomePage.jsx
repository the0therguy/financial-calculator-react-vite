import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Box, Flex, Heading, Select, useToast, Button, useDisclosure
} from "@chakra-ui/react";
import Header from "../../components/Header.jsx";
import { useEffect, useState} from "react";
import FinancialDataCreateModal from "../../components/FinancialDataCreateModal.jsx";
import BarChartComponent from "../../components/BarChartComponent.jsx";

const HomePage = () => {
  const [financialData, setFinancialData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const toast = useToast()
  const [financialModal, setFinancialModal] = useState(false)

  const years = [];
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState("");

  for (let year = currentYear; year >= currentYear - 50; year--) {
    years.push(year);
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const getList = async () => {
    if (!selectedYear)
    {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/financial-datas/?year=${currentYear}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authTokens?.access}`
          }
        })
        if (response.status === 200)
        {
          const data = await response.json()
          setFinancialData(data)
        }
        else {
          toast({
            title: "something went wrong.",
            description: "Something went wrong. Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }

      }
      catch (error) {
        console.log(error)
        toast({
          title: "something went wrong.",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    }
    else
    {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/financial-datas/?year=${selectedYear}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authTokens?.access}`
          }
        })
        if (response.status === 200)
        {
          const data = await response.json()
          setFinancialData(data)
        } else {
          toast({
            title: "something went wrong.",
            description: "Something went wrong. Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      } catch (e) {
        console.log(e)
        toast({
          title: "something went wrong.",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  useEffect( ()=>{
    getList()
  }, [selectedYear])

  console.log(financialData)


  return (
    <>
      <Header/>
      <Button onClick={onOpen} >Add data</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader>Your Financial Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FinancialDataCreateModal />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Select size="sm" placeholder="Select Year" value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <p>Selected Year: {selectedYear}</p>
      <Box>
        <TableContainer>
          <Table variant='striped'>
            <TableCaption>Your Financial Data</TableCaption>
            <Thead>
              <Tr>
                <Th>Sl</Th>
                <Th>Bussiness Name</Th>
                <Th>Month Name</Th>
                <Th>Income</Th>
                <Th>Assets</Th>
                <Th>Debt</Th>
                <Th>Expenses</Th>
                <Th>Financial Health Score</Th>
                <Th>Financial Health Condition</Th>
              </Tr>
            </Thead>
            <Tbody>
              { financialData?  (
                financialData.map((item, index) => {
                  // <Tr key={index}>
                  //   <Td>{index}</Td>
                  //   <Td>{item.business_name}</Td>
                  //   <Td>{item.month_name}</Td>
                  //   <Td>{item.monthly_income}</Td>
                  //   <Td>{item.assets}</Td>
                  //   <Td>{item.debts}</Td>
                  //   <Td>{item.expenses}</Td>
                  //   <Td>{item.financial_health_score}</Td>
                  //   <Td>{item.financial_health_description}</Td>
                  // </Tr>
                  // console.log(index)
                  <Tr key={index}>

                  </Tr>
                })
              ) : (
                <Tr>
                  <Td colSpan="5">No financial data available</Td>
                </Tr>
              )
              }
            </Tbody>
          </Table>
        </TableContainer>
        {
          financialData ? (
            <>
              <Heading as='h3' size='lg'>Your Analytics</Heading>
              <BarChartComponent data={financialData} />
            </>

          ) : null
        }
      </Box>
    </>
  )
}

export default HomePage