import React from "react";

const RegisterForm = ({ user, handleChange, handleSubmit }) => (
  <div className="login-container">
    <div className="login-input">
      <input
        value={user.userName || ""}
        onChange={(e) => handleChange(e.target.value, "userName")}
        type="text"
        placeholder="Tài khoản"
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
        placeholder="Mật khẩu"
      />
      <span className="login-symbol">
        <i className="fa fa-lock"></i>
      </span>
    </div>
    <div className="login-input">
      <input
        value={user.confirmPassword || ""}
        onChange={(e) => handleChange(e.target.value, "confirmPassword")}
        type="password"
        placeholder="Xác nhận mật khẩu"
      />
      <span className="login-symbol">
        <i className="fa fa-lock"></i>
      </span>
    </div>
    <div className="login-input">
      <input
        value={user.fullName || ""}
        onChange={(e) => handleChange(e.target.value, "fullName")}
        type="text"
        placeholder="Tên đầy đủ"
      />
      <span className="login-symbol">
        <i className="fa fa-info"></i>
      </span>
    </div>
    <div className="login-input">
      <input
        value={user.email || ""}
        onChange={(e) => handleChange(e.target.value, "email")}
        type="email"
        placeholder="Email"
      />
      <span className="login-symbol">
        <i className="fa fa-email"></i>
      </span>
    </div>
    <button onClick={handleSubmit} className="login-btn">
      Đăng ký
    </button>
  </div>
);

export default RegisterForm;
