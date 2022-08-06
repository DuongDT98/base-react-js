import React from "react";
import { useHistory } from "react-router-dom";

const PageUseRole = () => {
  const navigate = useHistory();
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 className="title-not-found">
        403 - Bạn không có quyền truy cập trang này
      </h1>
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

export default PageUseRole;
