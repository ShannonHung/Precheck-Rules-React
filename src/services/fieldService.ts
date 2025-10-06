import { Field } from "../model/Field";
import { ParentField } from "../model/ParentField";
import axios from "./axiosInstance";

export default class FieldService {
  static async getFieldsByPath(path: string = ""): Promise<Field[]> {
    return axios
      .get<Field[]>("/fields", { params: { path } })
      .then((res) => res.data);
  }

  static async getParentFields(path: string = ""): Promise<ParentField[]> {
    return axios
      .get<Field[]>("/fields/parents", { params: { path } })
      .then((res) => res.data);
  }
}
