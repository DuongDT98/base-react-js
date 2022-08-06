import { Form, Input, Button, Select, Tooltip, Modal } from "antd";
import { GENDERS, ROLE_EMPLOYESS } from "config/constant";
import { FIELD_REQUIRED } from "helpers/message";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams, patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, TAILLAYOUT } from "../../../../../helpers/constants";
const { Option } = Select;

const ModalEdit = ({
  dataSelect,
  isRequestFormEditOpen,
  setAddRequestFormEditOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();
  const [dataDepartment, setDataDepartment] = useState([]);

  const intValueForm = {
    email: dataSelect?.email.trim(),
    fullName: dataSelect?.fullName.trim(),
    employeeCode: dataSelect?.employeeCode.trim(),
    department: dataSelect?.departmentDTO?.id,
    role: dataSelect?.role.trim(),
    gender: dataSelect?.gender?.trim() || "",
  };

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
    let data = {
      email: Formvalues?.email.trim(),
      fullName: Formvalues?.fullName.trim(),
      employeeCode: Formvalues?.employeeCode.trim(),
      departmentId: Formvalues?.department,
      role: Formvalues?.role.trim(),
      gender: Formvalues?.gender.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/user/${dataSelect.employeeCode}`, data);
    if (result) {
      toast("Sửa thành công", optionsSuccess);
      setAddRequestFormEditOpen(false);
      checkLoadData();
    } else {
      toast("Sửa thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa"
      centered
      visible={isRequestFormEditOpen}
      footer={null}
      width={800}
      onCancel={() => setAddRequestFormEditOpen(false)}
    >
      <Form
        {...LAYOUT}
        form={form}
        initialValues={intValueForm}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Tên đăng nhập"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
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
            onClick={() => setAddRequestFormEditOpen(false)}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalEdit;
