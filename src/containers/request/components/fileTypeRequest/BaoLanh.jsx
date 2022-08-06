import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input } from "antd";
import {
  DatePickerForm,
  InputForm,
  RowCusTomize,
} from "components/share/style";

export const BaoLanh = ({}) => {
  return (
    <Form.List name="paid-according">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <RowCusTomize gutter={16}>
              <Col xs={24} xl={12}>
                <Form.Item name="paid-according-titleContent" label="Nội dung">
                  <InputForm placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="date" label="Ngày cần bảo lãnh">
                  <DatePickerForm placeholder="Chọn ngày..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="insuranceDay" label="Thời hạn bảo lãnh">
                  <InputForm placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="cost-contract" label="Giá trị HĐ/GTQT">
                  <InputForm type="number" placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="percent" label="Tỷ lệ %">
                  <InputForm type="number" placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="value-contract" label="Giá trị bảo lãnh">
                  <InputForm type="number" placeholder="Nhập..." />
                </Form.Item>
              </Col>

              <Col xs={24} xl={12}>
                <Form.Item name="paid-according-note" label="Ghi chú">
                  <Input.TextArea placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Button danger onClick={() => remove(name)} block>
                Xóa
              </Button>

              <Divider />
            </RowCusTomize>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Thêm
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
