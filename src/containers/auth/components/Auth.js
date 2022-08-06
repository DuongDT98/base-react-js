import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { set } from "helpers/storage";
import { loginAction, logout } from "store/authenticate/authenticate.actions";
import useAuth from "hook/useAuth";

const Auth = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [islogin, setLogin] = useState(true);

  const isauth = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUser = (value, key) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  useEffect(() => {
    if (isauth) history.push("/auth");
  }, [history, isauth]);

  const handleLogin = async () => {
    dispatch(loginAction(user));
    set("user", user);
  };

  const handleRegister = async () => {
    dispatch(logout());
    setLogin(true);
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="auth-form">
          {islogin ? (
            <LoginForm
              handleSubmit={handleLogin}
              user={user}
              handleChange={handleUser}
            />
          ) : (
            <RegisterForm
              user={user}
              handleChange={handleUser}
              handleSubmit={handleRegister}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
