import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Wrapper>
      <Flex
        w="full"
        px={[4, 8, 16, 24]}
        mt={8}
        direction={{ base: "column", md: "row" }}
      >
        {/* Gambar di satu kolom */}
        <Box
          w={{ base: "full", md: "50%" }}
          mr={{ base: 0, md: 8 }}
          mb={{ base: 8, md: 0 }}
        >
          <Image
            src="/asset/register.jpg"
            alt="Registration Image"
            objectFit="cover"
            display={{ base: "none", md: "block" }}
            borderRadius="lg"
            h={{ base: "0", md: "80%" }}
          />
        </Box>

        {/* Formulir di kolom lainnya */}
        <Box w={{ base: "full", md: "50%" }}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Register
          </Text>

          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="name" name="name" placeholder="Enter your name" />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password !== confirmPassword && (
                  <Text fontSize="xs" color="red.500">
                    The password does not match
                  </Text>
                )}
              </FormControl>

              <Button
                mt={6}
                colorScheme="yellow"
                type="submit"
                w="full"
                _hover={{ bg: "yellow.600" }}
                _active={{ bg: "yellow.700" }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Register;
