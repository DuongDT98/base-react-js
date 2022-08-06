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
    costTypeCode: dataSelect.costTypeCode,
    name: dataSelect.name,
  };
  const onFinish = async (Formvalues) => {
    let data = {
      costTypeCode: Formvalues.costTypeCode.trim(),
      name: Formvalues.name.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/cost-type/${dataSelect.id}`, data);
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
          name="costTypeCode"
          label="Mã chi phí"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  getFieldValue("costTypeCode").trim() !=
                    dataSelect.costTypeCode &&
                  listData.find(
                    (item) =>
                      item.costTypeCode == getFieldValue("costTypeCode").trim()
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
          label="Tên chi phí"
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
