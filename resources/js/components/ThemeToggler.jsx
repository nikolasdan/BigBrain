import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";

const ThemeToggler = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            onClick={toggleColorMode}
            float="right"
            color="teal.400"
            variant="ghost"
        >
            {colorMode === "light" ? "🌙" : "🌞"}
        </Button>
    );
};

export default ThemeToggler;
