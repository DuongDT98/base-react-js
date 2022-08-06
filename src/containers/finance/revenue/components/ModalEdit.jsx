import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { FIELD_DUPLICATE, FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, Nation, TAILLAYOUT } from "../../../../helpers/constants";
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
    bankCode: dataSelect.bankCode,
    enName: dataSelect.enName,
    name: dataSelect.name,
    nation: dataSelect.nation,
  };

  const onFinish = async (Formvalues) => {
    let data = {
      enName: Formvalues.enName.trim(),
      name: Formvalues.name.trim(),
      nation: Formvalues.nation.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/bank-info/${Formvalues.bankCode}`, data);
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
          name="bankCode"
          label="Tên viết tắt"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  getFieldValue("bankCode").trim() != dataSelect.bankCode &&
                  listData.find(
                    (item) => item.bankCode == getFieldValue("bankCode").trim()
                  )
                ) {
                  return Promise.reject(new Error(FIELD_DUPLICATE));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên ngân hàng"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="enName"
          label="Tên Tiếng Anh"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nation"
          label="Quốc gia"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn quốc gia" allowClear showSearch>
            {Nation?.sort(
              (a, b) => a.name.toLocaleLowerCase() - b.name.toLocaleLowerCase()
            )?.map((item) => (
              <Option value={item.name}>
                <Tooltip title={item.name}>{item.name}</Tooltip>
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
