import React from "react";
import { Navigate } from "react-router-dom";
import {auth} from "./firebase"

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" />;
}
 