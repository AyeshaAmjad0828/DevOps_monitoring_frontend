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
    useToast
} from "@chakra-ui/react";

export const CourseForm = () => {
    const toast = useToast()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
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

            const response = await fetch('/api/courses', {
                method: "POST",
                body: JSON.stringify({ title: formData.title, description: formData.description }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            await response.json()
            toast({ status: 'success', title: 'Course Created!' })
        } catch (err: any) {
            console.log(err.message)
        }

        // Reset the form after submission if needed
        setFormData({
            title: "",
            description: "",
        });
    };

    return (
        <Container maxW="lg" mt={8}>
            <Heading textAlign='center'>Course Form</Heading>
            <Box p={6} boxShadow="md" borderRadius="md">
                <form onSubmit={handleSubmit}>
                    <FormControl id="title" mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter title"
                        />
                    </FormControl>
                    <FormControl id="description" mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter description"
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


