import { Form, Input, Button, Modal, Select, Tooltip } from "antd";
import { MONEY_TYPE } from "config/constant";
import { LAYOUT, TAILLAYOUT } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { formatDate } from "hook/useFormatDate";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getParams, patch } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";
import DatePicker from "react-datepicker";
const { Option } = Select;

const ModalEdit = ({
  listData,
  dataSelect,
  isRequestFormEditOpen,
  setAddRequestFormEditOpen,
  checkLoadData,
  getData,
}) => {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [dataProject, setDataProject] = useState();
  const [dataSupplyer, setDataSupplyer] = useState();

  const getDataProject = useCallback(async () => {
    // Call APi get data

    var result = await getParams("/project");
    if (result) {
      setDataProject(result || []);
    } else {
      setDataProject([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, []);

  const getDataSupplyer = useCallback(async () => {
    // Call APi get data

    var result = await getParams("/supplier");
    if (result) {
      setDataSupplyer(result || []);
    } else {
      setDataSupplyer([]);
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, []);

  useEffect(() => {
    getDataProject();
    getDataSupplyer();
  }, [getDataProject, getDataSupplyer]);

  useEffect(() => {
    const date = new Date(dataSelect?.signedDate);
    setStartDate(date);
  }, [dataSelect?.signedDate]);

  const intValueForm = {
    contractNumber: dataSelect.contractNumber.trim(),
    projectId: dataSelect?.projectId,
    supplierId: dataSelect?.supplierId,
    costValue: dataSelect?.costValue,
    currencyTypeEnum: dataSelect?.currencyTypeEnum.trim(),
    explainPaymentTerm: dataSelect?.explainPaymentTerm.trim(),
  };
  const onFinish = async (Formvalues) => {
    let data = {
      contractNumber: Formvalues.contractNumber.trim(),
      signedDate: formatDate(startDate),
      projectId: Formvalues?.projectId,
      supplierId: Formvalues?.supplierId,
      costValue: Number(Formvalues?.costValue),
      currencyTypeEnum: Formvalues?.currencyTypeEnum.trim(),
      explainPaymentTerm: Formvalues?.explainPaymentTerm.trim(),
    };

    // call API edit

    var result = await patch(`/contract/${dataSelect?.id}`, data);
    if (result) {
      toast("Sửa thành công", optionsSuccess);
      setAddRequestFormEditOpen(false);
      checkLoadData();
      getData();
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
          name="contractNumber"
          label="Số hợp đồng"
          rules={[
            { required: true, message: FIELD_REQUIRED },
            // ({ getFieldValue }) => ({
            //   validator() {
            //     if (
            //       listData.find(
            //         (item) =>
            //           item.contractNumber ===
            //           getFieldValue("contractNumber").trim()
            //       )
            //     ) {
            //       return Promise.reject(new Error(FIELD_DUPLICATE));
            //     }
            //     return Promise.resolve();
            //   },
            // }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày ký hợp đồng"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Form.Item>
        <Form.Item
          name="projectId"
          label="Dự án"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn dự án" allowClear showSearch>
            {dataProject?.map((item) => (
              <Option value={item?.id}>
                <Tooltip title={item.name}>{item.name}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="supplierId"
          label="Tên nhà cung cấp"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn nhà cung cấp" allowClear showSearch>
            {dataSupplyer?.map((item) => (
              <Option value={item?.id}>
                <Tooltip title={item.name}>{item.name}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="costValue"
          label="Giá trị"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input type={"number"} />
        </Form.Item>
        <Form.Item
          name="currencyTypeEnum"
          label="Đơn vị tiền tệ"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Select placeholder="Chọn đơn vị tiền tệ" allowClear showSearch>
            {MONEY_TYPE?.map((item) => (
              <Option value={item.value}>
                <Tooltip title={item.value}>{item.label}</Tooltip>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="explainPaymentTerm"
          label="Diễn giải thanh toán"
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
