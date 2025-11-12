import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Field } from '../../model/Field';
import PopoverIcon from '../common/PopMessageComponent';

// 將你的 Field[] 轉成 TreeNode[]
const mapToTreeNode: any = (fields: Field[], parentPath = '') =>
  fields.map((f: any) => {
    const currentPath = parentPath ? `${parentPath}.${f.key}` : f.key;
    return {
      key: currentPath,
      data: {
        key: f.key,
        description: f.description,
        multi_type: f.multi_type,
        item_multi_type: f.item_multi_type,
        required: f.required,
        parent_path: parentPath,
        condition: f.condition, // 如果有 condition
      },
      children: f.children ? mapToTreeNode(f.children, currentPath) : [],
    };
  });
interface FieldTreeTable {
  onClickDelete: (parentPath: any, target: any) => void;
  fieldList: Field[];
}
export default function FieldTreeTable({ onClickDelete, fieldList }: FieldTreeTable) {
  const [nodes, setNodes] = useState(mapToTreeNode(fieldList));
  const [globalFilter, setGlobalFilter] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pathParam = searchParams.get("path");

  useEffect(() => {
    setNodes(mapToTreeNode(fieldList));
  }, [fieldList]); // 當 data 改變時重新計算 nodes

  const typeBodyTemplate = (rowData: any) => {
    const multiType: string[] = rowData.data.multi_type || [];
    const itemMultiType: string[] = rowData.data.item_multi_type || [];

    // 分離 list / object 與其他型別
    const normalTypes = multiType.filter((t) => t !== 'list' && t !== 'object');
    const specialTypes = multiType.filter((t) => t === 'list' || t === 'object');

    // 處理 list / object 型別
    const specialTypeStrings = specialTypes.map((t) => {
      if (itemMultiType.length > 0) {
        return `${t}(${itemMultiType.join(', ')})`;
      }
      return t;
    });

    // 合併一般型別 + list/object 型別
    return [...normalTypes, ...specialTypeStrings].join(', ') || '-';
  };

  const requiredBodyTemplate = (rowData: any) => (
    <div>
      {rowData.data.required ? 'Yes' : 'No'}
      {rowData.data.condition?.conditions?.length > 0 && (
        <PopoverIcon
          content={`When ${rowData.data.condition.conditions.length} conditions match, turn to 'Required'.`}
          icon="bi-exclamation-triangle-fill"
        />
      )}
    </div>
  );

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" onClick={(e) => {
          const field_path = rowData.key ? rowData.key : "";
          const parent_path = rowData.data.parent_path ? rowData.data.parent_path : "";
          console.log("Edit Click:", rowData)
          console.log("parent:", parent_path)
          navigate(
            `/field?path=${pathParam}&field_path=${encodeURIComponent(field_path)}&parent_path=${encodeURIComponent(parent_path)}`
          );
        }}>
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button className="btn btn-outline-danger btn-sm" onClick={(e) => {
          if (confirm('Are you sure you want to delete this field?')) {
            console.log("Delete Yes", rowData.data)
            const target = rowData.data
            onClickDelete(target.parent_path, target)
          }
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
        <TreeTable value={nodes} globalFilter={globalFilter} tableStyle={{ minWidth: '50rem', borderCollapse: 'collapse' }} paginator rows={10} sortMode="multiple" >
          <Column field="key" header="Field" expander sortable style={{ width: '20%' }} />
          <Column field="description" header="Description" sortable style={{ width: '30%' }} />
          <Column field="multi_type" header="Multi Type" body={typeBodyTemplate} sortable style={{ width: '25%' }} />
          <Column field="required" header="Required" body={requiredBodyTemplate} sortable style={{ width: '15%' }} />
          <Column header="Action" body={actionBodyTemplate} style={{ width: '10%' }} />
        </TreeTable>
      </div>
    </div>
  );
}
