export const OperationTypes = {
  EQ: { key: "eq", value: "==" },
  NE: { key: "ne", value: "!=" },
  GT: { key: "gt", value: ">" },
  GE: { key: "ge", value: ">=" },
  LT: { key: "lt", value: "<" },
  LE: { key: "le", value: "<=" },
  NOT_EMPTY: { key: "not_empty", value: "Not None" },
  EMPTY: { key: "empty", value: "Is None" },
} as const;

export type OperationKey = keyof typeof OperationTypes; // "EQ" | "NE" | ...
export type Operation = (typeof OperationTypes)[OperationKey]; // { key: string, value: string }
