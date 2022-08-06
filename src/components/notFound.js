import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const navigate = useHistory();
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="title-not-found">404 - Trang này không tồn tại</h1>
      <div className="btn-home-page">
        <div
          onClick={() => {
            navigate.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Go to HomePage
        </div>
      </div>
    </div>
  );
};

export default NotFound;
