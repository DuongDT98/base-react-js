import React, { useState } from "react";
import Modal from "react-modal";
import AddUser from "./AddUser";
import { userRoles, departments, genders } from "helpers/constants";
import { getLabelFromValue } from "helpers/helpers";

const UserList = () => {
  const [isAddUserFormOpen, setAddUserFormOpen] = useState(false);

  const fakeData = [
    {
      name: "Nguyễn Văn A",
      department: 2,
      role: 3,
      address: "Cầu Giấy",
      phone: "03xx",
      gender: 1,
      email: "email@gmail.com",
      userName: "abc",
    },
    {
      name: "Admin",
      department: 1,
      role: 1,
      email: "admin@abc.com",
      gender: 1,
      address: "Hà Nội",
      userName: "admin",
    },
  ];

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Tổng quan</span>
          <h3 className="page-title">Danh sách nhân viên</h3>
        </div>
      </div>
      <div className="row" style={{minWidth:"1000px"}}>
        <div className="col">
          <div className="card card-small mb-4">
            <div className="card-body p-0 pb-3 text-center">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Tên Đăng Nhập
                    </th>
                    <th scope="col" className="border-0">
                      Tên
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Bộ phận
                    </th>
                    <th scope="col" className="border-0">
                      Vai trò
                    </th>
                    <th scope="col" className="border-0">
                      Giới tính
                    </th>
                    <th scope="col" className="border-0">
                      Địa Chỉ
                    </th>
                    <th scope="col" className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {fakeData.map((o, i) => (
                    <tr key={`user-${i}`}>
                      <td>{i + 1}</td>
                      <td>{o.userName}</td>
                      <td>{o.name}</td>
                      <td>{o.email}</td>
                      <td>{getLabelFromValue(departments, o.department)}</td>
                      <td>{getLabelFromValue(userRoles, o.role)}</td>
                      <td>{getLabelFromValue(genders, o.gender)}</td>
                      <td>{o.address}</td>
                      <td>
                        <i className="material-icons">edit</i>
                        <i className="material-icons">delete</i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setAddUserFormOpen(true)}
        className="mb-2 mr-1 btn btn-primary btn-sm"
        style={{ fontSize: "15px" }}
      >
        Thêm Nhân Viên
      </button>
      <Modal
        isOpen={isAddUserFormOpen}
        onRequestClose={() => setAddUserFormOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            width: "700px",
          },
        }}
        contentLabel="Example Modal"
      >
        <AddUser />
      </Modal>
    </div>
  );
};

export default UserList;
