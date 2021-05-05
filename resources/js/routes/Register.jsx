import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import userRegister from "../utils/userRegister";
import { useDispatch } from "react-redux"
import check from "../services/check";
import { useHistory } from "react-router";

const Register = () => {
    const history = useHistory();
    const toast = useToast()
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const cardBg = useColorModeValue("teal.100", "teal.600");
    const buttonBg = useColorModeValue("teal.200", "teal.500");
    const [Sent, setLoading] = useState(false);
    useEffect(() => {
        if (check(dispatch)) {
            history.push('/');
        }
    },[])
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if (password.length < 6) {
            setLoading(false);
            return toast({
                title: "Parola trebuie să aibă minim 6 caractere",
                status: "warning",
                isClosable: true
            });
        }
        const result = await userRegister(email, password,name);
        if (result === "U_Name") {
            toast({
                title: `Numele este deja folosit`,
                status: "error",
                isClosable: true
            });
            setLoading(false);
        }
        if (result === "U_Email") {
            toast({
                title: `Email-ul este deja folosit`,
                status: "error",
                isClosable: true
            });
            setLoading(false);
        }
        if (result === "Error") {
            toast({
            title: "Câteva erori interne, încearcă mai târziu",
            status: "error",
            isClosable: true,
            });
            setLoading(false);
        }
        if (result === "Success" ) {
            toast({
            title: `Cont creat cu succes`,
            status: "success",
            isClosable: true
            })
            setLoading(false);
        }


    }
    return (
        <>
            <Center>
                <Box bg={cardBg} borderRadius={30} padding={30} w={["90%", "60%",  500]}>
                    <Center><Heading marginBottom="2">Înregistrare</Heading></Center>
                    <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Adresa de email</FormLabel>
                        <Input type="email"
                            placeholder="Adresa dvs de email"
                            borderColor={buttonBg}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                    </FormControl>
                        <FormControl mt={6} isRequired>
                        <FormLabel>Nume utilizator</FormLabel>
                        <Input type="text"
                            placeholder="Numele dvs"
                            borderColor={buttonBg}
                            onChange={e => setName(e.currentTarget.value)}
                        />
                    </FormControl>
                    <FormControl mt={6} isRequired>
                        <FormLabel>Parola</FormLabel>
                        <Input
                        pr="4.5rem"
                        type="password"
                            placeholder="Parola dvs"
                            borderColor={buttonBg}
                            onChange={e => setPassword(e.currentTarget.value)}
                    />
                    </FormControl>
                    <Center>
                    <Button width="50%" mt={4} type="submit" bg={buttonBg} isLoading={Sent}>
                    Creează contul
                    </Button>
                        </Center>
                        </form>
                </Box>
            </Center>
        </>
    )
}
export default Register;
