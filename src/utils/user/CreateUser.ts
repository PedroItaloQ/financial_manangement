import { User } from "@/interface/user/user";
import axios, { AxiosResponse } from "axios";

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const CreateUser = async (credentials: User): Promise<AxiosResponse<any>> => {
    try {
        const res: AxiosResponse<any> = await axios.post(`${API}/users`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return res;
    } catch (error) {
        console.log("Error: ", error);
        throw error
    };
};