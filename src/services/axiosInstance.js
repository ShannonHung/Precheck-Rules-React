import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000/api", // 所有 API 都以 /api 開頭
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
