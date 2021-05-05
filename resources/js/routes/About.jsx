import { Text, Center } from "@chakra-ui/layout";
import { Avatar, Wrap, WrapItem, Stack, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,  } from "@chakra-ui/react"
import "@fontsource/cairo"

const About = () => {
    return (
    <div>
        <Center>
        <Text textAlign={"center"} fontSize="4xl" fontWeight="1000" fontFamily="cairo">Împreună reușim</Text>
        </Center>
        <Center paddingTop="50px">
            <Text textAlign={"center"} fontSize="2xl" fontWeight="100" fontFamily="cairo">Cine suntem?</Text>
        </Center>
        <Center paddingTop="25px">
        <Wrap spacing="50px">
            <WrapItem>
                <Stack>
                <a href="https://www.facebook.com/profile.php?id=100005653938486" target="_blank">
                <Avatar name="Lucian" src="" />
                </a>
                <Text textAlign={"center"}>Lucian</Text>
                </Stack>
            </WrapItem>
            <WrapItem>
                <Stack>
                <a href="https://www.facebook.com/gaby.trifan.18" target="_blank">
                <Avatar name="Greg" src="" />
                </a>
                <Text textAlign={"center"}>Greg</Text>
                </Stack>
            </WrapItem>
            <WrapItem>
                <Stack>
                <a href="https://www.facebook.com/nikooolas16" target="_blank">
                <Avatar name="Nikolas" src="" />
                </a>
                <Text textAlign={"center"}>Nikolas</Text>
                </Stack>
            </WrapItem>
        </Wrap>
        </Center>
    </div>
    );
};
export default About;
