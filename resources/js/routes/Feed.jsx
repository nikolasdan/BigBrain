import { Input, Box, Center, Text, HStack, Button, Link, FormControl,useToast  } from "@chakra-ui/react"
import React, { useState } from 'react';
import Post from "../components/Post";
import Skele from "../components/Skele";
import InfiniteScroll from 'react-infinite-scroller';
import apiClient from "../services/apiClient";
import userPost from "../utils/userPost";

const Feed = () => {
    const toast = useToast();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Sent, setSent] = useState(false);
    const [question, setQuestion] = useState("");
    const addPost = async e => {
        e.preventDefault();
        setSent(true);
        try {
            const result = await userPost(question);
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
            window.location.reload();
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
    const loadPosts = async(count) => {
        const Posts = await apiClient.get(`/api/posts?page=${count}`);
        setLoading(Posts.data.current_page < Posts.data.last_page);
        const items = Posts.data.data;
        setPosts([...posts,...items]);
    };
    const items = posts.map((post, i) => <Post question={post.title} key={i}  count={post.votes}/>
    )
    return (
        <div>
            <Center>

                     <Box width="60%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <form onSubmit={addPost}>
                    <FormControl>
                            <Input isRequired placeholder="Postează o intrebare" onChange={e => setQuestion(e.currentTarget.value)} />
                    </FormControl>
                        <HStack padding="10px" spacing="20px">
                            <Button _hover={{ bg: "teal.500" }} type="submit" isLoading={Sent}>Postează</Button>
                        </HStack>
                    </form>
                    </Box>

        </Center>

            <InfiniteScroll
            pageStart={-1}
            loadMore={loadPosts.bind(this)}
            initialLoad={true}
            hasMore={loading}
            loader={<><Skele/><Skele/><Skele/></>}
            >
                    { items }
            </InfiniteScroll>
        </div>
    )
}

export default Feed
