import { JSX, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Field } from "../../model/Field";
import { FieldType, FieldTypes } from "../../model/FieldType";
import PopoverIcon from "../common/PopMessageComponent";

function FieldCreate({ onClickCreate, parentFieldList }): JSX.Element {
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


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit trigger")
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
                  {parentFieldList.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.key} ({item.type})
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
                  options={allTypes.map((t) => ({ value: t.value, label: t.label }))}
                  selected={selectedTypeList.map((t) => ({ value: t, label: t }))}
                  onChange={(selected) => {
                    const types = selected.map((s: any) => s.value);
                    setSelectedTypeList(types);

                    if (types.includes(FieldType.LIST)) {
                      setShowItemType(true);
                    } else {
                      setShowItemType(false);
                    }
                  }}
                />
              </div>
            </div>

            {/* Item Type */}
            {showItemType && (
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