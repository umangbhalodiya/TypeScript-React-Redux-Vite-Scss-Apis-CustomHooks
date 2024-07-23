import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface DefaultPageProps {
  children: ReactNode;
}
export const Protectedroute: React.FC<DefaultPageProps> = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn && !user.username) {
    return <Navigate to="/register" replace />;
  }
  return children;
};
