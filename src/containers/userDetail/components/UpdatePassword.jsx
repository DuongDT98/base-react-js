import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { LAYOUT_FIELD_LONG, TAILLAYOUT } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { patch, patchPassword } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";

export const UpdateCurrentPassword = ({
  isRequestFormEdit,
  setAddRequestFormEdit,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let newPassword = Formvalues.newPassword.trim();
    let reNewPass = Formvalues.reNewPassword.trim();

    if (newPassword !== reNewPass) {
      toast("Mật khẩu mới đang không khớp nhau", optionsError);
      return;
    }

    let data = {
      currentPassword: Formvalues.currentPassword.trim(),
      newPassword: Formvalues.newPassword.trim(),
    };
    // call API create

    var result = await patchPassword("/user/password", data);
    if (result == "Succes") {
      toast("Cập nhập mật khẩu thành công", optionsSuccess);
      setAddRequestFormEdit(false);
      checkLoadData();
    } else {
      toast(
        "Cập nhập mật khẩu thất bại. Vui lòng thử lại sau!!!",
        optionsError
      );
    }
  };
  return (
    <Modal
      title="Cập nhập mật khẩu"
      centered
      visible={isRequestFormEdit}
      footer={null}
      width={800}
      onCancel={() => setAddRequestFormEdit(false)}
    >
      <Form
        {...LAYOUT_FIELD_LONG}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="currentPassword"
          label="Mật khẩu cũ"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            {
              pattern: new RegExp(
                /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
              ),
              message: "Không nhập tiếng Việt",
            },
            {
              min: 6,
              message: "Mật khẩu phải lớn hơn 6 ký tự",
            },
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            {
              pattern: new RegExp(
                /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
              ),
              message: "Không nhập tiếng Việt",
            },
            {
              min: 6,
              message: "Mật khẩu phải lớn hơn 6 ký tự",
            },
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          label="Nhập lại mật khẩu mới"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            {
              pattern: new RegExp(
                /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
              ),
              message: "Không nhập tiếng Việt",
            },
            {
              min: 6,
              message: "Mật khẩu phải lớn hơn 6 ký tự",
            },
          ]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item {...TAILLAYOUT}>
          <Button
            htmlType="button"
            onClick={() => setAddRequestFormEdit(false)}
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
