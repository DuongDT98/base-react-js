import { Button, Descriptions, Empty } from "antd";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getParams } from "service/api/apiRequest.service";
import { optionsError } from "service/api/toast.service";

const SupplyDetail = () => {
  const [data, setData] = useState({});
  const history = useHistory();

  const [idSupply] = useState(
    window.location.pathname.substr(
      window.location.pathname.lastIndexOf("/") + 1
    )
  );

  const getData = useCallback(async () => {
    // Call APi get data

    var result = await getParams(`/bank-account-info/${idSupply}`);
    if (result) {
      setData(result || {});
    } else {
      setData({});
      toast("Có lỗi xảy ra. Vui lòng thử lại sau!!!", optionsError);
    }
  }, [idSupply]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <span className="text-uppercase page-subtitle">Chi tiết</span>
          <h3 className="page-title">Chi tiết ngân hàng của công ty</h3>
        </div>
      </div>
      {data && // 👈 null and undefined check
        Object.keys(data).length !== 0 && (
          <>
            <Descriptions
              bordered
              style={{ marginRight: "16px", marginBottom: "16px" }}
            >
              <Descriptions.Item label="Tên ngân hàng" span={12}>
                {data?.bankInfoDTO?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Tên ngân hàng(ENG)" span={12}>
                {data?.bankInfoDTO?.enName}
              </Descriptions.Item>
              <Descriptions.Item label="Mã ngân hàng" span={12}>
                {data?.bankInfoDTO?.bankCode}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản" span={12}>
                {data?.bankAccountNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Chủ tài khoản" span={12}>
                {data?.bankAccountName}
              </Descriptions.Item>
              <Descriptions.Item label="Chi nhánh thành phố" span={12}>
                {data?.bankBranchCity}
              </Descriptions.Item>
              <Descriptions.Item label="Quốc gia" span={12}>
                {data?.bankInfoDTO?.nation}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      {data && // 👈 null and undefined check
        Object.keys(data).length === 0 &&
        Object.getPrototypeOf(data) === Object.prototype && (
          <>
            {" "}
            <Empty
              style={{ marginTop: "200px" }}
              description="Không tìm thấy dữ liệu"
            />
          </>
        )}
      <div>
        <Button
          htmlType="button"
          onClick={() => history.replace("/category/banks-of-company")}
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};

export default SupplyDetail;
