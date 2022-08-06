import React from "react";

const LoginForm = ({ user, handleChange, handleSubmit }) => (
  <>
    <div className="login-input">
      <input
        value={user.userName || ""}
        onChange={(e) => handleChange(e.target.value, "userName")}
        type="text"
        placeholder="Tài khoản"
        onKeyPress={user?.userName && user?.password && handleSubmit}
      />
      <span className="login-symbol">
        <i className="fa fa-user"></i>
      </span>
    </div>
    <div className="login-input">
      <input
        value={user.password || ""}
        onChange={(e) => handleChange(e.target.value, "password")}
        type="password"
        name="pass"
        placeholder="Mật khẩu"
        onKeyPress={user?.userName && user?.password && handleSubmit}
      />
      <span className="login-symbol">
        <i className="fa fa-lock"></i>
      </span>
    </div>
    <div className="login-btn-container">
      <button
        onClick={handleSubmit}
        type={"submit"}
        disabled={!user?.userName && !user?.password}
        className="login-btn"
      >
        Đăng nhập
      </button>
    </div>
  </>
);

export default LoginForm;
