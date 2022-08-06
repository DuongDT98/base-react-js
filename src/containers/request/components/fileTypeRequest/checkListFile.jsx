import { Checkbox, Col } from "antd";
import { CheckboxGroupForm, RowCusTomize } from "components/share/style";
import { TYPE_FILE } from "config/constant";

export const CheckListFile = ({}) => {
  return (
    <CheckboxGroupForm>
      <RowCusTomize>
        {TYPE_FILE?.map((elm) => (
          <Col span={8}>
            <Checkbox
              value={elm.value}
              style={{
                lineHeight: "32px",
              }}
            >
              {elm.label}
            </Checkbox>
          </Col>
        ))}
      </RowCusTomize>
    </CheckboxGroupForm>
  );
};
