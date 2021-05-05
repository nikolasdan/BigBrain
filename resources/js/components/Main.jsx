import React, { useCallback,useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import Account from "../services/account";
import { store } from "../storage/user";
const Main = (props) => {
    const dispatch = useDispatch();
    const CheckAccount = useCallback(async () => {
        const result = await Account();
         if (result!==false) {
          dispatch(store(result.data));
         }
    });
    useEffect(() => {
        CheckAccount();
        console.log("%cStai asa!", "color: red; font-size: x-large");
    console.log("%cDaca planuiesti sa faci vreun copy/paste aici risti sa-ti pierzi contul","color: teal")
    }, []);
        return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
};
export default Main;
