import React, { ReactNode } from "react";
import ErrorBoundary from "../ErrorPage/ErrorBoundary";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface DefaultPageProps {
  children: ReactNode;
}

export const DefaultPage: React.FC<DefaultPageProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};
