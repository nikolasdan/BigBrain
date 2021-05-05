import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { motion } from "framer-motion";
const NotFound = () => {
    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)",
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: useColorModeValue("#313131", "#AFAFAF"),
        },
    };
    return (
        <Box padding="2" fontSize="xl" textAlign="center">
            404 Not Found
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "30px",
                }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    style={{ height: "100px", stroke: "teal" }}
                >
                    <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                        }}
                    />
                </motion.svg>
            </Box>
        </Box>
    );
};
export default NotFound;
