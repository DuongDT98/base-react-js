import { Divider } from "antd";
import { HoanUngFiles } from "./HoanUngFile";
import { BaoLanhFiles } from "./BaoLanhFile";
import { ThanhToanFiles } from "./ThanhToanFiles";

export const FileReq = ({ reqGroupSelected }) => {
  return (
    <>
      <Divider orientation="left">Hồ sơ kèm theo</Divider>
      {reqGroupSelected == "HOAN_UNG" && <HoanUngFiles />}
      {reqGroupSelected == "BAO_LANH" && <BaoLanhFiles />}
      {reqGroupSelected == "THANH_TOAN" && <ThanhToanFiles />}
    </>
  );
};
