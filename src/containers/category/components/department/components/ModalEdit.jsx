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
    name: dataSelect.name,
  };
  const onFinish = async (Formvalues) => {
    let data = {
      name: Formvalues.name.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/department/${dataSelect.id}`, data);
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
          label="Tên phòng ban"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  getFieldValue("name").trim() != dataSelect.name &&
                  listData.find(
                    (item) => item.name == getFieldValue("name").trim()
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
