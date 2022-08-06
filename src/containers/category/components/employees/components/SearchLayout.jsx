import { useEffect, useState } from "react";
import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionWithId";

export const SearchLayout = ({ listData, filters, setFilter }) => {
  //department
  const [listDepartment, setListDepartment] = useState([]);
  const [valueDepartment, setValueDepartment] = useState("");
  const [suggestionsDepartment, setSuggestionsDepartment] = useState([]);

  //email
  const [listEmail, setListEmail] = useState([]);
  const [valueEmail, setValueEmail] = useState("");
  const [suggestionsEmail, setSuggestionsEmail] = useState([]);

  //full name
  const [listFullName, setListFullName] = useState([]);
  const [valueFullName, setValueFullName] = useState("");
  const [suggestionsFullName, setSuggestionsFullName] = useState([]);

  //employees Code
  const [listEmployeeCode, setListEmployeeCode] = useState([]);
  const [valueEmployeeCode, setValueEmployeeCode] = useState("");
  const [suggestionsEmployeeCode, setSuggestionsEmployeeCode] = useState([]);

  useEffect(() => {
    setListEmail(
      [
        ...new Set(
          listData
            .map((item) => {
              return { id: item.email, name: item.email };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
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
                id: item.departmentDTO?.id,
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

  return (
    <ul className="list-group list-group-flush">
      <li className="p-3 list-group-item">
        <div className="row">
          <div className="col">
            <form className="">
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label for="project">Tên đăng nhập</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsEmail}
                    setSuggestions={setSuggestionsEmail}
                    valueKey={valueEmail}
                    setValue={setValueEmail}
                    arrInput={listEmail}
                    handleFilter={handleFilter}
                    fieldName={"email"}
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Tên đầy đủ</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFullName}
                    setSuggestions={setSuggestionsFullName}
                    valueKey={valueFullName}
                    setValue={setValueFullName}
                    arrInput={listFullName}
                    handleFilter={handleFilter}
                    fieldName={"fullName"}
                    placeholder="Nhập tên đầy đủ"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Mã nhân viên</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsEmployeeCode}
                    setSuggestions={setSuggestionsEmployeeCode}
                    valueKey={valueEmployeeCode}
                    setValue={setValueEmployeeCode}
                    arrInput={listEmployeeCode}
                    handleFilter={handleFilter}
                    fieldName={"employeeCode"}
                    placeholder="Nhập mã nhân viên"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Bộ phận</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsDepartment}
                    setSuggestions={setSuggestionsDepartment}
                    valueKey={valueDepartment}
                    setValue={setValueDepartment}
                    arrInput={listDepartment}
                    handleFilter={handleFilter}
                    fieldName={"departmentId"}
                    placeholder="Nhập bộ phận"
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
