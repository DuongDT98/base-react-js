import { Divider, Typography } from "antd";

const { Title } = Typography;

const BankUserDetail = ({ user, roleUser }) => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item p-3">
        <div className="row">
          <div className="col">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Chủ tài khoản
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankAccountName}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Mã ngân hàng
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankInfoDTO?.bankCode}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Ngân hàng
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankInfoDTO?.name}</div>
                </div>

                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Số tài khoản
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankAccountNumber}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Tên tiếng Anh
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankInfoDTO?.enName}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Chi nhánh thành phố
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankBranchCity}</div>
                </div>
                <div className="form-group col-md-6">
                  <label for="feInputCity" style={{ fontWeight: 600 }}>
                    Quốc gia
                  </label>
                  <div>{user?.bankAccountInfoDTO?.bankInfoDTO?.nation}</div>
                </div>
              </div>
              {/* <div className="form-row">
                        <div className="form-group col-md-12">
                          <label for="feDescription">Thông tin ngoài</label>
                          <textarea
                            className="form-control"
                            name="feDescription"
                            rows="5"
                            defaultValue="GIao diện thân thiện với người dùng"
                          ></textarea>
                        </div>
                      </div> */}
            </form>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default BankUserDetail;
