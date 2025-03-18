import React, { ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="text-3xl font-bold mb-2">{children}</h1>;
}

export default PageHeader;
