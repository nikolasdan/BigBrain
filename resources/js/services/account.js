import axios from "axios"
import Cookies from "universal-cookie";


async function Account() {
    const cookies = new Cookies();
    let token = cookies.get("account");
    if (!token) return false;
    const Client = axios.create({
        withCredentials: true,
        headers: {
            "Accept": "application-json",
            "Authorization": `Bearer ${token}`
        }
    });
    try {
        await Client.get('/sanctum/csrf-cookie');
        const res = await Client.post("/api/info");
        return res.data;
    }
    catch {
        cookies.remove("account");
        return "Guest";
    }
}
export default Account;
