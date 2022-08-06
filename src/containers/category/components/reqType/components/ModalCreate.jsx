import { Form, Input, Button, Modal, Select, Tooltip } from "antd";
import { REQUEST_TYPE_GROUP_LIST } from "config/constant";
import { FIELD_DUPLICATE, FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { createData } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, TAILLAYOUT } from "../../../../../helpers/constants";

const ModalCreate = ({
  listData,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let data = {
      name: Formvalues.name.trim(),
      requestTypeGroup: Formvalues.requestTypeGroup.trim(),
      requestTypeCode: Formvalues.requestTypeCode.trim(),
    };
    // call API create

    var result = await createData("/request-type", data);
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
      <Form {...LAYOUT} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="requestTypeCode"
          label="Mã đề nghị"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  listData.find(
                    (item) =>
                      item.requestTypeCode ===
                      getFieldValue("requestTypeCode").trim()
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
          label="Tên đề nghị"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="requestTypeGroup"
          label="Nhóm đề nghị"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn nhóm đề nghị" allowClear showSearch>
            {REQUEST_TYPE_GROUP_LIST?.sort(
              (a, b) =>
                a.label.toLocaleLowerCase() - b.label.toLocaleLowerCase()
            )?.map((item) => (
              <Select.Option value={item.value}>
                <Tooltip title={item.label}>{item.label}</Tooltip>
              </Select.Option>
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
