import { User } from "@/interface/user/user"
import axios, { AxiosResponse } from "axios"
import api from "../post";

const API = process.env.NEXT_PUBLIC_API_HOMOLOG;

export const PostLogin = async (credentials: { email: string; password: string }) => {
    return await api.post("/auth/login", credentials, {
        withCredentials: true,
    });
};