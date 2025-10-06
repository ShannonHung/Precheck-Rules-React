import axios from "axios";

const handleAxiosError = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Unknown Error";
  }
  return "Something wrong";
};

export default handleAxiosError;
