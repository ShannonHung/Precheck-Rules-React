import { FieldCondition } from "./FieldCondition";
import { FieldType } from "./FieldType";

export interface Field {
  key: string;
  description: string;
  type: FieldType;
  item_type: FieldType;
  regex: string;
  required: boolean;
  condition: FieldCondition[];
  children: Field[];
  path?: string[];
}
