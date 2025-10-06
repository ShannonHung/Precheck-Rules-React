import { JSX } from "react";

function BreadCrumb({ setPathParts, onClickFolder, pathParts }): JSX.Element {

  return (<nav className="m-2">
    Current Folder:
    <span
      className="text-primary cursor-pointer m-1"
      onClick={() => setPathParts([])}
      style={{ cursor: "pointer" }}
    >
      <i className="bi bi-house-door"></i>
    </span>
    {pathParts.map((part, index) => (
      <span key={index}>
        {" / "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => onClickFolder(index)}
          style={{ cursor: "pointer" }}
        >
          {part}
        </span>
      </span>
    ))}
  </nav>);
}
export default BreadCrumb;