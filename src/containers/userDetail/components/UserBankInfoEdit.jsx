import { Col, Form, Input, Row, Select, Tooltip, Typography } from "antd";
import { LIST_CITY_IN_VN } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";

const { Title } = Typography;

const UserBankInfoEdit = ({ user, form }) => {
  const [listBank, setListBank] = useState([]);

  const getDataBank = async () => {
    // Call APi get data

    var result = await getParams("/bank-info");
    if (result) {
      console.log(result);
      setListBank(result || []);
    } else {
      setListBank([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  useEffect(() => {
    getDataBank();
  }, []);
  const initValue = {
    bankAccountName: user?.bankAccountInfoDTO?.bankAccountName,
    bankCode: user?.bankAccountInfoDTO?.bankInfoDTO?.bankCode,
    bankBranchCity: user?.bankAccountInfoDTO?.bankBranchCity,
    bankAccountNumber: user?.bankAccountInfoDTO?.bankAccountNumber,
    bankInfoDTOName: user?.bankAccountInfoDTO?.bankInfoDTO?.name,
    bankInfoDTOEnName: user?.bankAccountInfoDTO?.bankInfoDTO?.enName,
    bankInfoNation: user?.bankAccountInfoDTO?.bankInfoDTO?.nation,
  };

  const handleChangeBankCode = (value) => {
    form.setFieldsValue(
      "bankInfoDTOName",
      listBank?.find((item) => item.bankCode == value)?.name
    );
  };

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item p-3">
        <Form form={form} initialValues={initValue}>
          <Row gutter={24}>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Chủ tài khoản
              </label>
              <Form.Item
                name="bankAccountName"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Mã ngân hàng
              </label>
              <Form.Item
                name="bankCode"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Select
                  style={{ width: "80%" }}
                  onChange={handleChangeBankCode}
                >
                  {listBank?.map((item) => (
                    <Select.Option value={item?.bankCode} key={item.bankCode}>
                      {item?.bankCode}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Ngân hàng
              </label>
              <Form.Item
                name="bankInfoDTOName"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Số tài khoản
              </label>
              <Form.Item
                name="bankAccountNumber"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Tên tiếng Anh
              </label>
              <Form.Item
                name="bankInfoDTOEnName"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Chi nhánh thành phố
              </label>
              <Form.Item
                name="bankBranchCity"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Select
                  placeholder="Chọn tỉnh thành"
                  allowClear
                  showSearch
                  style={{ width: "80%" }}
                >
                  {LIST_CITY_IN_VN?.sort(
                    (a, b) =>
                      a.name.toLocaleLowerCase() - b.name.toLocaleLowerCase()
                  )?.map((item) => (
                    <Select.Option value={item.name}>
                      <Tooltip title={item.name}>{item.name}</Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <label for="feInputCity" style={{ fontWeight: 600 }}>
                Quốc gia
              </label>
              <Form.Item
                name="bankInfoNation"
                rules={[
                  {
                    required: true,
                    message: FIELD_REQUIRED,
                  },
                ]}
              >
                <Input style={{ width: "80%" }} disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </li>
    </ul>
  );
};

export default UserBankInfoEdit;
