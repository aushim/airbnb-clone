"use client";

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <div className="mt-8">{children}</div>;
};

export default PageContent;
