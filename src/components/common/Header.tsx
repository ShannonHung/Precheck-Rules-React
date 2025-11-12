import { JSX, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  href?: string;        // 自訂 Home 的連結
  iconClass?: string;   // 自訂 icon class
  text?: string;
}

function Header({
  children,
  href = "\\",               // 預設路徑
  iconClass = "bi bi-house-door", // 預設 icon
  text = "Home"
}: HeaderProps): JSX.Element {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-4">{children}</h1>
      <a href={href} className="btn btn-success">
        <i className={iconClass}></i> {text}
      </a>
    </div>
  );
}

export default Header;
