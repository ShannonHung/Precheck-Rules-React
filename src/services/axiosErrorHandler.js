import axios from "axios";

const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail || "Unknown Error";
  }
  return "Something wrong";
};

export default handleAxiosError;
