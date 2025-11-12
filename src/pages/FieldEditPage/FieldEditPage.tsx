import { FormEvent, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useLoaderData, useSearchParams } from "react-router-dom";
import FlashMessageComponent from "../../components/common/FlashMessageComponent";
import Header from "../../components/common/Header";
import PopoverIcon from "../../components/common/PopMessageComponent";
import ConditionEditor from "../../components/FieldEditPage/FieldConditionEdit";
import { Field } from "../../model/Field";
import { FieldCondition, Logic } from "../../model/FieldCondition";
import { FieldType, FieldTypes } from "../../model/FieldType";
import { FlashMessage } from "../../model/FlashMessage";

export default function FieldEditPage() {
  const { field, parent } = useLoaderData() as { field: Field; parent?: Field };
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [searchParams] = useSearchParams();
  const pathParam = searchParams.get("path");
  const fieldPathParam = searchParams.get("field_path");
  console.log("data", field)
  console.log("parent", parent)
  // 可編輯狀態
  const [selectedTypeList, setSelectedTypeList] = useState<FieldType[]>(field.multi_type || []);
  const [selectedItemTypeList, setSelectedItemTypeList] = useState<FieldType[]>(field.item_multi_type || []);
  const [regex, setRegex] = useState(field.regex || "");
  const [regexEnable, setRegexEnable] = useState(field.regex_enabled || false);
  const [required, setRequired] = useState(field.required);
  const [description, setDescription] = useState(field.description || "");
  const [condition, setCondition] = useState<FieldCondition[]>(field.condition || { logical: Logic.AND, conditions: [] });

  const hasChildFields = field.children.length > 0;
  const hasParentField = parent ?
    !(FieldType.LIST in parent.multi_type) && !(FieldType.OBJ in parent.multi_type)
    : false;
  const hasItemType = (types: FieldType[]) => {
    return types.includes(FieldType.LIST) || types.includes(FieldType.OBJ)
  }
  const hasRegexType = (types: FieldType[]) => {
    return types.includes(FieldType.STR) || types.includes(FieldType.NUM)
  }

  const allTypes = FieldTypes.getAll();

  const TYPE_POP = "These types are precheck rules for yaml key's value.";
  const ITEM_POP = "Only for 'list' type fields, define the item types.";
  const REGEXT_POP = "Enable Regex to evaluate value match regex or not. Disable Regex will required same as value."

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedField: Field = {
      ...field,
      multi_type: selectedTypeList,
      item_multi_type: selectedItemTypeList,
      regex,
      required,
      description,
    };
    console.log("Submit Field:", updatedField);
    // TODO: 呼叫 API 更新 field
  };

  return (
    <div className="container mt-5">
      <Header
        href={`/file?path=${pathParam}`}
        iconClass="bi bi-arrow-bar-left"
        text="Back"
      >
        Edit Field: {fieldPathParam}
      </Header>

      <FlashMessageComponent message={flashMessage} onClose={() => setFlashMessage(null)} />

      <form onSubmit={handleSubmit}>
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Information</h5>
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-upload"></i> Update Info
            </button>
          </div>
          <div className="card-body">

            {/* Multi Type */}
            <div className="mb-3">
              <label className="form-label">
                Type <PopoverIcon content={TYPE_POP} icon="bi-info-circle" />
              </label>
              <Typeahead
                id="multi-type"
                labelKey="label"
                multiple
                options={allTypes.filter((t) => !selectedTypeList.includes(t.value as FieldType))}
                selected={selectedTypeList.map((t) => ({ value: t, label: t }))}
                onChange={(selected) => {
                  const types = selected.map((s: any) => s.value);
                  setSelectedTypeList(types);
                }}
                disabled={hasChildFields || hasParentField}
              />
              {hasChildFields && <div className="form-text text-danger">Cannot edit type because has child fields</div>}
              {hasParentField && <div className="form-text text-danger">Cannot edit type because has parent field</div>}
            </div>

            {/* Item Type */}
            {hasItemType(selectedTypeList) && (
              <div className="mb-3">
                <label className="form-label">
                  List Item Type <PopoverIcon content={ITEM_POP} icon="bi-info-circle" />
                </label>
                <Typeahead
                  id="item-type"
                  labelKey="label"
                  multiple
                  options={allTypes}
                  selected={selectedItemTypeList.map((t) => ({ value: t, label: t }))}
                  onChange={(selected) => setSelectedItemTypeList(selected.map((s: any) => s.value))}
                  disabled={hasChildFields}
                />
                {hasChildFields && <div className="form-text text-danger">Cannot edit item type because has child fields</div>}
              </div>
            )}

            {/* Regex */}
            {hasRegexType(selectedTypeList) && (
              <div className="mb-3">
                <label className="form-label me-2">
                  {regexEnable ? "Regex" : "Value"}
                  <PopoverIcon content={REGEXT_POP} icon="bi-info-circle" />
                </label>
                <button
                  type="button"
                  className={`btn btn-sm ${regexEnable ? "btn-success" : "btn-danger"} me-2`}
                  onClick={() => setRegexEnable(!regexEnable)}
                >
                  {regexEnable ? "ON" : "OFF"}
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                />
              </div>
            )}

            {/* Required */}
            <div className="mb-3">
              <label className="form-label">Required</label>
              <select
                className="form-select"
                value={required ? "true" : "false"}
                onChange={(e) => setRequired(e.target.value === "true")}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Condition  */}
        <ConditionEditor
          condition={field.condition}
          availableFields={[]} // 你原本提供的可選欄位列表
          onChange={(updatedCondition: FieldCondition) => {
            // 更新 field 狀態
            console.log("update condition", updatedCondition)
          }}
        />
      </form>
    </div>
  );
}
