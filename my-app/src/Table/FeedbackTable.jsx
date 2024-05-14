import React, { useEffect, useState } from "react";
import {
    Table,
    TableContainer,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Spinner,
    useToast,
    Input,
    InputGroup,
    InputRightElement,
    Box,
    Text,
    Button,
  } from "@chakra-ui/react";
  import { SearchIcon } from "@chakra-ui/icons";

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/feedback");
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Error fetching data",
          description: "Failed to load feedback data. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter((feedback) =>
        feedback.customerName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFeedbacks(filtered);
    }
  };

  return (
    <Box p={4}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
       
        <Text>
          Total Feedbacks: {filteredFeedbacks.length} / {feedbacks.length}
        </Text>
        <Box  display="flex" justifyContent="space-between" alignItems="center">
        <InputGroup width="300px">
          
          <Input
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <InputRightElement pointerEvents="none" _hover={"pointer"}>
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="green" ml={4}>
          Add
        </Button>
          </Box>
      </Box>
      <TableContainer>
        {isLoading ? (
          <div className="spinner-container">
            <Spinner size="xl" />
          </div>
        ) : (
          <Table variant="simple">
            <TableCaption>Feedback from customers</TableCaption>
            <Thead>
              <Tr>
                <Th>Customer Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Service Quality</Th>
                <Th>Cleanliness</Th>
                <Th>Overall Experience</Th>
                {/* <Th>Created At</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {filteredFeedbacks.map((feedback) => (
                <Tr key={feedback._id}>
                  <Td>{feedback.customerName}</Td>
                  <Td>{feedback.email}</Td>
                  <Td>{feedback.phone}</Td>
                  <Td>{feedback.serviceQuality || "N/A"}</Td>
                  <Td>{feedback.cleanliness || "N/A"}</Td>
                  <Td>{feedback.overallExperience || "N/A"}</Td>
                  {/* <Td>{new Date(feedback.createdAt).toLocaleString()}</Td> */}
                </Tr>
              ))}
            </Tbody>
            
          </Table>
        )}
      </TableContainer>
    </Box>
  );
};

export default FeedbackTable;
