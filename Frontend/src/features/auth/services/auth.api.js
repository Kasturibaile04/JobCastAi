import axios from "axios"


const api = axios.create({
<<<<<<< HEAD
    baseURL: "https://jobcast-backend.onrender.com/api",
=======
    baseURL: "https://jobcastai.onrender.com",
>>>>>>> 964e662183d73e9b179a7e98558528e6a277ccc2
    withCredentials: true
})

export async function register({ username , email , password}){
    try{
    const response = await api.post("/api/auth/register",{
        username,
        email,
        password
    })
    return response.data;
    } catch(error){
        console.log(error);
    }
}

export async function login({ email , password }){
    try {
        const response = await api.post("/api/auth/login",{
            email,
            password
        })
        return response.data;
    } catch(error){
        console.log(error);
    }
}

export async function logout(){
    try {
        const response = await api.post("/api/auth/logout")
        return response.data;
    } catch(error){
        console.log(error);
    }
}

export async function getMe(){
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data;
    } catch(error){
        console.log(error);
    }
}
