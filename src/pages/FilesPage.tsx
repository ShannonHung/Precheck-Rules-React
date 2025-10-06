import { JSX, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import FlashMessageComponent from "../components/common/FlashMessageComponent";
import Header from "../components/common/Header";
import BreadCrumb from "../components/FilesPage/Breadcrumb";
import FileCreate from "../components/FilesPage/FileCreate";
import FileShow from "../components/FilesPage/FileShow";

import handleAxiosError from "../services/axiosErrorHandler";
import FileService from "../services/fileService";

import { FlashMessage } from "../model/FlashMessage";
import { FileType, PrecheckFile } from "../model/PrecheckFile";

function FilesPage(): JSX.Element {
  const [files, setFiles] = useState<PrecheckFile[]>([]);
  const [pathParts, setPathParts] = useState<string[]>([]);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  const navigate = useNavigate();
  const currentPath = pathParts.join("/");

  useEffect(() => {
    fetchFileList();
  }, [currentPath]);

  const handleClickFile = (file: PrecheckFile): void => {
    if (file.file_type === FileType.FOLDER) {
      setPathParts((prev) => [...prev, file.name]);
    } else if (file.file_type === FileType.FILE) {
      const click_path = currentPath + "/" + file.name
      navigate(`/file?path=${encodeURIComponent(click_path)}`)
    }
  };

  const handleBreadcrumbClick = (index: number): void => {
    const newPathParts = pathParts.slice(0, index + 1);
    setPathParts(newPathParts);
  };

  const handleDeleteClick = (file: PrecheckFile) => {
    const click_path = currentPath + "/" + file.name
    const confirmed = window.confirm(`Are you sure you want to delete "${click_path}"?`);
    if (!confirmed) return;

    FileService.deleteFile(click_path)
      .then((res) => {
        setFlashMessage({ type: "success", message: res.data.message })
        fetchFileList()
      }, (err) => {
        setFlashMessage({ type: "danger", message: handleAxiosError(err) });
      })
  }

  const fetchFileList = () => {
    FileService.getFileList(currentPath)
      .then((res) => setFiles(res))
      .catch((err) => console.error("Error", err));
  };

  const createFile = (newFile: PrecheckFile) => {
    FileService.createFile(currentPath, newFile)
      .then(() => {
        setFlashMessage({ type: "success", message: `${newFile.file_type} (${newFile.name}) created!` })
        fetchFileList()
      }, (err) => {
        setFlashMessage({ type: "danger", message: handleAxiosError(err) });
      }
      )
  }

  return (
    <div className="container mt-5">
      <Header> Json Editor </Header>
      <FlashMessageComponent message={flashMessage} onClose={() => setFlashMessage(null)} />
      <FileCreate onCreate={createFile} />

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Select a file or folder:</h5>

          <BreadCrumb
            setPathParts={setPathParts}
            onClickFolder={() => handleBreadcrumbClick}
            pathParts={pathParts} />

          <FileShow
            onClickFile={handleClickFile}
            onClickDelete={handleDeleteClick}
            files={files} />

        </div>
      </div>
    </div>
  );
}

export default FilesPage;
