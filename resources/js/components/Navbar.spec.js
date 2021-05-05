import {shallow} from "../enzyme";
import React from "react";
import Navbar from "./Navbar";
import { Img } from "@chakra-ui/image";

describe("Navbar Tests", () => {
    it("Contains Logo", () => {
        const wrapper = shallow(<Navbar />);
        expect(wrapper.contains(<Img src="blogo.png" objectFit="cover"  height="50px" alt="logo"/>)).toBeTruthy();
    });
});
