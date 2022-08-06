import { Col, Form } from "antd";
import { RowCusTomize } from "components/share/style";
import { CheckListFile } from "./checkListFile";

export const ThanhToanFiles = ({}) => {
  return (
    <RowCusTomize gutter={16}>
      <Col span={12}>
        <Form.Item name="contractFile" label="Hợp đồng/Báo giá/Đơn hàng">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="receiptFile" label="Hóa đơn">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="reportFile" label="Biên bản bàn giao">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="guaranteeFile" label="Công văn đề nghị thanh toán">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="warrantyCommitmentFile" label="Cam kết bảo hành">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="warrantyFile" label="Phiếu bảo hành">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="guaranteeFile" label="Bảo lãnh">
          <CheckListFile />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="otherFiles" label="Hồ sơ khác">
          <CheckListFile />
        </Form.Item>
      </Col>
    </RowCusTomize>
  );
};
