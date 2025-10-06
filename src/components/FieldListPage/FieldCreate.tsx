import { JSX, useEffect, useState } from "react";
import { Field } from "../../model/Field";
import { FieldType, FieldTypes } from "../../model/FieldType";
import { ParentField } from "../../model/ParentField";
import PopoverIcon from "../common/PopMessageComponent";

function FieldCreate({ onCreate, data }): JSX.Element {
  const [fieldList, setFieldList] = useState<Field[]>([]);
  const [parentFieldList, setParentFieldList] = useState<ParentField[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedItemType, setSelectedItemType] = useState<FieldType>(FieldType.STR);
  const [selectedType, setSelectedType] = useState<FieldType>(FieldType.STR);
  const [showItemType, setShowItemType] = useState(false);

  const itemTypes = FieldTypes.getItemTypes();

  useEffect(() => {
    if (data) {
      setFieldList(data.fields || []);
      setParentFieldList(data.parentFields || []);
    }
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit trigger")
  };

  const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("type changed", event)
  }

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
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Parent Field
                  <PopoverIcon content="這是右側提示" icon="bi-info-circle" />
                </label>
                <select
                  className="form-select"
                  id="parent_field"
                  name="parent_field"
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                >
                  <option value="">Root (.)</option>
                  {parentFieldList.map((item) => (
                    <option
                      key={item.key}
                      value={item.key}
                    >
                      {item.key} ({item.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Field Name
                  <span className="text-danger">*</span>
                  <PopoverIcon content="這是右側提示" icon="bi-info-circle" />
                </label>
                <input type="text" className="form-control" id="field_name" name="field_name" required></input>
              </div>
            </div>
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Description
                  <PopoverIcon content="這是右側提示" icon="bi-info-circle" />
                </label>
                <input type="text" className="form-control" id="description" name="description"></input>
              </div>
            </div>
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Type
                  <PopoverIcon content="這是右側提示" icon="bi-info-circle" />
                </label>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={selectedType}
                  onChange={(e) => onTypeChange(e)}
                >
                  {itemTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2" style={{ display: showItemType ? "block" : "none" }}>
              <div className="mb-3">
                <label className="form-label">
                  List Item Type<span className="text-danger">*</span>
                  <PopoverIcon content="這是右側提示" icon="bi-info-circle" />
                </label>
                <select
                  className="form-select"
                  id="item_type"
                  name="item_type"
                  value={selectedItemType}
                  onChange={(e) => setSelectedItemType(e.target.value as FieldType)}
                >
                  {itemTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <div className="mb-3">
                <label className="form-label">
                  Is required?
                  <PopoverIcon content="When it set up to 'True', this field must show up in the YAML file." icon="bi-info-circle" />
                </label>
                <select className="form-select" id="required" name="required">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        </div >
      </form>
    </div >
  )
}

export default FieldCreate;