import { useContext } from "react";
import { AuthContext } from "../context/authContext";
export const useAuth = () => {
  const {user, setUser, isAuthorized, setIsAuthorized} = useContext(AuthContext);
  return { user, setUser, isAuthorized, setIsAuthorized };
};