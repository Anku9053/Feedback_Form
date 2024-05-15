import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tbody,
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
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeedbacks, setSelectedFeedbacks] = useState(new Set());
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://giant-gear-bat.cyclic.app/feedback");
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

  const handleCheckboxChange = (feedbackId) => {
    setSelectedFeedbacks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(feedbackId)) {
        newSelected.delete(feedbackId);
      } else {
        newSelected.add(feedbackId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    setIsLoading(true);
    try {
      const deletePromises = Array.from(selectedFeedbacks).map((id) =>
        fetch(`https://giant-gear-bat.cyclic.app/feedback/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(deletePromises);
      const newFeedbacks = feedbacks.filter((feedback) => !selectedFeedbacks.has(feedback._id));
      setFeedbacks(newFeedbacks);
      setFilteredFeedbacks(newFeedbacks);
      setSelectedFeedbacks(new Set());
      toast({
        title: "Deleted successfully",
        description: "Selected feedbacks have been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Deletion failed",
        description: "Failed to delete selected feedbacks. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Text>
          Total Feedbacks: {filteredFeedbacks.length} / {feedbacks.length}
        </Text>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <InputGroup width="300px">
            <Input
              placeholder="Search by customer name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="green" ml={4}>
            <Link to={"/"}>Add</Link>
          </Button>
        </Box>
      </Box>
      <TableContainer>
        {isLoading ? (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Table variant="simple">
            <TableCaption>Feedback from customers</TableCaption>
            <Thead>
              <Tr>
                <Th>Select</Th>
                <Th>Customer Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Service Quality</Th>
                <Th>Cleanliness</Th>
                <Th>Overall Experience</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredFeedbacks.map((feedback) => (
                <Tr key={feedback._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedFeedbacks.has(feedback._id)}
                      onChange={() => handleCheckboxChange(feedback._id)}
                    />
                  </Td>
                  <Td>{feedback.customerName}</Td>
                  <Td>{feedback.email}</Td>
                  <Td>{feedback.phone}</Td>
                  <Td>{feedback.serviceQuality || "N/A"}</Td>
                  <Td>{feedback.cleanliness || "N/A"}</Td>
                  <Td>{feedback.overallExperience || "N/A"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      {filteredFeedbacks.length > 0 && (
        <Box mt={4} display="flex" justifyContent="end">
          <Button colorScheme="red" onClick={handleDeleteSelected} disabled={selectedFeedbacks.size === 0}>
            Delete Selected
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FeedbackTable;
