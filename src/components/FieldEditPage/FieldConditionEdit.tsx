import { ConditionField, FieldCondition } from "../../model/FieldCondition";
import { FieldType, getOperatorsByFieldType } from "../../model/FieldType";
import { Operation, OperationTypes } from "../../model/OperationType";

interface ConditionEditorProps {
  condition: FieldCondition;
  onChange: (updated: FieldCondition) => void;
  availableFields: { key: string; type: FieldType }[];
}

export default function ConditionEditor({
  condition,
  onChange,
  availableFields,
}: ConditionEditorProps) {
  const handleConditionChange = (index: number, field: keyof ConditionField, value: any) => {
    const updatedConditions = [...condition.conditions];
    if (field === "operator") {
      updatedConditions[index][field] = value as Operation;
    } else {
      updatedConditions[index][field] = value;
    }
    onChange({ ...condition, conditions: updatedConditions });
  };

  const handleAdd = () => {
    // 這裡新增一個預設 operator
    const updatedConditions = [
      ...condition.conditions,
      { key: "", operator: OperationTypes.EQ, value: "" },
    ];
    onChange({ ...condition, conditions: updatedConditions });
  };

  const handleDelete = (index: number) => {
    const updatedConditions = [...condition.conditions];
    updatedConditions.splice(index, 1);
    onChange({ ...condition, conditions: updatedConditions });
  };

  const getAvailableOperators = (key: string) => {
    const field = availableFields.find((f) => f.key === key);
    if (!field) return [];
    return getOperatorsByFieldType(field.type);
  };

  return (
    <div>
      <div className="mb-2">
        <button type="button" className="btn btn-sm btn-primary" onClick={handleAdd}>
          Add Condition
        </button>
      </div>

      {condition.conditions.map((c: ConditionField, i) => (
        <div key={i} className="row mb-2 align-items-end">
          {/* Field */}
          <div className="col-sm-4">
            <select
              className="form-select form-select-sm"
              value={c.key}
              onChange={(e) => handleConditionChange(i, "key", e.target.value)}
            >
              <option value="">Select Field</option>
              {availableFields.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.key} ({f.type})
                </option>
              ))}
            </select>
          </div>

          {/* Operator */}
          <div className="col-sm-3">
            <select
              className="form-select form-select-sm"
              value={c.operator.key}
              onChange={(e) => {
                const op = getAvailableOperators(c.key).find(
                  (o) => o.key === e.target.value
                );
                if (op) handleConditionChange(i, "operator", op);
              }}
            >
              <option value="">Select Operator</option>
              {getAvailableOperators(c.key).map((op) => (
                <option key={op.key} value={op.key}>
                  {op.value}
                </option>
              ))}
            </select>
          </div>

          {/* Value */}
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Value"
              value={c.value}
              disabled={
                c.operator.key === OperationTypes.EMPTY.key ||
                c.operator.key === OperationTypes.NOT_EMPTY.key
              }
              onChange={(e) => handleConditionChange(i, "value", e.target.value)}
            />
          </div>

          {/* Delete */}
          <div className="col-sm-1">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger w-100"
              onClick={() => handleDelete(i)}
            >
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}