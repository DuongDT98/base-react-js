import { DatePicker, Select } from "components/index.js";
import { moneyTypes, thanhToan } from "helpers/constants.js";
import React, { useState } from "react";

const HistoryForm = () => {
  console.log("datadetail");
  const [data, setData] = useState({
    money: null,
    money_type: null,
    tt_type: null,
    create_date: null,
    content: null,
    owner: null,
    from: null,
    stk: null,
    bank: null,
    bank_city: null,
    reason: null,
  });

  const handleChangeDepartment = (department) => {
    setData({
      ...data,
      department,
    });
  };

  return (
    <div className="card card-small">
      <div className="border-bottom card-header">
        <h6 className="m-0">Thêm lịch sử giải ngân</h6>
      </div>

      <ul className="list-group list-group-flush">
        <li className="p-3 list-group-item">
          <div className="row">
            <div className="col">
              <form className="">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="money">Số tiền</label>
                    <input
                      id="money"
                      type="text"
                      placeholder="Số tiền"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="CfPassword">Loại Tiền Tệ</label>
                    <Select
                      options={moneyTypes}
                      option={data.money_type}
                      handleChange={handleChangeDepartment}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="feInputCity">Hình thức thanh toán</label>
                    <Select
                      options={thanhToan}
                      option={data.tt_type}
                      handleChange={handleChangeDepartment}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label for="feInputCity">Ngày giải ngân</label>
                    <DatePicker />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="content">Nội dung</label>
                    <input
                      id="content"
                      type="email"
                      placeholder="Nội dung"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="dataname">Người nhận</label>
                    <input
                      id="dataname"
                      type="text"
                      placeholder="Người nhận"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="fePassword">Nguồn</label>
                    <input
                      id="fePassword"
                      type="text"
                      placeholder="Nguồn"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="CfPassword">STK</label>
                    <input
                      id="CfPassword"
                      type="text"
                      placeholder="STK"
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label for="fePassword">Ngân hàng</label>
                    <input
                      id="fePassword"
                      type="text"
                      placeholder="Ngân hàng"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="CfPassword">Tỉnh/TP ngân hàng</label>
                    <input
                      id="CfPassword"
                      type="text"
                      placeholder="Tỉnh/TP"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* <div className="form-row">
                  <div className="form-group col-md-12">
                    <label for="feInputAddress">Địa chỉ</label>
                    <input
                      id="feInputAddress"
                      placeholder=""
                      className="form-control"
                    />
                  </div>
                </div> */}
                <div className="form-row">
                  <button
                    style={{ fontSize: "0.815rem" }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HistoryForm;
