import {
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Tag,
  Tooltip,
} from "antd";
import {
  CheckboxGroupForm,
  DatePickerForm,
  InputForm,
  RowCusTomize,
  SelectForm,
} from "components/share/style";
import {
  COST_PAYING_ARR,
  CURRENCY,
  NAME_RECIEVER_ARR,
  PAYMENT_TYPE,
  REQUEST_TYPE_GROUP_LIST,
  TYPE_FILE,
} from "config/constant";
import { fakeUsers } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";
import { FileReq } from "./fileTypeRequest/FileReq";
import { RequestInformation } from "./fileTypeRequest/requestInfomation";

const { TextArea } = Input;

const AddRequest = () => {
  const [request, setRequest] = useState({});
  const history = useHistory();
  const [costPayingValue, setCostPayingValue] = useState("PHONG_BAN");
  const [listDepartment, setListDepartment] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [listCostType, setListCostType] = useState([]);
  const [listSupply, setListSupply] = useState([]);
  const [listEmployee, setlistEmployee] = useState([]);
  const [listContactNumber, setListContactNumber] = useState([]);
  const [listBankOfSupply, setListBankOfSupply] = useState([]);
  const [listContract, setListContract] = useState([]);
  const [nameReceiverValue, setNameReceiverValue] = useState("NHA_CUNG_CAP");
  const [supplierSelected, setSupplySellected] = useState("");
  const [bankSupplierSelected, setBankSupplySellected] = useState("");
  const [employeeSelected, setEmployeeSelected] = useState("");
  const [reqGroupSelected, setReqGroupSelected] = useState("HOAN_UNG");
  const [reqList, setReqList] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  //Get data
  const getDataDepartment = async () => {
    // Call APi get data
    var result = await getParams("/department");
    if (result) {
      setListDepartment(result || []);
    } else {
      setListDepartment([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataProject = async () => {
    // Call APi get data
    var result = await getParams("/project");
    if (result) {
      setListProject(result || []);
    } else {
      setListProject([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataCostType = async () => {
    // Call APi get data
    var result = await getParams("/cost-type");
    if (result) {
      setListCostType(result || []);
    } else {
      setListCostType([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };
  const getDataSupply = async () => {
    // Call APi get data

    var result = await getParams("/supplier");
    if (result) {
      setListSupply(result || []);
    } else {
      setListSupply([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataEmployee = async () => {
    // Call APi get data

    var result = await getParams("/user");
    if (result) {
      setlistEmployee(result?.data || []);
    } else {
      setlistEmployee([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataContactNumber = async () => {
    // Call APi get data
    var result = await getParams("/contract");
    if (result) {
      setListContactNumber(result?.data || []);
    } else {
      setListContactNumber([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataReq = async () => {
    // Call APi get data
    var result = await getParams("/request-type");
    if (result) {
      setReqList(result || []);
    } else {
      setReqList([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getListContract = async () => {
    // Call APi get data
    var result = await getParams("/contract");
    if (result) {
      setListContract(result?.data || []);
    } else {
      setListContract([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  useEffect(() => {
    getDataDepartment();
    getDataProject();
    getDataCostType();
    getDataSupply();
    getDataEmployee();
    getDataContactNumber();
    getDataReq();
    getListContract();
  }, []);

  //get detail bank

  const getDataSupplyBankDetail = async (id) => {
    // Call APi get data

    var result = await getParams(`/supplier/${id}`);
    if (result) {
      setListBankOfSupply(result?.bankAccountInfoDTOS || []);
      console.log(result?.bankAccountInfoDTOS);
    } else {
      setListBankOfSupply([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const getDataEmployeeDetail = async (id) => {
    // Call APi get data
    if (!id) return;
    var result = await getParams(`/user/${id}`);
    if (result) {
      if (result?.bankAccountInfoDTO) {
        document.getElementById("bankAccountNumber").value =
          result?.bankAccountInfoDTO?.bankAccountNumber;
        document.getElementById("bankCode").value =
          result?.bankAccountInfoDTO?.bankInfoDTO?.bankCode;
        document.getElementById("bankName").value =
          result?.bankAccountInfoDTO?.bankInfoDTO?.name;
        document.getElementById("bankAccountName").value =
          result?.bankAccountInfoDTO?.bankAccountName;
        document.getElementById("bankBranchCity").value =
          result?.bankAccountInfoDTO?.bankBranchCity;
      } else {
        toast(
          "Nhân viên chưa có thông tin tài khoản ngân hàng! Đề nghị thêm tài khoản cho nhân viên này!",
          optionsError
        );
      }
    } else {
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  };

  const setFormBankInfoNull = () => {
    document.getElementById("bankAccountNumber").value = "";
    document.getElementById("bankCode").value = "";
    document.getElementById("bankName").value = "";
    document.getElementById("bankAccountName").value = "";
    document.getElementById("bankBranchCity").value = "";
  };

  useEffect(() => {
    if (nameReceiverValue == undefined) {
      form.setFieldsValue("supplyName", "");
      setFormBankInfoNull();
    } else if (nameReceiverValue == "NHA_CUNG_CAP") {
      if (supplierSelected !== undefined) {
        getDataSupplyBankDetail(supplierSelected);
      } else {
        setFormBankInfoNull();
      }
    } else if (nameReceiverValue == "NHAN_VIEN") {
      if (employeeSelected !== undefined) {
        getDataEmployeeDetail(employeeSelected);
      } else {
        setFormBankInfoNull();
      }
    }
  }, [nameReceiverValue, employeeSelected, supplierSelected]);

  useEffect(() => {
    if (bankSupplierSelected != undefined) {
      let bankSellected = listBankOfSupply.find(
        (elm) => elm.id == bankSupplierSelected
      );
      console.log(bankSellected);
      document.getElementById("bankAccountNumber").value =
        bankSellected?.bankAccountNumber;
      document.getElementById("bankCode").value =
        bankSellected?.bankInfoDTO?.bankCode;
      document.getElementById("bankName").value =
        bankSellected?.bankInfoDTO?.name;
      document.getElementById("bankAccountName").value =
        bankSellected?.bankAccountName;
      document.getElementById("bankBranchCity").value =
        bankSellected?.bankBranchCity;
    } else {
      setFormBankInfoNull();
    }
  }, [bankSupplierSelected]);

  const handleAddRequest = () => {
    toast.success("Thêm đề nghị thành công!");
    history.push("/request/detail/1");
  };

  const onFinishForm = () => {};

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <h3 className="page-title">Thêm đề nghị</h3>
        </div>
      </div>
      <Form form={form} layout={"vertical"}>
        <div className="row">
          <div className="mb4 col-lg-8">
            <div className="mb-4 card card-small">
              <div className="border-bottom card-header">
                <h6 className="m-0">Thông tin đề nghị</h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="p-3 list-group-item">
                  <div className="row">
                    <div className="col">
                      <Divider orientation="left">
                        Thông tin bên chịu chi phí
                      </Divider>
                      <RowCusTomize gutter={16}>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="costPaying"
                            label="Bên chịu chi phí"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              defaultValue={costPayingValue}
                              onChange={(e) => setCostPayingValue(e)}
                              filterOption={(input, option) => {
                                return (
                                  option?.key
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0 ||
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                            >
                              {COST_PAYING_ARR?.map((item) => (
                                <Select.Option
                                  value={item.value}
                                  title={item.label}
                                  key={item.label}
                                >
                                  <Tooltip title={item.label}>
                                    {item.label}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        {costPayingValue == "PHONG_BAN" && (
                          <Col xs={24} xl={12}>
                            <Form.Item
                              name="nameCostPaying"
                              label="Phòng ban"
                              rules={[
                                { required: true, message: FIELD_REQUIRED },
                              ]}
                            >
                              <SelectForm
                                placeholder="Chọn..."
                                allowClear
                                showSearch
                                filterOption={(input, option) => {
                                  return (
                                    option?.key
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0 ||
                                    option?.title
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                              >
                                {listDepartment?.map((item) => (
                                  <Select.Option
                                    value={item.id}
                                    title={item.name}
                                    key={item.name}
                                  >
                                    <Tooltip title={item.name}>
                                      {item.name}
                                    </Tooltip>
                                  </Select.Option>
                                ))}
                              </SelectForm>
                            </Form.Item>
                          </Col>
                        )}
                        {costPayingValue == "DU_AN" && (
                          <Col xs={24} xl={12}>
                            <Form.Item
                              name="nameCostPaying"
                              label="Dự án"
                              rules={[
                                { required: true, message: FIELD_REQUIRED },
                              ]}
                            >
                              <SelectForm
                                placeholder="Chọn..."
                                allowClear
                                showSearch
                                filterOption={(input, option) => {
                                  return (
                                    option?.title
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                              >
                                {listProject?.map((item) => (
                                  <Select.Option
                                    value={item.id}
                                    title={item.name}
                                  >
                                    <Tooltip title={item.name}>
                                      {item.name}
                                    </Tooltip>
                                  </Select.Option>
                                ))}
                              </SelectForm>
                            </Form.Item>
                          </Col>
                        )}

                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="nameCostType"
                            label="Loại chi phí"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              filterOption={(input, option) => {
                                return (
                                  option?.key
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0 ||
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                            >
                              {listCostType?.map((item) => (
                                <Select.Option
                                  value={item.id}
                                  title={item.costTypeCode}
                                  key={item.name}
                                >
                                  <Tooltip title={item.name}>
                                    {item.costTypeCode} | {item.name}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                      </RowCusTomize>
                      <Divider orientation="left">
                        Thông tin bên nhận chi phí
                      </Divider>
                      <RowCusTomize gutter={16}>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="receiver"
                            label="Bên nhận tiền"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              defaultValue={nameReceiverValue}
                              filterOption={(input, option) => {
                                return (
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                              onChange={(e) => setNameReceiverValue(e)}
                            >
                              {NAME_RECIEVER_ARR?.map((item) => (
                                <Select.Option
                                  value={item.value}
                                  title={item.label}
                                >
                                  <Tooltip title={item.label}>
                                    {item.label}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        {nameReceiverValue == "NHA_CUNG_CAP" && (
                          <Col xs={24} xl={12}>
                            <Form.Item
                              name="supplyName"
                              label="Nhà cung cấp"
                              rules={[
                                { required: true, message: FIELD_REQUIRED },
                              ]}
                            >
                              <SelectForm
                                placeholder="Chọn..."
                                allowClear
                                showSearch
                                filterOption={(input, option) => {
                                  return (
                                    option?.title
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                                onChange={(e) => setSupplySellected(e)}
                              >
                                {listSupply?.map((item) => (
                                  <Select.Option
                                    value={item.id}
                                    title={item.name}
                                  >
                                    <Tooltip title={item.name}>
                                      {item.name}
                                    </Tooltip>
                                  </Select.Option>
                                ))}
                              </SelectForm>
                            </Form.Item>
                          </Col>
                        )}
                        {nameReceiverValue == "NHAN_VIEN" && (
                          <Col xs={24} xl={12}>
                            <Form.Item
                              name="employee"
                              label="Nhân viên"
                              rules={[
                                { required: true, message: FIELD_REQUIRED },
                              ]}
                            >
                              <SelectForm
                                placeholder="Chọn..."
                                allowClear
                                showSearch
                                filterOption={(input, option) => {
                                  return (
                                    option?.title
                                      .toLowerCase()
                                      .indexOf(input.toLowerCase()) >= 0
                                  );
                                }}
                                onChange={(e) => setEmployeeSelected(e)}
                              >
                                {listEmployee?.map((item) => (
                                  <Select.Option
                                    value={item.employeeCode}
                                    title={item.fullName}
                                  >
                                    <Tooltip title={item.fullName}>
                                      {item?.employeeCode} | {item.fullName} |{" "}
                                      {item?.departmentDTO?.name}
                                    </Tooltip>
                                  </Select.Option>
                                ))}
                              </SelectForm>
                            </Form.Item>
                          </Col>
                        )}
                        {supplierSelected &&
                          nameReceiverValue == "NHA_CUNG_CAP" && (
                            <Col xs={24} xl={12}>
                              <Form.Item
                                name="bankInfo"
                                label="Thông tin ngân hàng nhận"
                                rules={[
                                  { required: true, message: FIELD_REQUIRED },
                                ]}
                              >
                                <SelectForm
                                  placeholder="Chọn..."
                                  allowClear
                                  showSearch
                                  filterOption={(input, option) => {
                                    return (
                                      option?.title
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                    );
                                  }}
                                  onChange={(e) => setBankSupplySellected(e)}
                                >
                                  {listBankOfSupply?.map((item) => (
                                    <Select.Option
                                      value={item.id}
                                      title={item.bankAccountName}
                                    >
                                      <Tooltip title={item.bankAccountName}>
                                        {item.bankAccountName} |{" "}
                                        {item.bankAccountNumber} |{" "}
                                        {item.bankInfoDTO.name}
                                      </Tooltip>
                                    </Select.Option>
                                  ))}
                                </SelectForm>
                              </Form.Item>
                            </Col>
                          )}
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="bankAccountName"
                            label="Chủ tài khoản"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm id="bankAccountName" disabled />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="bankCode"
                            label="Mã ngân hàng"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm id="bankCode" disabled />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="bankName"
                            label="Tên ngân hàng"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm id="bankName" disabled />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="bankAccountNumber"
                            label="Số tài khoản"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm id="bankAccountNumber" disabled />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="bankBranchCity"
                            label="Chi nhánh thành phố"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm id="bankBranchCity" disabled />
                          </Form.Item>
                        </Col>
                      </RowCusTomize>
                      <Divider orientation="left">Thông tin hợp đồng</Divider>
                      <RowCusTomize gutter={16}>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="typePayment"
                            label="Hình thức chuyển khoản"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              filterOption={(input, option) => {
                                return (
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                            >
                              {PAYMENT_TYPE.map((item) => (
                                <Select.Option
                                  value={item.value}
                                  title={item.label}
                                >
                                  <Tooltip title={item.label}>
                                    {item.label}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="datePayments"
                            label="Ngày yêu cầu thanh toán"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <DatePickerForm placeholder="Chọn ngày thanh toán" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="money"
                            label=" Số tiền yêu cầu thanh toán"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <InputForm placeholder="Nhập..." />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="currency"
                            label="Loại tiền tệ"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              filterOption={(input, option) => {
                                return (
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                            >
                              {CURRENCY.map((item) => (
                                <Select.Option
                                  value={item.value}
                                  title={item.label}
                                >
                                  <Tooltip title={item.label}>
                                    {item.label}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>

                        <Col xs={24} xl={24}>
                          <Form.Item
                            label="Diễn giải nội dung thanh toán"
                            name="explain"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <TextArea style={{ width: "100%" }} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item name="contactNumber" label="Số hợp đồng">
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              filterOption={(input, option) => {
                                return (
                                  option?.key
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0 ||
                                  option?.title
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                );
                              }}
                            >
                              {listContactNumber?.map((item) => (
                                <Select.Option
                                  value={item.id}
                                  title={item.contractNumber}
                                  key={item.supplierDTO.name}
                                >
                                  <Tooltip
                                    title={
                                      item.contractNumber +
                                      "|" +
                                      item.supplierDTO.name
                                    }
                                  >
                                    {item.contractNumber} |{" "}
                                    {item.supplierDTO.name}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item name="receipt" label="Đơn báo giá">
                            <InputForm placeholder="Nhập..." />
                          </Form.Item>
                        </Col>
                      </RowCusTomize>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb4 col-lg-4">
            <div className="mb-4 card card-small">
              <div className="border-bottom card-header">
                <h6 className="m-0">Người duyệt đề nghị</h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="p-3 list-group-item">
                  <div className="row">
                    <div className="col">
                      <RowCusTomize gutter={16}>
                        <Col xs={24} xl={24}>
                          <Form.Item
                            name="a"
                            label="Trưởng bộ phận/dự án"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                            ></SelectForm>
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={24}>
                          <Form.Item
                            name="b"
                            label="Kế toán"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                            ></SelectForm>
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={24}>
                          <Form.Item
                            name="c"
                            label="Lãnh đạo có thẩm quyền"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                            ></SelectForm>
                          </Form.Item>
                        </Col>
                      </RowCusTomize>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb4 col-lg-8">
            <div className="mb-4 card card-small">
              <div className="border-bottom card-header">
                <h6 className="m-0">Loại đề nghị</h6>
              </div>
              <ul className="list-group list-group-flush">
                <li className="p-3 list-group-item">
                  <div className="row">
                    <div className="col">
                      <RowCusTomize gutter={16}>
                        <Divider orientation="left">Thông tin đề nghị</Divider>

                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="reqGroup"
                            label="Nhóm đề nghị"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                              onChange={(e) => setReqGroupSelected(e)}
                              defaultValue={reqGroupSelected}
                            >
                              {REQUEST_TYPE_GROUP_LIST?.map((item) => (
                                <Select.Option value={item.value}>
                                  <Tooltip title={item.label}>
                                    {item.label}
                                  </Tooltip>
                                </Select.Option>
                              ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        <Col xs={24} xl={12}>
                          <Form.Item
                            name="nameReq"
                            label="Tên đề nghị"
                            rules={[
                              { required: true, message: FIELD_REQUIRED },
                            ]}
                          >
                            <SelectForm
                              placeholder="Chọn..."
                              allowClear
                              showSearch
                            >
                              {reqList
                                ?.filter(
                                  (item) =>
                                    item?.requestTypeGroup == reqGroupSelected
                                )
                                ?.map((item) => (
                                  <Select.Option value={item.id}>
                                    <Tooltip title={item.name}>
                                      {item.name}
                                    </Tooltip>
                                  </Select.Option>
                                ))}
                            </SelectForm>
                          </Form.Item>
                        </Col>
                        {reqGroupSelected == "THANH_TOAN" && (
                          <Col xs={24} xl={12}>
                            <Form.Item
                              name="dateReq"
                              label="Ngày nhận HS từ NCC"
                              rules={[
                                { required: true, message: FIELD_REQUIRED },
                              ]}
                            >
                              {" "}
                              <DatePickerForm placeholder="Chọn ngày..." />
                            </Form.Item>
                          </Col>
                        )}
                      </RowCusTomize>
                      <RequestInformation
                        reqGroupSelected={reqGroupSelected}
                        listSupply={listSupply}
                      />
                      <FileReq reqGroupSelected={reqGroupSelected} />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mb4 col-lg-4">
              <div className="mb-4 card card-small"></div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            marginLeft: "15px",
            fontSize: "15px",
            marginBottom: "50px",
          }}
          // onClick={form.submit()}
        >
          Thêm Đề Nghị
        </button>
      </Form>
    </div>
  );
};

export default AddRequest;
