import axios from "axios";
import Cookies from "universal-cookie";

const userPost = async (question) => {
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
    await Client.get('/sanctum/csrf-cookie');
    const Res = await Client.post('/api/posts/add', { title:question});
    const { data } = Res;
    if (data.status === "success") {
        return "Success"
    }
    if (data.status === "failed") {

        return "Wrong"
    }
    if (data.err) {

        return "Error";
    }
}
export default userPost
