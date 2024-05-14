import { motion } from "framer-motion";
import { useState } from "react";
import Screenone from "./Screenone";
import { Spinner, useToast } from "@chakra-ui/react"; // Assuming you are using Chakra UI for the spinner and toast

export default function Framer_Form() {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceQuality: '',
    cleanliness: '',
    overallExperience: '',
    Quality_Food:"",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
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
        const response = await fetch('https://your-api-endpoint.com/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
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
            serviceQuality: '',
            cleanliness: '',
            overallExperience: ''
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
    <div className="w-full h-screen flex flex-col bg-orange-100 gap-4 space-y-5 sm:space-y-0 items-center justify-center">
      <div className="w-full max-w-md flex items-center justify-around space-x-3">
        <div
          className="p-0 bg-green-100 dark:bg-green-900 w-full rounded flex items-center justify-center transition-bg duration-300 ease-in-out"
        >
          <motion.div
            className="w-full h-2 rounded flex items-center justify-center bg-green-100 dark:bg-green-900"
            layoutId="bg"
          />
        </div>
      </div>
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ translateX: -200, opacity: 1 }}
        className="relative inline-block h-full w-full max-w-md xl:max-w-xl overflow-hidden text-center align-middle border border-gray-200 dark:border-gray-700 rounded-2xl transition-all my-16"
      >
        <Screenone
          form={form}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <Spinner />
          </div>
        )}
      </motion.div>
    </div>
  );
}
