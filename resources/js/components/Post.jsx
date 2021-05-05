import React, { useState } from 'react'
import { Box, Text, Center, Button, useBoolean} from "@chakra-ui/react"
import { AiOutlineFire } from "react-icons/ai";
const Post = ({ question, count }) => {
    const [votes, setVotes] = useState(count);
    const [pressed, setPress] = useState(false);
    const toggleVote = () => {
        setPress(!pressed);
        if (!pressed) {
            setVotes(Number(votes)+1);
        }
        else setVotes(votes-1);
    }
    return (
        <div>
            <Center paddingTop="40px">
            <Box width="60%" p={2.5} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Text padding="10px">{question}</Text>
                    <Button variant="outline" onClick={()=>toggleVote()} _hover={{ color: "red.300" }}
                        color={pressed ? "red" : false}
                        leftIcon={<AiOutlineFire />}>{votes}</Button>
                </Box>
            </Center>
        </div>
    )
}

export default Post;
