import { Form, Input, Button, Modal } from "antd";
import { FIELD_REQUIRED, FIELD_SAME } from "helpers/message";
import { toast } from "react-toastify";

import { patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, TAILLAYOUT } from "../../../../../helpers/constants";

const ModalResetPass = ({
  employeeCode,
  isResetPass,
  setIsResetPass,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let params = {
      newPassword: Formvalues.newPassword.trim(),
    };
    // call API create
    try {
      await patch(`/user/${employeeCode}/password`, params);
      toast("Thay đổi mật khẩu thành công", optionsSuccess);
      setIsResetPass(false);
      checkLoadData();
    } catch (error) {
      toast("Thay đổi thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  return (
    <Modal
      title="Thêm mới"
      centered
      visible={isResetPass}
      footer={null}
      width={800}
      onCancel={() => setIsResetPass(false)}
    >
      <Form {...LAYOUT} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input type={"password"} />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="xác nhận mật khẩu mới"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  getFieldValue("newPassword").trim() !==
                  getFieldValue("confirmNewPassword").trim()
                ) {
                  return Promise.reject(new Error(FIELD_SAME));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input type={"password"} />
        </Form.Item>

        <Form.Item {...TAILLAYOUT}>
          <Button htmlType="button" onClick={() => setIsResetPass(false)}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalResetPass;
