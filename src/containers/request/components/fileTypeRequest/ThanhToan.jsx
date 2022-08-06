import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input } from "antd";
import {
  DatePickerForm,
  InputForm,
  RowCusTomize,
} from "components/share/style";

export const ThanhToan = ({}) => {
  return (
    <Form.List name="paid-according">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <RowCusTomize gutter={16}>
              <Col xs={24} xl={12}>
                <Form.Item name="paid-according-titleContent" label="Nội dung">
                  <InputForm placeholder="Nhập..." />
                </Form.Item>
              </Col>
              <Col xs={24} xl={12}>
                <Form.Item name="contractValue" label="Giá trị hóa đơn">
                  <InputForm type="number" placeholder="Nhập..." />
                </Form.Item>
              </Col>

              <Col xs={24} xl={12}>
                <Form.Item name="contractValueDiscount" label="Giảm trừ đã TT">
                  <InputForm type="number" placeholder="Nhập..." />
                </Form.Item>
              </Col>

              <Col xs={24} xl={12}>
                <Form.Item name="moneyPaid" label="Số tiền phải thanh toán">
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
