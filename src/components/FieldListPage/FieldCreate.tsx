import { JSX, useEffect, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Field } from "../../model/Field";
import { FieldType, FieldTypes } from "../../model/FieldType";
import { ParentField } from "../../model/ParentField";
import PopoverIcon from "../common/PopMessageComponent";
interface FieldCreateProps {
  onClickCreate: (selectedParent: string, newField: any) => void;
  parentFieldList: ParentField[];
}
function FieldCreate({ onClickCreate, parentFieldList }: FieldCreateProps): JSX.Element {
  const [showItemType, setShowItemType] = useState(false);

  const [selectedParent, setSelectedParent] = useState("");
  const [selectedTypeList, setSelectedTypeList] = useState<FieldType[]>([]);
  const [selectedItemTypeList, setSelectedItemTypeList] = useState<FieldType[]>([]);
  const [fieldName, setFieldName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);

  const PARENT_FIIELD_POP: string = "If you want to depend on a parent fields, it only shows the field which type is 'list(object)' or 'object'. Because only these kind of parent field can have child fields."
  const TYPE_POP: string = "These types are precheck rules for yaml key's value."
  const REQUIRED_POP: string = "When it set up to 'True', this field must show up in the YAML file."

  const itemTypes = FieldTypes.getItemTypes();
  const allTypes = FieldTypes.getAll();
  const availableOptions = allTypes.filter(
    (t) => !selectedTypeList.includes(t.value as FieldType)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newField: Field = {
      key: fieldName,
      description,
      multi_type: selectedTypeList,
      item_multi_type: selectedItemTypeList,
      regex: "",
      regex_enabled: false,
      required,
      condition: [],
      children: [],
    };
    if (showItemType && selectedItemTypeList.length === 0) {
      alert("Item Type is required");
      return;
    }
    // 如果 item type 必填時
    onClickCreate(selectedParent, newField);

    // 清空輸入
    setSelectedParent("");
    setFieldName("");
    setDescription("");
    setSelectedTypeList([FieldType.STR]);
    setSelectedItemTypeList([]);
    setShowItemType(false);
    setRequired(false);
  };

  const hasItemType = (types: FieldType[]) => {
    return types.includes(FieldType.LIST) || types.includes(FieldType.OBJ)
  }
  const selectedParentItemType = selectedParent
    ? parentFieldList.find((p) => p.key === selectedParent)?.itemType
    : null;

  useEffect(() => {
    if (selectedParentItemType) {
      setSelectedTypeList(selectedParentItemType);
    }
  }, [selectedParentItemType]);
  const restrictMultiType = () => {
    if (selectedParentItemType) {
      return selectedParentItemType.map((t) => ({ value: t, label: t }));
    } else {
      return selectedTypeList.map((t) => ({ value: t, label: t }));
    }
  };

  return (
    <div className="card mb-4">
      <form onSubmit={handleSubmit}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Add new Field</h5>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Add
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Parent Field */}
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Parent Field
                  <PopoverIcon content={PARENT_FIIELD_POP} icon="bi-info-circle" />
                </label>
                <select
                  className="form-select"
                  id="parent_field"
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                >
                  <option value="">Root (.)</option>
                  {parentFieldList.map((item: ParentField) => (
                    <option key={item.key} value={item.key}>
                      {item.key} ({item.type.join(", ")})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field Name */}
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Field Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="field_name"
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Multi Type */}
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">Multi Type
                  <PopoverIcon content={TYPE_POP} icon="bi-info-circle" />
                </label>
                <Typeahead
                  id="multi-type"
                  labelKey="label"
                  multiple
                  options={availableOptions}
                  selected={restrictMultiType()}
                  onChange={(selected) => {
                    const types = selected.map((s: any) => s.value);
                    setSelectedTypeList(types);

                    if (hasItemType(types)) {
                      setShowItemType(true);
                    } else {
                      setShowItemType(false);
                    }
                  }}
                  disabled={selectedParentItemType ? true : false}
                />
              </div>
            </div>

            {/* Item Type */}
            {hasItemType(selectedTypeList) && (
              <div className="col-md-2">
                <div className="mb-3">
                  <label className="form-label">
                    Item Type<span className="text-danger">*</span>
                  </label>
                  <Typeahead
                    id="item-type"
                    labelKey="label"
                    multiple
                    options={itemTypes.map((t) => ({ value: t.value, label: t.label }))}
                    selected={selectedItemTypeList.map((t) => ({ value: t, label: t }))}
                    onChange={(selected) => {
                      setSelectedItemTypeList(selected.map((s: any) => s.value));
                    }}
                  />
                </div>
              </div>
            )}

            {/* Required */}
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">Is required?
                  <PopoverIcon content={REQUIRED_POP} icon="bi-info-circle" />
                </label>
                <select
                  className="form-select"
                  id="required"
                  value={String(required)}
                  onChange={(e) => setRequired(e.target.value === "true")}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FieldCreate;