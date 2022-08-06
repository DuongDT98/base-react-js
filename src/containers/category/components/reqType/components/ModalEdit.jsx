import { Form, Input, Button, Select, Tooltip, Modal } from "antd";
import { REQUEST_TYPE_GROUP_LIST } from "config/constant";
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
    name: dataSelect.name.trim(),
    requestTypeCode: dataSelect?.requestTypeCode.trim(),
    requestTypeGroup: dataSelect?.requestTypeGroup?.trim(),
  };
  const onFinish = async (Formvalues) => {
    let data = {
      name: Formvalues.name.trim(),
      requestTypeCode: Formvalues.requestTypeCode.trim(),
      requestTypeGroup: Formvalues?.requestTypeGroup.trim(),
    };
    console.log(data);
    // call API edit

    var result = await patch(`/request-type/${dataSelect.id}`, data);
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
          name="requestTypeCode"
          label="Mã đề nghị"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            ({ getFieldValue }) => ({
              validator() {
                if (
                  getFieldValue("requestTypeCode").trim() !=
                    dataSelect.requestTypeCode &&
                  listData.find(
                    (item) =>
                      item.requestTypeCode ==
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
