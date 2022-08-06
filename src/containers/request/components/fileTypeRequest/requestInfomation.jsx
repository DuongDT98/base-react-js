import { Divider } from "antd";
import { HoanUng } from "./HoanUng";
import { BaoLanh } from "./BaoLanh";
import { ThanhToan } from "./ThanhToan";

export const RequestInformation = ({ reqGroupSelected, listSupply }) => {
  return (
    <>
      <Divider orientation="left">Chi tiết đề nghị </Divider>
      {reqGroupSelected == "HOAN_UNG" && <HoanUng listSupply={listSupply} />}
      {reqGroupSelected == "BAO_LANH" && <BaoLanh />}
      {reqGroupSelected == "THANH_TOAN" && <ThanhToan />}
    </>
  );
};
