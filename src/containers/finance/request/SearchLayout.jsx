import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { DatePicker } from "antd";
import { SelectSearch } from "components/share/style";
import { Select, Tooltip } from "antd";
import "./search.scss";
import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { STATUS_LIST } from "config/constant";
// import useCheckRoleUser from "hook/useCheckRole";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  // const isRole = useCheckRoleUser();
  const [filters, setFilter] = useState({});
  //department
  const [listDepartment, setListDepartment] = useState([]);
  const [valueDepartment, setValueDepartment] = useState("");
  const [suggestionsDepartment, setSuggestionsDepartment] = useState([]);

  //email
  // const [listEmail, setListEmail] = useState([]);
  // const [valueEmail, setValueEmail] = useState("");
  // const [suggestionsEmail, setSuggestionsEmail] = useState([]);

  //full name
  const [listFullName, setListFullName] = useState([]);
  const [valueFullName, setValueFullName] = useState("");
  const [suggestionsFullName, setSuggestionsFullName] = useState([]);

  //employees Code
  const [listEmployeeCode, setListEmployeeCode] = useState([]);
  const [valueEmployeeCode, setValueEmployeeCode] = useState("");
  const [suggestionsEmployeeCode, setSuggestionsEmployeeCode] = useState([]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // const USER_HAS_LIST = [
  //   isRole && {
  //     label: "Tất cả",
  //     value: "ALL",
  //   },
  //   {
  //     label: "Của tôi",
  //     value: "ME",
  //   },
  //   {
  //     label: "Gửi tới tôi",
  //     value: "SEND_TO_ME",
  //   },
  // ];

  useEffect(() => {
    // setListEmail(
    //   [
    //     ...new Set(
    //       listData
    //         .map((item) => {
    //           return { id: item.email, name: item.email };
    //         })
    //         .map(JSON.stringify)
    //     ),
    //   ].map(JSON.parse) || []
    // );
    setListFullName(
      [
        ...new Set(
          listData
            .map((item) => {
              return { id: item.fullName, name: item.fullName };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
    setListEmployeeCode(
      [
        ...new Set(
          listData
            .map((item) => {
              return { id: item.employeeCode, name: item.employeeCode };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
    setListDepartment(
      [
        ...new Set(
          listData
            .map((item) => {
              return {
                id: item.departmentDTO?.name,
                name: item.departmentDTO?.name,
              };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [listData]);
  //edit

  const handleFilter = (key, value) => {
    setFilter({
      ...filters,
      [key]: value,
    });
  };

  useEffect(() => {
    getObjectFilter(filters);
  }, [filters, getObjectFilter]);
  return (
    <ul className="list-group list-group-flush">
      <li className="p-3 list-group-item">
        <div className="row">
          <div className="col">
            <form className="">
              <div className="form-row">
                <div className="form-group col-md-3 form-search-date">
                  <label for="from_date">Từ ngày</label>
                  <DatePicker
                    className="input-date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Từ ngày"
                  />
                </div>
                <div className="form-group col-md-3 form-search-date">
                  <label for="to_date">Tới ngày</label>
                  <DatePicker
                    className="input-date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="Tới ngày"
                  />
                </div>
              </div>
              <div className="form-row">
                {/* <div className="form-group col-md-3">
                  <label for="project">Sở hữu</label>
                  <SelectSearch
                    placeholder="Chọn sở hữu"
                    allowClear
                    showSearch
                    onChange={(e) => handleFilter("requestTypeGroup", e)}
                  >
                    {USER_HAS_LIST?.filter((i) => !!i)
                      ?.sort(
                        (a, b) =>
                          a.label.toLocaleLowerCase() -
                          b.label.toLocaleLowerCase()
                      )
                      ?.map((item) => (
                        <Select.Option value={item.value}>
                          <Tooltip title={item.label}>{item.label}</Tooltip>
                        </Select.Option>
                      ))}
                  </SelectSearch>
                </div> */}

                <div className="col-md-3">
                  <label for="project">Người đề nghị</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFullName}
                    setSuggestions={setSuggestionsFullName}
                    valueKey={valueFullName}
                    setValue={setValueFullName}
                    arrInput={listFullName}
                    handleFilter={handleFilter}
                    fieldName={"fullName"}
                    placeholder="Nhập người đề nghị"
                  />
                </div>
                <div className="col-md-3">
                  <label for="creater">Loại đề nghị</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFullName}
                    setSuggestions={setSuggestionsFullName}
                    valueKey={valueFullName}
                    setValue={setValueFullName}
                    arrInput={listFullName}
                    handleFilter={handleFilter}
                    fieldName={"fullName"}
                    placeholder="Loại đề nghị"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Trạng thái</label>
                  <SelectSearch
                    placeholder="Chọn trạng thái"
                    allowClear
                    showSearch
                    onChange={(e) => handleFilter("requestTypeGroup", e)}
                  >
                    {STATUS_LIST?.sort(
                      (a, b) =>
                        a.label.toLocaleLowerCase() -
                        b.label.toLocaleLowerCase()
                    )?.map((item) => (
                      <Select.Option value={item.value}>
                        <Tooltip title={item.label}>{item.label}</Tooltip>
                      </Select.Option>
                    ))}
                  </SelectSearch>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-3">
                  <label for="creater">Phòng ban chịu chi phí</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFullName}
                    setSuggestions={setSuggestionsFullName}
                    valueKey={valueFullName}
                    setValue={setValueFullName}
                    arrInput={listFullName}
                    handleFilter={handleFilter}
                    fieldName={"fullName"}
                    placeholder="Phòng ban chịu chi phí"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="type">Dự án (Công trình) chịu chi phí</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsEmployeeCode}
                    setSuggestions={setSuggestionsEmployeeCode}
                    valueKey={valueEmployeeCode}
                    setValue={setValueEmployeeCode}
                    arrInput={listEmployeeCode}
                    handleFilter={handleFilter}
                    fieldName={"employeeCode"}
                    placeholder="Nhập Dự án (Công trình)"
                  />
                </div>
                <div className="col-md-3">
                  <label for="contract">Nhà cung cấp</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsDepartment}
                    setSuggestions={setSuggestionsDepartment}
                    valueKey={valueDepartment}
                    setValue={setValueDepartment}
                    arrInput={listDepartment}
                    handleFilter={handleFilter}
                    fieldName={"departmentId"}
                    placeholder="Nhập nhà cung cấp"
                  />
                </div>
                <div className="col-md-3">
                  <label for="project">Nhân viên</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsDepartment}
                    setSuggestions={setSuggestionsDepartment}
                    valueKey={valueDepartment}
                    setValue={setValueDepartment}
                    arrInput={listDepartment}
                    handleFilter={handleFilter}
                    fieldName={"departmentId"}
                    placeholder="Nhập nhân viên"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </li>
    </ul>
  );
};
export default SearchLayout;
