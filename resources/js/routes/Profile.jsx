import React, { Fragment,useState,useEffect } from "react";
import "@fontsource/caveat";
import {
    Heading, Box,useToast, Text, Button, Center, Stack, Feature,ModalCloseButton,
    useDisclosure, ModalBody, ModalOverlay, ModalHeader, ModalContent, ModalFooter, Modal,
    Textarea,Input
} from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useSelector,useDispatch } from "react-redux";
import {
    selectUser
} from "../storage/user";
import userUpdate from "../utils/userUpdate";
import check from "../services/check";
import { useHistory } from "react-router";
import userLogout from "../utils/userLogout";
/**
 * User Profile preview and options
 * @returns Component
 */
const Profile = () => {
    const history = useHistory();
    const toast = useToast()
    const [Sent, setSent] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [description, setDescription] = useState(user.account.description);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        if (!check(dispatch)) {
            history.push('/');
        }
    },[])
    const Feature = ({ title, desc}) => {
        return (
      <Box>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setSent(true);
        try {
            const result = await userUpdate(description, dispatch);
            if (result === "Error") {
            toast({
                title: "Cateva erori interne, incearca mai tarziu",
                status: "error",
                isClosable: true,
            });
            setSent(false);
        }
        if (result === "Success") {
            toast({
                title: `Actualizat cu succes`,
                status: "success",
                isClosable: true
            })
            setSent(false);
        }
        }
        catch {
            toast({
                title: "Cateva erori interne, incearca mai tarziu",
                status: "error",
                isClosable: true,
            });
            setSent(false);
        }
    }
    return (
        <Fragment>

            <Heading textAlign="center" size="2xl" mb={30} fontFamily="cairo" isTruncated>
                Despre Tine
        </Heading>
            <Box ml={20} mx={[10,15,30]}>

                <Box p={4} shadow="lg" borderWidth={0.5} borderRadius={20}>
                    <Stack spacing={8}>
                        <Feature
                        title="Nume"
                        desc={user.account.name}
                    />
                    <Feature
                        title="Email"
                        desc={user.account.email}
                        />
                    <Feature
                        title="Descriere"
                        desc= {user.account.description ||
                        <span style={{ color: "gray" }}>Nimic aici momentan... Adaugă o descriere apăsând Editează Profilul</span>}
                        />
                    </Stack>
                    </Box>
            </Box>
            <Center mt={20}>
            <Stack direction={["column","row"]} spacing={4}>
            <Button colorScheme="blue" variant="outline" onClick={onOpen}>Editează Profilul</Button>
                    <Button colorScheme="red" onClick={() => { userLogout(dispatch, history) }}>Deconectare</Button>
            </Stack>
            </Center>
            {/*Modal For Profile Update */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editare Profil</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                <ModalBody>
                    <FormControl mt={6} isRequired>
                        <FormLabel>Descriere</FormLabel>
                        <Textarea
                        pr="4.5rem"
                        type="text"
                                placeholder=""
                                    defaultValue={description}
                                    onChange={e => setDescription(e.currentTarget.value)}
                    />
                    </FormControl>
                </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" variant="outline" type="submit" isLoading={Sent} mr={3}>Actualizeaza Profilul</Button>
                        <Button colorScheme="red"  onClick={onClose}>
                                Close
                        </Button>

                        </ModalFooter>
                        </form>
        </ModalContent>
      </Modal>
    </Fragment>
    )
};
export default Profile;
