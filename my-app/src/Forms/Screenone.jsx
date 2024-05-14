import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  HStack,
  Button,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import FlagSelect from "react-flags-select";
import "./Table.css";
import { Link } from "react-router-dom";

const FormScreen = () => {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    country: 'IN',
    serviceQuality: '',
    cleanliness: '',
    overallExperience: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: prevForm[name] === value ? '' : value,
    }));
  };

  const handleFlagSelect = (countryCode) => {
    setForm((prevForm) => ({ ...prevForm, country: countryCode }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    // Validation
    if (!form.customerName.trim()) {
      newErrors.customerName = "Customer Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    if (!form.serviceQuality) {
      newErrors.serviceQuality = "Please rate the service quality";
    }
    if (!form.cleanliness) {
      newErrors.cleanliness = "Please rate the cleanliness";
    }
    if (!form.overallExperience) {
      newErrors.overallExperience = "Please rate your overall experience";
    }

    if (Object.keys(newErrors).length === 0) {
      // Data is valid, proceed with submission
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        });
        setIsLoading(false);
        if (response.ok) {
          toast({
            title: "Feedback submitted",
            description: "Thank you for your feedback!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setForm({
            customerName: '',
            email: '',
            phone: '',
            country: 'IN',
            serviceQuality: '',
            cleanliness: '',
            overallExperience: '',
          });
        } else {
          toast({
            title: "Submission failed",
            description: "Failed to submit feedback. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Submission failed",
          description: "Failed to submit feedback. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // Validation failed, update errors state
      setErrors(newErrors);
    }
  };

  return (
    <Box bg="black" color="white">
      <Box bg={"#1f1e1e"} padding={5} display="flex" justifyContent="space-between" alignItems="center" fontSize="2rem">
        <Box style={{width:"30%"}}>
          <p>Aromatic</p>
        </Box>

        <Box style={{display:"flex",textTransform:"capitalize",fontSize:"1rem"}}>
          <Link to={"/receivedfeedback"}>
          <p style={{marginRight:"2rem"}}>Dashboard</p>
          </Link> 
          <Link to={"/receivedfeedback"}>
          <p>FeedBacks</p>
          </Link>
        </Box>
      </Box>
      <Box p={10} mt={4} width="70%" style={{marginTop:"3rem"}} margin="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg" backgroundColor="white">
        <Box style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"0.5rem"}}>
  
          <FormControl id="customerName" mb={4} isInvalid={errors.customerName}>
            <FormLabel>Customer Name</FormLabel>
            <Input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleInputChange}
              className="input-field"
            />
            {errors.customerName && <FormErrorMessage>{errors.customerName}</FormErrorMessage>}
          </FormControl>
  
          <FormControl id="email" mb={4} isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="input-field"
            />
            {errors.email ? (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            ) : (
              <FormHelperText>We'll never share your email.</FormHelperText>
            )}
          </FormControl>
        </Box>
        
        <Box style={{display:"flex",flexDirection:"row",gridTemplateColumns:"repeat(1,1fr)"}}>
          <FormControl id="country" mb={4}>
            <FormLabel>Country</FormLabel>
            <FlagSelect
              countries={["IN", "US"]}
              selected={form.country || "IN"}
              onSelect={handleFlagSelect}
              className="flag-select"
              showSelectedLabel={false}
            />
          </FormControl>
  
          <FormControl id="phone" mb={4} isInvalid={errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className="input-field"
            />
            {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
          </FormControl>
  
        </Box>
        <Box style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"3rem"}}>
          <FormControl as="fieldset" mb={4} isInvalid={errors.serviceQuality} style={{color:"black"}}>
            <FormLabel as="legend" className="FormLabel">Please rate the quality of the service you received from your host</FormLabel>
            <HStack spacing="24px">
              <Checkbox value="Excellent" isChecked={form.serviceQuality === 'Excellent'} onChange={() => handleCheckboxChange("serviceQuality", "Excellent")}>Excellent</Checkbox>
              <Checkbox value="Good" isChecked={form.serviceQuality === 'Good'} onChange={() => handleCheckboxChange("serviceQuality", "Good")}>Good</Checkbox>
              <Checkbox value="Fair" isChecked={form.serviceQuality === 'Fair'} onChange={() => handleCheckboxChange("serviceQuality", "Fair")}>Fair</Checkbox>
              <Checkbox value="Bad" isChecked={form.serviceQuality === 'Bad'} onChange={() => handleCheckboxChange("serviceQuality", "Bad")}>Bad</Checkbox>
            </HStack>
            {errors.serviceQuality && <FormErrorMessage>{errors.serviceQuality}</FormErrorMessage>}
          </FormControl>
  
          <FormControl as="fieldset" mb={4} isInvalid={errors.cleanliness}>
            <FormLabel as="legend" className="FormLabel">Was our restaurant clean?</FormLabel>
            <HStack spacing="24px">
              <Checkbox value="Excellent" isChecked={form.cleanliness === 'Excellent'} onChange={() => handleCheckboxChange("cleanliness", "Excellent")}>Excellent</Checkbox>
              <Checkbox value="Good" isChecked={form.cleanliness === 'Good'} onChange={() => handleCheckboxChange("cleanliness", "Good")}>Good</Checkbox>
              <Checkbox value="Fair" isChecked={form.cleanliness === 'Fair'} onChange={() => handleCheckboxChange("cleanliness", "Fair")}>Fair</Checkbox>
              <Checkbox value="Bad" isChecked={form.cleanliness === 'Bad'} onChange={() => handleCheckboxChange("cleanliness", "Bad")}>Bad</Checkbox>
            </HStack>
            {errors.cleanliness && <FormErrorMessage>{errors.cleanliness}</FormErrorMessage>}
          </FormControl>
  
          <FormControl as="fieldset" mb={4} isInvalid={errors.overallExperience}>
            <FormLabel as="legend" className="FormLabel">Please rate your overall dining experience</FormLabel>
            <HStack spacing="24px">
              <Checkbox value="Excellent" isChecked={form.overallExperience === 'Excellent'} onChange={() => handleCheckboxChange("overallExperience", "Excellent")}>Excellent</Checkbox>
              <Checkbox value="Good" isChecked={form.overallExperience === 'Good'} onChange={() => handleCheckboxChange("overallExperience", "Good")}>Good</Checkbox>
              <Checkbox value="Fair" isChecked={form.overallExperience === 'Fair'} onChange={() => handleCheckboxChange("overallExperience", "Fair")}>Fair</Checkbox>
              <Checkbox value="Bad" isChecked={form.overallExperience === 'Bad'} onChange={() => handleCheckboxChange("overallExperience", "Bad")}>Bad</Checkbox>
            </HStack>
            {errors.overallExperience && <FormErrorMessage>{errors.overallExperience}</FormErrorMessage>}
          </FormControl>
  
        </Box>
  
        <Box display="flex" justifyContent="end">
          <Button colorScheme="green" mt={4} onClick={handleSubmit} isLoading={isLoading} loadingText="Submitting">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormScreen;
