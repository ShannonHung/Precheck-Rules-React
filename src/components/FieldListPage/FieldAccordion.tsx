import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { useState } from 'react';
import { Field } from '../../model/Field';


// 將你的 Field[] 轉成 TreeNode[]
const mapToTreeNode = (fields: Field[], parentPath = '') =>
  fields.map((f) => {
    const currentPath = parentPath ? `${parentPath}.${f.key}` : f.key;
    return {
      key: currentPath,
      data: {
        key: f.key,
        description: f.description,
        type: f.type,
        item_type: f.item_type,
        required: f.required,
        parent_path: parentPath,
        condition: f.condition, // 如果有 condition
      },
      children: f.children ? mapToTreeNode(f.children, currentPath) : [],
    };
  });

export default function FieldTreeTable({ data }: { data: Field[] }) {
  const [nodes, setNodes] = useState(mapToTreeNode(data));
  const [globalFilter, setGlobalFilter] = useState('');

  const typeBodyTemplate = (rowData: any) => {
    return rowData.data.type === 'list' && rowData.data.item_type
      ? `${rowData.data.type} (${rowData.data.item_type})`
      : rowData.data.type;
  }

  const requiredBodyTemplate = (rowData: any) => (
    <div>
      {rowData.data.required ? 'Yes' : 'No'}
      {rowData.data.condition?.conditions?.length > 0 && (
        <span
          className="text-danger ms-2"
          data-bs-custom-class="custom-popover"
          data-bs-trigger="hover"
          data-bs-content={`When ${rowData.data.condition.conditions.length} conditions match, turn to 'Required'.`}
          data-bs-toggle="popover"
          data-bs-placement="right"
        >
          <i className="bi bi-exclamation-triangle-fill"></i>
        </span>
      )}
    </div>
  );

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="d-flex gap-2">
        <a className="btn btn-primary btn-sm"><i className="bi bi-pencil-fill"></i></a>
        <button type="submit" className="btn btn-outline-danger btn-sm" onClick={(e) => {
          if (!confirm('Are you sure you want to delete this field?')) e.preventDefault();
        }}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Fields Table</h5>
        <input
          type="text"
          className="form-control"
          style={{ width: '300px' }}
          placeholder="Global Search..."
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="card-body">
        <TreeTable value={nodes} globalFilter={globalFilter} tableStyle={{ minWidth: '50rem' }} paginator rows={10} sortMode="multiple">
          <Column field="key" header="Field" expander sortable style={{ width: '20%' }} />
          <Column field="description" header="Description" sortable style={{ width: '30%' }} />
          <Column field="type" header="Type" body={typeBodyTemplate} sortable style={{ width: '20%' }} />
          <Column field="required" header="Required" body={requiredBodyTemplate} sortable style={{ width: '20%' }} />
          <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }} />
        </TreeTable>
      </div>
    </div>
  );
}
