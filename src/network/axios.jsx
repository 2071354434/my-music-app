import axios from "axios";

const http = axios.create({
    baseURL: "https://netease-cloud-music-api-eight-delta-50.vercel.app/",
    withCredentials: true,
    timeout: 10000,
});

export default http;