import React from "react";
import { Flex } from "@chakra-ui/layout";
import MenuToggle from "./MenuToggle";
import MenuLinks from "./MenuLinks";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Img } from "@chakra-ui/react"

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const img=useColorModeValue("blogo.png","wlogo.png");

    return (
        <Flex
            as="nav"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
        >
            <Img  src={img} objectFit="cover"  height="50px" alt="logo"/>
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} toggle={toggle} />
        </Flex>
    );
};

export default Navbar;
