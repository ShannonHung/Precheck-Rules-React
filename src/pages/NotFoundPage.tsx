import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();

  let message = "Sorry, something went wrong.";
  let status = 500;

  // 如果是我們丟出的 Response，就能拿到 status 和文字
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data || "Unknown error";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="text-center mt-5">
      <h1>{status}</h1>
      <p>{message}</p>

      <a href="/" className="btn btn-primary mt-3">
        Back to Home
      </a>
    </div>
  );
}
