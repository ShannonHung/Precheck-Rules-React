import { JSX } from "react";
import { FileType, PrecheckFile } from "../../model/PrecheckFile";

function FileShow({ onClickFile, onClickDelete, files }): JSX.Element {
  const getFileIcon = (fileType: FileType): JSX.Element | null => {
    switch (fileType) {
      case FileType.FOLDER:
        return <i className="bi bi-folder2 me-2" />;
      case FileType.FILE:
        return <i className="bi bi-file-earmark-text me-2" />;
      default:
        return null;
    }
  };

  return (<div className="list-group">
    {files.map((file) => (
      <div
        key={file.name}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className="text-decoration-none"
          style={{ cursor: "pointer" }}
          onClick={() => onClickFile(file)}
        >
          {getFileIcon(file.file_type)}
          {file.name}
        </span>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onClickDelete(file)}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    ))}
  </div>);
}
export default FileShow;