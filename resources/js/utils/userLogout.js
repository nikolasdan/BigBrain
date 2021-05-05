import axios from "axios";
import Cookies from "universal-cookie";
import {
    store
  } from "../storage/user";
const userLogout = async (dispatch,history) => {
    const cookies = new Cookies();
    let token = cookies.get("account");
    if (!token) return "failed";
    const Client = axios.create({
        withCredentials: true,
        headers: {
            "Accept": "application-json",
            "Authorization": `Bearer ${token}`
        }
    });
    try {
        await Client.get('/sanctum/csrf-cookie');
        const Res = await Client.post('/api/logout');
        const { data } = Res;
        if (data.status === "success") {
            dispatch(store(false));
            cookies.remove("account");
            history.push("/");
        return "Success"
    }
    if (data.status === "failed") {
        return "Wrong"
    }
    }
    catch {
        return "Error"
    }
}
export default userLogout
