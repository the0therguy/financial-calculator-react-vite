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
  TableContainer, Box, Heading, Select, useToast, Button, useDisclosure, AlertIcon, Alert
} from "@chakra-ui/react";
import Header from "../../components/Header.jsx";
import {useContext, useEffect, useState} from "react";
import FinancialDataCreateModal from "../../components/FinancialDataCreateModal.jsx";
import BarChartComponent from "../../components/BarChartComponent.jsx";
import {DeleteIcon} from '@chakra-ui/icons'
import AuthContext from "../../context/AuthContext.jsx";

const HomePage = () => {
  const [financialData, setFinancialData] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  const toast = useToast()
  const { user } = useContext(AuthContext);

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
        const response = await fetch(`${import.meta.env["VITE_REACT_API_URL"]}/api/v1/financial-datas/?year=${currentYear}`,{
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
        const response = await fetch(`${import.meta.env["VITE_REACT_API_URL"]}/api/v1/financial-datas/?year=${selectedYear}`,{
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
  console.log()


  return (
    <>
      <Header/>
      <Alert status='warning'>
        <AlertIcon />
        This site's is backend is hosted on free render server. Whaterever you add it will be vanished after 30mins. Thank you.
      </Alert>
      <p>Hello {user.username}</p>

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
          <Table variant='striped' size="sm">
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
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Unga Bunga</Td>
                <Td>January</Td>
              </Tr>
              { financialData?  (
                financialData.map((item, index) => {
                  <Tr>
                    <Td>{index}</Td>
                    <Td>{item?.business_name}</Td>
                    <Td>{item?.month_name}</Td>
                    <Td>{item?.monthly_income}</Td>
                    <Td>{item?.assets}</Td>
                    <Td>{item?.debts}</Td>
                    <Td>{item?.expenses}</Td>
                    <Td>{item?.financial_health_score}</Td>
                    <Td>{item?.financial_health_description}</Td>
                    <Td><DeleteIcon /></Td>
                  </Tr>
                  // console.log(index)

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