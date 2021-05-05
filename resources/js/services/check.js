import Cookies from "universal-cookie";
import { store } from "../storage/user";

const checkConnected = ( dispatch) => {
    const cookies = new Cookies();
    let token = cookies.get("account");
    if (token) {
        return true;
    }
    else {
        dispatch(store(false));
        return false;
    }
};

export default checkConnected;
