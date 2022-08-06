import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { genders } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";

const { Title } = Typography;

const UserDetailEdit = ({ user, roleUser, handleFormValue, form }) => {
  const [listBank, setListBank] = useState([]);

  const getDataBank = async () => {
    // Call APi get data

    var result = await getParams("/bank-info");
    if (result) {
      console.log(result);
      setListBank(result || []);
    } else {
      setListBank([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  useEffect(() => {
    getDataBank();
  }, []);

  const initValue = {
    fullName: user.fullName,
    gender: user.gender,
    email: user.email,
    employeeCode: user.employeeCode,
    departmentDTOName: user.departmentDTO.name,
    role: roleUser,
  };

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item p-3">
        <Form form={form} initialValues={initValue}>
          <Row gutter={24}>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Tên đầy đủ
              </label>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Email
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>

            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Mã nhân viên
              </label>
              <Form.Item
                name="employeeCode"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Giới tính
              </label>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Select style={{ width: "80%" }}>
                  {genders?.map((item) => (
                    <Select.Option value={item.value} key={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Phòng ban
              </label>
              <Form.Item
                name="departmentDTOName"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>

            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Chức danh
              </label>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </li>
    </ul>
  );
};

export default UserDetailEdit;
