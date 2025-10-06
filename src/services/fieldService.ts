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
      .get<ParentField[]>("/fields/parents", { params: { path } })
      .then((res) => res.data);
  }

  static async createField(
    path: string = "",
    parent_path: string = "",
    new_field: Field
  ): Promise<Field> {
    return axios
      .post("/field", new_field, {
        params: { path, parent_path },
      })
      .then((res) => res.data);
  }

  static async deleteField(
    path: string = "",
    parent_path: string = "",
    target_field: Field
  ): Promise<Field[]> {
    return axios
      .delete("/field", {
        params: { path, parent_path },
        data: target_field, // body 放在 data
      })
      .then((res) => res.data);
  }
}
