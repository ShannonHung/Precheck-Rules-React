import { PrecheckFile } from "../model/PrecheckFile";
import axios from "./axiosInstance";

export default class FileService {
  static async getFileList(path: string = ""): Promise<PrecheckFile[]> {
    return axios
      .get<PrecheckFile[]>("/files", { params: { path } })
      .then((res) => res.data);
  }

  static async createFile(path: string, file: PrecheckFile): Promise<any> {
    return axios.post(
      "/file",
      {
        name: file.name,
        file_type: file.file_type,
      },
      {
        params: { path },
      }
    );
  }

  static async deleteFile(path: string): Promise<any> {
    return axios.delete("/file", {
      params: { path },
    });
  }
}
