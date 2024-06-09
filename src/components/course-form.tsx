import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Box,
    Container,
    Heading,
    Select,
    useToast
} from "@chakra-ui/react";

export const CourseForm = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        courseTitle: "",
        rating: "",
        assignments: "",
        grade: "",
        review: ""
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // You can perform any action with the form data here, like submitting to an API
        try {
            const response = await fetch('/api/reviews', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            await response.json();
            toast({ status: 'success', title: 'Review Submitted!' });
        } catch (err: any) {
            console.log(err.message);
            toast({ status: 'error', title: 'Submission Failed', description: err.message });
        }

        // Reset the form after submission
        setFormData({
            name: "",
            email: "",
            courseTitle: "",
            rating: "",
            assignments: "",
            grade: "",
            review: ""
        });
    };

    return (
        <Container maxW="lg" mt={8}>
            <Heading textAlign='center'>Course Review</Heading>
            <Box p={6} boxShadow="md" borderRadius="md">
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                    </FormControl>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </FormControl>
                    <FormControl id="courseTitle" mb={4}>
                        <FormLabel>Course Title</FormLabel>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={formData.courseTitle}
                            onChange={handleInputChange}
                            placeholder="Enter the course title"
                        />
                    </FormControl>
                    <FormControl id="rating" mb={4}>
                        <FormLabel>Rating</FormLabel>
                        <Select
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            placeholder="Rate the course"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                    </FormControl>
                    <FormControl id="assignments" mb={4}>
                        <FormLabel>Number of Assignments</FormLabel>
                        <Input
                            type="number"
                            name="assignments"
                            value={formData.assignments}
                            onChange={handleInputChange}
                            placeholder="Enter the number of assignments you did"
                        />
                    </FormControl>
                    <FormControl id="grade" mb={4}>
                        <FormLabel>Grade</FormLabel>
                        <Input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            placeholder="Enter your grade in the course"
                        />
                    </FormControl>
                    <FormControl id="review" mb={4}>
                        <FormLabel>Review</FormLabel>
                        <Textarea
                            name="review"
                            value={formData.review}
                            onChange={handleInputChange}
                            placeholder="Write your review"
                            size="md"
                            resize="vertical"
                            height="120px"
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
