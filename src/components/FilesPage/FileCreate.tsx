import { JSX, useState } from "react";
import { FileType } from "../../model/PrecheckFile";

function FileCreate({ onCreate }): JSX.Element {
  const [name, setName] = useState<string>('')
  const [fileType, setFileType] = useState<FileType>(FileType.FILE)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate({ name, file_type: fileType });
    // reset 
    setName('');
    setFileType(FileType.FILE);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Create new JSON file or folder</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-6">
              <label className="form-label">File name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              <div className="form-text">Please enter the file or folder name (does not need to include the .json extension)</div>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={fileType}
                onChange={(e) => setFileType(e.target.value as FileType)}
              >
                <option value={FileType.FILE}>File</option>
                <option value={FileType.FOLDER}>Folder</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-folder-plus"></i> Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default FileCreate;