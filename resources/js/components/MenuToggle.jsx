import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Button
            display={{ base: "block", md: "none" }}
            variant="ghost"
            color="teal.400"
            onClick={toggle}
        >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </Button>
    );
};
export default MenuToggle;
