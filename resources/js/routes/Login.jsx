import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import userLogin from "../utils/userLogin";
import { useDispatch } from "react-redux";
import check from "../services/check";
import { useHistory } from "react-router";

const Login = () => {
    const history = useHistory();
    const toast = useToast()
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const cardBg = useColorModeValue("teal.100", "teal.600");
    const buttonBg = useColorModeValue("teal.200", "teal.500");
    const [Sent, setSent] = useState(false);
    useEffect(() => {
        if (check(dispatch)) {
            history.push('/');
        }
    },[])
    const handleSubmit = async e => {
        e.preventDefault();
        setSent(true);
        const result = await userLogin(email, password,dispatch);
        if (result === "Wrong") {
            toast({
                title: `Parola sau email-ul sunt incorecte`,
                status: "error",
                isClosable: true
            });
            setSent(false);
        }
        if (result === "Error") {
            toast({
            title: "Cateva erori interne, incearca mai tarziu",
            status: "error",
            isClosable: true,
            });
            setSent(false);
        }
        if (result === "Success" ) {
            toast({
            title: `Conectat cu succes`,
            status: "success",
            isClosable: true
            })
            setSent(false);
            setTimeout(() => {
                history.push("/feed");
            },1000)
        }


    }
    return (
        <>
            <Center>
                <Box bg={cardBg} borderRadius={30} padding={30} w={["90%", "60%",  500]}>
                    <Center><Heading marginBottom="2">Conectare</Heading></Center>
                    <form onSubmit={handleSubmit}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email"
                            placeholder="Adresa Email"
                            borderColor={buttonBg}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                    </FormControl>

                    <FormControl mt={6} isRequired>
                        <FormLabel>Parola</FormLabel>
                        <Input
                        pr="4.5rem"
                        type="password"
                            placeholder="Parola ta"
                            borderColor={buttonBg}
                            onChange={e => setPassword(e.currentTarget.value)}
                    />
                    </FormControl>
                    <Center>
                    <Button width="50%" mt={4} type="submit" bg={buttonBg} isLoading={Sent}>
                    Intră în cont
                    </Button>
                        </Center>
                        </form>
                </Box>
            </Center>
        </>
    )
}
export default Login;
