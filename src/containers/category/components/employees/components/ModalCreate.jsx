import { Form, Input, Button, Select, Tooltip, Modal } from "antd";
import { GENDERS, ROLE_EMPLOYESS } from "config/constant";
import { FIELD_DUPLICATE, FIELD_REQUIRED } from "helpers/message";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createData, getParams } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, TAILLAYOUT } from "../../../../../helpers/constants";
const { Option } = Select;

const ModalCreate = ({
  listData,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
  getData,
}) => {
  const [form] = Form.useForm();
  const [dataDepartment, setDataDepartment] = useState([]);

  const getDepartment = useCallback(async () => {
    // Call APi get data

    var result = await getParams("/department");
    if (result) {
      setDataDepartment(result || []);
    } else {
      setDataDepartment([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, []);

  useEffect(() => {
    getDepartment();
  }, [getDepartment]);

  const onFinish = async (Formvalues) => {
    const roleName = [];
    roleName.push({
      name: Formvalues?.role.trim(),
    });
    let data = {
      email: Formvalues?.email?.trim(),
      fullName: Formvalues?.fullName?.trim(),
      employeeCode: Formvalues?.employeeCode?.trim(),
      departmentId: Formvalues?.department,
      roles: roleName,
      gender: Formvalues?.gender?.trim(),
      password: "123456",
    };
    // call API create

    var result = await createData("/register", data);
    // if (result) {
    if (result) {
      toast("Thêm thành công", optionsSuccess);
      setAddRequestFormCreateOpen(false);
      checkLoadData();
      getData();
    }
    // } else {
    //   toast("Thêm thất bại. Vui lòng thử lại sau!!!", optionsError);
    // }
  };

  return (
    <Modal
      title="Thêm mới"
      centered
      visible={isRequestFormCreateOpen}
      footer={null}
      width={800}
      onCancel={() => setAddRequestFormCreateOpen(false)}
    >
      <Form {...LAYOUT} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Tên đăng nhập"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  listData.find(
                    (item) => item.email === getFieldValue("email").trim()
                  )
                ) {
                  return Promise.reject(new Error(FIELD_DUPLICATE));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Tên đầy đủ"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employeeCode"
          label="Mã nhân viên"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="department"
          label="Bộ phận"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn bộ phận" allowClear showSearch>
            {dataDepartment?.map((item) => (
              <Option value={item.id}>
                <Tooltip title={item.name}>{item.name}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn vai trò" allowClear showSearch>
            {ROLE_EMPLOYESS?.map((item) => (
              <Option value={item.value}>
                <Tooltip title={item.value}>{item.label}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn giới tính" allowClear showSearch>
            {GENDERS?.map((item) => (
              <Option value={item.value}>
                <Tooltip title={item.value}>{item.label}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...TAILLAYOUT}>
          <Button
            htmlType="button"
            onClick={() => setAddRequestFormCreateOpen(false)}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreate;
