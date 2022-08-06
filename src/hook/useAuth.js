import { AUTH_TOKEN } from "helpers/common.constants";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { token } = useSelector((state) => state?.authenticate);
  const isToken = localStorage.getItem(AUTH_TOKEN);

  return !!isToken || !!token;
};

export default useAuth;
