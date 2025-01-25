import { User } from "@/interface/user/user"
import axios, { AxiosResponse } from "axios"

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const PostLogin = async (credentials: User): Promise<AxiosResponse<any>> => {
    try{
        const res: AxiosResponse<any> = await axios.post(`${API}/auth/login`, credentials, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return res;
    } catch(error){
        console.log("Erro:", error);
        throw error;
    };
};