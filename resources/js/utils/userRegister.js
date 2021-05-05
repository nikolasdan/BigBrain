import apiClient from "../services/apiClient"

const userRegister = async (email, password,name) => {
    const Body = {
        email,
        password,
        name
    }
    await apiClient.get('/sanctum/csrf-cookie');
    const Res = await apiClient.post('/api/register', Body);
    const { data } = Res;
    if (data.status === "success") {
        return "Success"
    }
    if (data.error === "email is already used") {

        return "U_Email";
    }
    if (data.error === "name is already used") {
        return "U_Name";
    }
    if (data.error === "Internal Problems") {

        return "Error";
    }
}
export default userRegister
