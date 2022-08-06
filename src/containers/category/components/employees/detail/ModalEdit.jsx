import { Form, Input, Button, Modal } from "antd";
import { FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import { LAYOUT, TAILLAYOUT } from "../../../../../helpers/constants";

const ModalEdit = ({
  dataSelect,
  isRequestFormEditOpen,
  setAddRequestFormEditOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();

  const intValueForm = {
    bankAccountName: dataSelect?.bankAccountName.trim(),
    bankCode: dataSelect?.bankInfoDTO?.bankCode.trim(),
    bankAccountInfoDTO: dataSelect.bankInfoDTO?.name?.trim(),
    bankAccountNumber: dataSelect.bankAccountNumber.trim(),
  };

  const onFinish = async (Formvalues) => {
    let data = {
      bankAccountName: Formvalues.bankAccountName.trim(),
      bankInfoCode: Formvalues.bankCode.trim(),
      bankBranchCity: Formvalues.bankAccountInfoDTO.trim(),
      bankAccountNumber: Formvalues.bankAccountNumber.trim(),
    };
    // call API edit

    var result = await patch(`/bank-account-info/${dataSelect?.id}`, data);
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
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bankAccountInfoDTO"
          label="Tên ngân hàng"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bankAccountName"
          label="Chủ tài khoản"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bankAccountNumber"
          label="Số tài khoản"
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
