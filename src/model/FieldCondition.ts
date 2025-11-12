import { Operation } from "./OperationType";

export enum Logic {
  AND = "and",
  OR = "or",
}

export interface FieldCondition {
  logical: Logic;
  conditions: ConditionField[];
}

export interface ConditionField {
  key: string;
  operator: Operation;
  value: string;
}
