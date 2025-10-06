import { Operation, OperationTypes } from "./OperationType";

export enum FieldType {
  OBJ = "object",
  STR = "string",
  NUM = "number",
  LIST = "list",
  EMAIL = "email",
  BOOL = "bool",
  IP = "ip",
}

const TYPE_OPERATORS: Record<FieldType, Operation[]> = {
  [FieldType.BOOL]: [OperationTypes.EQ, OperationTypes.NE],
  [FieldType.STR]: [
    OperationTypes.EQ,
    OperationTypes.NE,
    OperationTypes.NOT_EMPTY,
    OperationTypes.EMPTY,
  ],
  [FieldType.NUM]: [
    OperationTypes.EQ,
    OperationTypes.NE,
    OperationTypes.GT,
    OperationTypes.LT,
    OperationTypes.GE,
    OperationTypes.LE,
  ],
  [FieldType.EMAIL]: [OperationTypes.EQ, OperationTypes.NE],
  [FieldType.IP]: [OperationTypes.EQ, OperationTypes.NE],
  [FieldType.OBJ]: [],
  [FieldType.LIST]: [],
};

type FieldTypeItem = {
  value: FieldType;
  label: string;
};

export class FieldTypes {
  // 定義欄位型別對應的 label
  private static TYPES: FieldTypeItem[] = [
    { value: FieldType.STR, label: "String" },
    { value: FieldType.NUM, label: "Number" },
    { value: FieldType.LIST, label: "List" },
    { value: FieldType.EMAIL, label: "Email" },
    { value: FieldType.BOOL, label: "Boolean" },
    { value: FieldType.IP, label: "IP" },
    { value: FieldType.OBJ, label: "Object" },
  ];

  static getAll(): FieldTypeItem[] {
    return this.TYPES;
  }

  static getItemTypes(): FieldTypeItem[] {
    return this.TYPES.filter(
      (t) => t.value !== FieldType.LIST && t.value !== FieldType.BOOL
    );
  }
}

export function getOperatorsByFieldType(ft: FieldType): Operation[] {
  return TYPE_OPERATORS[ft] ?? [];
}
