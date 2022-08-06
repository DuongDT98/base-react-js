import { Checkbox, DatePicker, Input, Row, Select } from "antd";
import styled from "styled-components";

export const SelectSearch = styled(Select)`
  width: 95%;
  height: 32px;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 12px;
`;

export const RowCusTomize = styled(Row)`
  margin-left: 4px;
`;

export const SelectForm = styled(Select)`
  font-family: sans-serif;
  font-weight: 300;
  font-size: 12px;

  border-radius: 4px !important;
  justify-content: center;
`;

export const InputForm = styled(Input)`
  height: 32px;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 12px;

  border-radius: 4px;
  justify-content: center;
`;

export const DatePickerForm = styled(DatePicker)`
  width: 100%;
  border-radius: 4px !important;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 12px;
`;

export const CheckboxGroupForm = styled(Checkbox.Group)`
  width: 100%;
`;
