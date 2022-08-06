import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionWithId";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import "./search.scss";

export const SearchLayout = ({
  listData,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  filters,
  setFilter,
}) => {
  const [listProjName, setListProjName] = useState([]);
  const [valueProjName, setValueProjName] = useState("");
  const [suggestionsProjName, setSuggestionsProjName] = useState([]);

  const [listSupplier, setListSupplier] = useState([]);
  const [valueSupplier, setValueSupplier] = useState("");
  const [suggestionsSupplier, setSuggestionsSupplier] = useState([]);

  useEffect(() => {
    setListProjName(
      [
        ...new Set(
          listData
            .map((item) => {
              return {
                id: item.projectDTO?.id,
                name: item.projectDTO?.name,
              };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [listData]);

  useEffect(() => {
    setListSupplier(
      [
        ...new Set(
          listData
            .map((item) => {
              return {
                id: item.supplierDTO?.id,
                name: item.supplierDTO?.name,
              };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [listData]);

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
                  <label for="project">Dự án</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsProjName}
                    setSuggestions={setSuggestionsProjName}
                    valueKey={valueProjName}
                    setValue={setValueProjName}
                    arrInput={listProjName}
                    handleFilter={handleFilter}
                    fieldName={"projectDTO"}
                    placeholder="Nhập tên dự án"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Nhà cung cấp</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsSupplier}
                    setSuggestions={setSuggestionsSupplier}
                    valueKey={valueSupplier}
                    setValue={setValueSupplier}
                    arrInput={listSupplier}
                    handleFilter={handleFilter}
                    fieldName={"supplierDTO"}
                    placeholder="Nhập tên nhà cung cấp"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Ngày ký hợp đồng</label>
                  <div className="d-flex">
                    <DatePicker
                      className="input-date"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Từ ngày"
                    />
                  </div>
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Ngày ký hợp đồng</label>
                  <div className="d-flex">
                    <DatePicker
                      className="input-date"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="Tới ngày"
                    />
                  </div>
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
