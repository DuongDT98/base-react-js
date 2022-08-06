import { Select, Tooltip } from "antd";
import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { SelectSearch } from "components/share/style";
import { REQUEST_TYPE_GROUP_LIST } from "config/constant";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  const [listReqTypeName, setListReqTypeName] = useState(
    [
      ...new Set(
        listData
          .map((item, index) => {
            return { id: index, name: item.name };
          })
          .map(JSON.stringify)
      ),
    ].map(JSON.parse) || []
  );
  const [listReqTypeCode, setListReqTypeCode] = useState(
    [
      ...new Set(
        listData
          .map((item, index) => {
            return {
              id: index,
              name: item.requestTypeCode,
            };
          })
          .map(JSON.stringify)
      ),
    ].map(JSON.parse) || []
  );

  //Suggest input
  const [valueRequestTypeCode, setValueRequestTypeCode] = useState("");
  const [suggestionsRequestTypeCode, setSuggestionsRequestTypeCode] = useState(
    []
  );

  const [valueRequestTypeName, setValueRequestTypeName] = useState("");
  const [suggestionsRequestTypeName, setSuggestionsRequestTypeName] = useState(
    []
  );

  const handleFilter = (key, value) => {
    setFilter({
      ...filters,
      [key]: value,
    });
  };

  useEffect(() => {
    getObjectFilter(filters);
  }, [filters]);
  return (
    <ul className="list-group list-group-flush">
      <li className="p-3 list-group-item">
        <div className="row">
          <div className="col">
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="project">Mã đề nghị</label>
                <AutoSuggestionInput
                  suggestions={suggestionsRequestTypeCode}
                  setSuggestions={setSuggestionsRequestTypeCode}
                  valueKey={valueRequestTypeCode}
                  setValue={setValueRequestTypeCode}
                  arrInput={listReqTypeCode}
                  handleFilter={handleFilter}
                  fieldName="requestTypeCode"
                  placeholder="Nhập mã đề nghị"
                />
              </div>
              <div className="form-group col-md-3">
                <label for="project">Tên đề nghị</label>
                <AutoSuggestionInput
                  suggestions={suggestionsRequestTypeName}
                  setSuggestions={setSuggestionsRequestTypeName}
                  valueKey={valueRequestTypeName}
                  setValue={setValueRequestTypeName}
                  arrInput={listReqTypeName}
                  handleFilter={handleFilter}
                  fieldName="name"
                  placeholder="Nhập tên đề nghị"
                />
              </div>
              <div className="form-group col-md-3">
                <label for="project" style={{ display: "block" }}>
                  Nhóm đề nghị
                </label>

                <SelectSearch
                  placeholder="Chọn nhóm đề nghị"
                  allowClear
                  showSearch
                  onChange={(e) => handleFilter("requestTypeGroup", e)}
                >
                  {REQUEST_TYPE_GROUP_LIST?.sort(
                    (a, b) =>
                      a.label.toLocaleLowerCase() - b.label.toLocaleLowerCase()
                  )?.map((item) => (
                    <Select.Option value={item.value}>
                      <Tooltip title={item.label}>{item.label}</Tooltip>
                    </Select.Option>
                  ))}
                </SelectSearch>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};
export default SearchLayout;
