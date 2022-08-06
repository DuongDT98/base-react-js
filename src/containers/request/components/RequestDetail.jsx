import React, { useState } from "react";
import Modal from "react-modal";
import HistoryForm from "./HistoryForm";

const RequestDetail = () => {
  const [isAddHistoryOpen, setAddHistoryOpen] = useState(false);

  const fakeData = {
    department: "Phòng 1",
    type: "Loại A",
    contract: "TC VP",
    budget: "12,000,000,000",
    money_type: "VNĐ",
    description: "...",
    tt: "CK",
    stk: "0423489823",
    bank: "Vietcombank",
    bank_place: "HN",
    create_date: "20/04/2022",
    back_date: "20/05/2022",
    recipe_date: "22/04/2022",
    file: "https://....",
    status: "Chờ Duyệt",
  };

  const history = [
    {
      money: "100,000,000",
      money_type: "VNĐ",
      tt_type: "CK",
      create_date: "25/04/2022",
      content: "Giải ngân vay",
      owner: "Nguyễn Văn F",
      from: "ABC",
      stk: "238127",
      bank: "Vietcombank",
      bank_city: "HN",
      reason: "...",
    },
  ];

  return (
    <div className="main-content-container container-fluid px-4">
      <div className="page-header row no-gutters py-4">
        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
          <h3 className="page-title">Chi tiết đề nghị</h3>
        </div>
      </div>
      <div className="row" style={{minWidth:"1000px"}}>
        <div className="mb4 col-lg-8">
          <div className="mb-4 card card-small">
            <div className="border-bottom card-header">
              <h6 className="m-0">
                Thông tin đề nghị <span className="cho-duyet">Chờ Duyệt</span>
              </h6>
            </div>
            <ul className="list-group list-group-flush">
              <li className="p-3 list-group-item">
                <div className="row">
                  <div className="col">
                    <form className="">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Dự án</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.project}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Phòng ban</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.department}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Loại đề nghị</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.type}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Loại hồ sơ</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.contract}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="money">Tổng số tiền</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.budget}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Loại tiền tệ</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.money_type}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="description">Diễn giải</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.description}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="feInputCity">Cách thanh toán</label>

                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.tt}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label for="stk">Stk</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.stk}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="bank">Ngân hàng(chi nhánh)</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.bank}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <label for="bank-city">Tỉnh/TP chi nhánh</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.bank_place}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="giai-ngan">Ngày yêu cầu thanh toán</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.create_date}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-6">
                          <label for="hu-date">Ngày hoàn ứng</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.back_date}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="recipe-date">Ngày nhận hóa đơn</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value={fakeData.recipe_date}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row"></div>
                      <div className="form-row">
                        <div className="col-md-12">
                          <label for="hu-date">Chứng từ hóa đơn đính kèm</label>
                          <textarea
                            id="hu-date"
                            type="text"
                            placeholder="Chứng từ"
                            className="form-control"
                            rows={3}
                            value={fakeData.file}
                            readOnly
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
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb4 col-lg-4">
          <div className="mb-4 card card-small">
            <div className="border-bottom card-header">
              <h6 className="m-0">Trạng thái duyệt</h6>
            </div>
            <ul className="list-group list-group-flush">
              <li className="p-3 list-group-item">
                <div className="row">
                  <div className="col">
                    <form className="">
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="feInputCity" className="label-person">
                            Trưởng bộ phận/dự án{" "}
                            <span className="da-duyet">Đã duyệt</span>
                          </label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value="Nguyễn Văn A"
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label className="label-person" for="feInputCity">
                            Kế Toán<span className="cho-duyet">Chờ Duyệt</span>
                          </label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value="Nguyễn Văn B"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="feInputCity">Tài Chính</label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value="Nguyễn Văn C"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="feInputCity">
                            Lãnh đạo có thẩm quyền
                          </label>
                          <input
                            id="money"
                            type="text"
                            placeholder="Số tiền"
                            className="form-control"
                            value="Nguyễn Văn D"
                            readOnly
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
                    </form>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb4 col-lg-12">
          <div className="card card-small mb-4">
            <div className="border-bottom card-header">
              <h6 className="m-0">Lịch sử giải ngân</h6>
            </div>
            <div className="card-body p-0 pb-3 text-center">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Số Tiền
                    </th>
                    <th scope="col" className="border-0">
                      Loại Tiền Tệ
                    </th>
                    <th scope="col" className="border-0">
                      Hình thức thanh toán
                    </th>
                    <th scope="col" className="border-0">
                      Ngày Giải Ngân
                    </th>
                    <th scope="col" className="border-0">
                      Nội Dung
                    </th>
                    <th scope="col" className="border-0">
                      Người Nhân
                    </th>
                    <th scope="col" className="border-0">
                      Nguồn
                    </th>
                    <th scope="col" className="border-0">
                      STK
                    </th>
                    <th scope="col" className="border-0">
                      Ngân Hàng(Chi Nhánh)
                    </th>
                    <th scope="col" className="border-0">
                      Tỉnh/TP Ngân Hàng
                    </th>
                    <th scope="col" className="border-0">
                      Lý Do Thanh Toán không đúng hạn
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((o, i) => (
                    <tr key={`user-${i}`}>
                      <td>{i + 1}</td>
                      <td>{o.money}</td>
                      <td>{o.money_type}</td>
                      <td>{o.tt_type}</td>
                      <td>{o.create_date}</td>
                      <td>{o.content}</td>
                      <td>{o.owner}</td>
                      <td>{o.from}</td>
                      <td>{o.stk}</td>
                      <td>{o.bank}</td>
                      <td>{o.bank_city}</td>
                      <td>{o.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setAddHistoryOpen(true)}
              className="mb-2 mr-1 btn btn-primary btn-sm"
              style={{
                fontSize: "15px",
                maxWidth: "150px",
                marginLeft: "15px",
              }}
            >
              Thêm giải ngân
            </button>

            <Modal
              isOpen={isAddHistoryOpen}
              onRequestClose={() => setAddHistoryOpen(false)}
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  border: "none",
                  width: "700px",
                },
              }}
              contentLabel="Example Modal"
            >
              <HistoryForm />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
