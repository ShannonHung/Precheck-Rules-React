import { JSX, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps): JSX.Element {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1 className="mb-4">{children}</h1>
      <a href="\" className="btn btn-success">
        <i className="bi bi-house-door"></i> Home
      </a>
    </div>

  )
}

export default Header;