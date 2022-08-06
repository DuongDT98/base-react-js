import { Form, Input, Button, Modal, Select, Tooltip } from "antd";
import { FIELD_REQUIRED } from "helpers/message";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams, patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import {
  LAYOUT,
  LAYOUT_FIELD_LONG,
  LIST_CITY_IN_VN,
  TAILLAYOUT,
} from "../../../../../helpers/constants";
const { Option } = Select;

const ModalEdit = ({
  dataSelect,
  isRequestFormEditOpen,
  setAddRequestFormEditOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();
  const [dataBank, setDataBank] = useState([]);

  const getDataBank = useCallback(async () => {
    // Call APi get data

    var result = await getParams("/bank-info");
    if (result) {
      setDataBank(result || []);
    } else {
      setDataBank([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, []);

  useEffect(() => {
    getDataBank();
  }, [getDataBank]);

  const intValueForm = {
    bankAccountName: dataSelect.bankAccountName.trim(),
    bankAccountNumber: dataSelect?.bankAccountNumber.trim(),
    bankBranchCity: dataSelect?.bankBranchCity.trim(),
    bankInfoCode: dataSelect?.bankInfoDTO?.bankCode.trim(),
  };

  const onFinish = async (Formvalues) => {
    let data = {
      bankAccountName: Formvalues?.bankAccountName.trim(),
      bankAccountNumber: Formvalues?.bankAccountNumber.trim(),
      bankInfoCode: Formvalues?.bankInfoCode.trim(),
      bankBranchCity: Formvalues?.bankBranchCity.trim(),
    };
    // call API edit

    var result = await patch(`/bank-account-info/${dataSelect.id}`, data);
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
        {...LAYOUT_FIELD_LONG}
        form={form}
        initialValues={intValueForm}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="bankInfoCode"
          label="Mã ngân hàng"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn mã ngân hàng" allowClear showSearch>
            {dataBank
              ?.sort(
                (a, b) =>
                  a.bankCode.toLocaleLowerCase() -
                  b.bankCode.toLocaleLowerCase()
              )
              ?.map((item) => (
                <Option value={item.bankCode}>
                  <Tooltip title={item.name}>{item.bankCode}</Tooltip>
                </Option>
              ))}
          </Select>
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

        <Form.Item
          name="bankBranchCity"
          label="Chi nhánh thành phố"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn tỉnh thành" allowClear showSearch>
            {LIST_CITY_IN_VN?.sort(
              (a, b) => a.name.toLocaleLowerCase() - b.name.toLocaleLowerCase()
            )?.map((item) => (
              <Select.Option value={item.name}>
                <Tooltip title={item.name}>{item.name}</Tooltip>
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
