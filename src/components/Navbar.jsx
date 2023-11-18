import { useAuth } from "@/modules/context/authContext";
import {
  Flex,
  Text,
  HStack,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="transparent" // Ganti warna latar belakang menjadi kuning
      color="white"
      boxShadow="md"
    >
      <Link href="/">
        <Flex
          align="center"
          mr={5}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          <Text fontSize="xl" fontWeight="bold" color={"yellowgreen"}>
            BookStore
          </Text>
        </Flex>
      </Link>
      <HStack spacing={4}>
        {isLoggedIn && (
          <Link href="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLoggedIn ? (
          <Button
            onClick={onOpen}
            colorScheme="yellow"
            _hover={{ bg: "yellow.600" }} // Ganti warna latar belakang saat hover
            _active={{ bg: "yellow.700" }} // Ganti warna latar belakang saat aktif/clicked
          >
            Login
          </Button>
        ) : (
          <Button
            colorScheme="yellow"
            onClick={() => {
              Cookies.remove("isLoggedIn");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await loginUser(e.target.email.value, e.target.password.value);
              Cookies.set("isLoggedIn", true);
              setIsLoggedIn(true);
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    _placeholder={{ color: "gray.400" }} // Ganti warna placeholder
                    _focus={{ borderColor: "blue.400" }} // Ganti warna border saat focus
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    _placeholder={{ color: "gray.400" }} // Ganti warna placeholder
                    _focus={{ borderColor: "blue.400" }} // Ganti warna border saat focus
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                _hover={{ bg: "blue.600" }} // Ganti warna latar belakang saat hover
                _active={{ bg: "blue.700" }} // Ganti warna latar belakang saat aktif/clicked
              >
                Login
              </Button>
              <Link href="/Register" onClick={onClose}>
                <Button variant="ghost" _hover={{ textDecor: "underline" }}>
                  Doesn&apos;t Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
