import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  Select,
  Tooltip,
} from "antd";
import { InputForm, RowCusTomize, SelectForm } from "components/share/style";
const { Panel } = Collapse;
export const HoanUng = ({ listSupply }) => {
  return (
    <Collapse defaultActiveKey={["1", "2", "3", "4", "5", "6", "7"]}>
      <Panel header="Số tiền tạm ứng" key="1">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" placeholder="Nhập..." />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
      <Panel header="Nội dung khoản chi được thanh toán theo quy định" key="2">
        <Form.List name="paid-according">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <RowCusTomize gutter={16}>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      name="paid-according-titleContent"
                      label="Nội dung"
                    >
                      <InputForm placeholder="Nhập..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item name="contractNumber" label="Số hóa đơn">
                      <InputForm placeholder="Nhập..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item name="supplyName" label="Nhà cung cấp">
                      <SelectForm
                        placeholder="Chọn..."
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                          return (
                            option?.key
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                      >
                        {listSupply?.map((item) => (
                          <Select.Option value={item.id} key={item.name}>
                            <Tooltip title={item.name}>{item.name}</Tooltip>
                          </Select.Option>
                        ))}
                      </SelectForm>
                    </Form.Item>
                  </Col>
                  <Col xs={24} xl={12}>
                    <Form.Item
                      name="paid-according-moneyRequire"
                      label="Giá trị theo người đề nghị"
                    >
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
      </Panel>
      <Panel header="Tổng số tiền được thanh toán theo quy định" key="3">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" placeholder="Nhập..." disabled />
            </Form.Item>
          </Col>
          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
      <Panel header="Tổng số tiền không được thanh toán theo quy định" key="4">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" placeholder="Nhập..." disabled />
            </Form.Item>
          </Col>
          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
      <Panel header="Số tiền chênh lệch" key="5">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" disabled placeholder="Nhập..." />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
      <Panel header="Số tiền được thanh toán thêm" key="6">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" placeholder="Nhập..." disabled />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
      <Panel header="Số tiền phải trả công ty" key="7">
        <RowCusTomize gutter={16}>
          <Col xs={24} xl={12}>
            <Form.Item name="moneyRequire" label="Giá trị theo người đề nghị">
              <InputForm type="number" placeholder="Nhập..." disabled />
            </Form.Item>
          </Col>

          <Col xs={24} xl={12}>
            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập..." />
            </Form.Item>
          </Col>
        </RowCusTomize>
      </Panel>
    </Collapse>
  );
};
