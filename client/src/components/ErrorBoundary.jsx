import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = ({ error }) => (
  <div>
    <h2>Oops! Something went wrong.</h2>
    <p>{error.message}</p>
  </div>
);

export default function CustomErrorBoundary({ children }) {
  return <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>;
}
