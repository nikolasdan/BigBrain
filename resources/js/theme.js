import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const config = {
    initialColorMode: "light"
};
const components = {
    Drawer: {
        // setup light/dark mode component defaults
        baseStyle: (props) => ({
            dialog: {
                bg: mode("gray.200", "#141214")(props),
                color: "teal.400",

            },
        }),
    },
};
const theme = extendTheme({ config, components });
export default theme;
