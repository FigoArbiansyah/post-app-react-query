import React from "react";

interface ErrorPageProps {
  children: any;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ children }) => {
  return <div className="text-center py-4">{children}</div>;
};

export default ErrorPage;
