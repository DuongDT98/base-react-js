import { Col, Form } from "antd";
import { RowCusTomize } from "components/share/style";
import { CheckListFile } from "./checkListFile";

export const BaoLanhFiles = ({}) => {
  return (
    <RowCusTomize gutter={16}>
      <Col span={12}>
        <Form.Item name="contractFile" label="Hợp đồng/Báo giá/Đơn hàng">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="writtenRequests" label="Công văn đề nghị">
          <CheckListFile />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="reportFile" label="Thông báo giao hàng">
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
