
import Cookie from "universal-cookie";
import apiClient from "../services/apiClient"
import {
    store
  } from "../storage/user";
const userLogin = async (email, password,dispatch) => {
    const cookies = new Cookie();
    const Body = {
        email,
        password
    }
    await apiClient.get('/sanctum/csrf-cookie');
    const Res = await apiClient.post('/api/login', Body);
    const { data } = Res;
    if (data.status === "success") {
        dispatch(store(data.data));
        // Store Credentials
        cookies.set("account", data.token);
        return "Success"
    }
    if (data.status === "failed") {

        return "Wrong"
    }
    if (data.err) {

        return "Error";
    }
}
export default userLogin
