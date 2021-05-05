import axios from "axios";
import Cookies from "universal-cookie";
import {
    store
  } from "../storage/user";
const userUpdate = async (description, dispatch) => {
    const cookies = new Cookies();
    console.log(description)
    let token = cookies.get("account");
    if (!token) return "failed";
    const Client = axios.create({
        withCredentials: true,
        headers: {
            "Accept": "application-json",
            "Authorization": `Bearer ${token}`
        }
    });
    await Client.get('/sanctum/csrf-cookie');
    const Res = await Client.post('/api/update', { description });
    const { data } = Res;
    if (data.status === "success") {
        dispatch(store(Res.data.data));
        return "Success"
    }
    if (data.status === "failed") {

        return "Wrong"
    }
    if (data.err) {

        return "Error";
    }
}
export default userUpdate
