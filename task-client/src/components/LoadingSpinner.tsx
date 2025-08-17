import { Spinner } from "@heroui/react";

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export default LoadingSpinner;
