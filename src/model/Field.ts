import { FieldCondition } from "./FieldCondition";
import { FieldType } from "./FieldType";

export interface Field {
  key: string;
  description: string;
  // type?: FieldType;
  multi_type: FieldType[];
  // item_type?: FieldType;
  item_multi_type: FieldType[];
  regex: string;
  regex_enabled: boolean;
  required: boolean;
  condition: FieldCondition[];
  children: Field[];
  path?: string[];
}
