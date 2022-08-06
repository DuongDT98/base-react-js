import { Form, Input, Button, Modal } from "antd";
import { LAYOUT, LAYOUT_FIELD_LONG, TAILLAYOUT } from "helpers/constants";
import { FIELD_DUPLICATE, FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { createData } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";

const ModalCreate = ({
  listData,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let data = {
      financeResourceCode: Formvalues.financeResourceCode.trim(),
      name: Formvalues.name.trim(),
    };
    // call API create

    var result = await createData("/finance-resource", data);
    if (result) {
      toast("Thêm thành công", optionsSuccess);

      setAddRequestFormCreateOpen(false);
      checkLoadData();
    } else {
      toast("Thêm thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
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
      <Form
        {...LAYOUT_FIELD_LONG}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="financeResourceCode"
          label="Mã nguồn tài chính"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  listData.find(
                    (item) =>
                      item.bankCode ==
                      getFieldValue("financeResourceCode").trim()
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
          name="name"
          label="Tên nguồn tài chính"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
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
