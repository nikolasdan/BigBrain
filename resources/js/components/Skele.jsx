import React from 'react';
import { Center, SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

const Skele = () => {
    return (
        <div>
            <Center paddingTop="40px">
            <Box padding="6" width="60%" boxShadow="lg" >
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
            </Center>
        </div>
    )
}

export default Skele;
