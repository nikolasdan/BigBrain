import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "./store";
const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
            </ChakraProvider>
            </Provider>
    </StrictMode>,
    rootElement
);
