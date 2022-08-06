import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import {
  LAYOUT,
  LAYOUT_FIELD_LONG,
  LIST_CITY_IN_VN,
  TAILLAYOUT,
} from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createData, getParams } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";

const { Option } = Select;

const BankUserCreate = ({
  user,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
}) => {
  const [form] = Form.useForm();
  const [dataBank, setDataBank] = useState([]);

  const onFinish = async (Formvalues) => {
    let params = {
      userEmail: user.email,
      bankAccountNumber: Formvalues.bankAccountNumber.trim(),
      bankBranchCity: Formvalues.bankBranchCity.trim(),
      bankInfoCode: Formvalues.bankInfoCode.trim(),
    };
    // call API create
    // console.log(params);
    // setAddRequestFormCreateOpen(false);
    // checkLoadData();
    var result = await createData("/bank-account-info", params);
    if (result) {
      toast("Thêm thành công", optionsSuccess);
      setAddRequestFormCreateOpen(false);
      checkLoadData();
    } else {
      toast("Thêm thất bại. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getData = async () => {
    // Call APi get data

    var result = await getParams("/bank-info");
    if (result) {
      setDataBank(result || []);
    } else {
      setDataBank([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };
  useEffect(() => {
    getData();
  }, []);

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
          name="bankAccountNumber"
          label="Số tài khoản"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="bankBranchCity" label="Chi nhánh thành phố">
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
export default BankUserCreate;