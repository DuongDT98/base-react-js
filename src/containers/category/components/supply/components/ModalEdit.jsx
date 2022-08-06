import { Form, Input, Button, Select, Tooltip, Modal } from "antd";
import { FIELD_DUPLICATE, FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import {
  BanksNation,
  LAYOUT,
  Nation,
  TAILLAYOUT,
} from "../../../../../helpers/constants";
const { Option } = Select;

const ModalEdit = ({
  listData,
  dataSelect,
  isRequestFormEditOpen,
  setAddRequestFormEditOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const intValueForm = {
    taxCode: dataSelect.taxCode.trim(),
    name: dataSelect.name.trim(),
  };

  const onFinish = async (Formvalues) => {
    let data = {
      taxCode: Formvalues.taxCode.trim(),
      name: Formvalues.name.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/supplier/${dataSelect.id}`, data);
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
          name="name"
          label="Tên nhà cung cấp"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taxCode"
          label="Mã số thuế"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
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
