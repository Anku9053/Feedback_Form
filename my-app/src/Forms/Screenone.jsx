import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  RadioGroup,
  HStack,
  Radio,
  Button,
  // Header,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import FlagSelect from "react-flags-select";
import "./Table.css";

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

  const handleRadioChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
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
    <Box style={{padding:"2rem"}}>
    <Box style={{display:"flex",justifyContent:"start",fontSize:"2rem"
    }}>
      <h1>Aromatic</h1>
    </Box>
    <Box p={10} width="70%" style={{marginTop:"5rem"}} margin="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg" backgroundColor="white">
      <Box style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem"}}>

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
      <Box style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem"}}>
        <FormControl as="fieldset" mb={4} isInvalid={errors.serviceQuality} style={{color:"black"}}>
          <FormLabel as="legend" className="FormLabel">Please rate the quality of the service you received from your host</FormLabel>
          <RadioGroup name="serviceQuality" onChange={(value) => handleRadioChange("serviceQuality", value)} value={form.serviceQuality}>
            <HStack spacing="24px">
              <Radio value="Excellent">Excellent</Radio>
              <Radio value="Good">Good</Radio>
              <Radio value="Fair">Fair</Radio>
              <Radio value="Bad">Bad</Radio>
            </HStack>
          </RadioGroup>
          {errors.serviceQuality && <FormErrorMessage>{errors.serviceQuality}</FormErrorMessage>}
        </FormControl>

        <FormControl as="fieldset" mb={4} isInvalid={errors.cleanliness}>
          <FormLabel as="legend" className="FormLabel">Was our restaurant clean?</FormLabel>
          <RadioGroup name="cleanliness" onChange={(value) => handleRadioChange("cleanliness", value)} value={form.cleanliness}>
            <HStack spacing="24px">
              <Radio value="Excellent">Excellent</Radio>
              <Radio value="Good">Good</Radio>
              <Radio value="Fair">Fair</Radio>
              <Radio value="Bad">Bad</Radio>
            </HStack>
          </RadioGroup>
          {errors.cleanliness && <FormErrorMessage>{errors.cleanliness}</FormErrorMessage>}
        </FormControl>

        <FormControl as="fieldset" mb={4} isInvalid={errors.overallExperience}>
          <FormLabel as="legend" className="FormLabel">Please rate your overall dining experience</FormLabel>
          <RadioGroup name="overallExperience" onChange={(value) => handleRadioChange("overallExperience", value)} value={form.overallExperience}>
            <HStack spacing="24px">
              <Radio value="Excellent">Excellent</Radio>
              <Radio value="Good">Good</Radio>
              <Radio value="Fair">Fair</Radio>
              <Radio value="Bad">Bad</Radio>
            </HStack>
          </RadioGroup>
          {errors.overallExperience && <FormErrorMessage>{errors.overallExperience}</FormErrorMessage>}
        </FormControl>

      </Box>

      <Box style={{display:"flex",justifyContent:"end"}}>
        <Button colorScheme="green" width="15%" mt={4} onClick={handleSubmit}>
          Submit
        </Button>
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Spinner />
          </Box>
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default FormScreen;
