import { USER_ROLE } from "config/constant";
import { AUTH_TOKEN } from "helpers/common.constants";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const useCheckRoleUser = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  useEffect(() => {
    if (token) {
      setIsAdmin(token?.roles?.includes(USER_ROLE.ROLE_ADMIN));
    }
  }, [token]);
  return isAdmin;
};

export default useCheckRoleUser;
