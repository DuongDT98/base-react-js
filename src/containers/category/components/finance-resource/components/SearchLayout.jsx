import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useCallback, useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  const [listFinanceName, setListFinanceName] = useState([]);
  const [valueFinanceName, setValueFinanceName] = useState("");
  const [suggestionsFinanceName, setSuggestionsFinanceName] = useState([]);

  const [listFinanceCode, setListFinanceCode] = useState([]);
  const [valueFinanceCode, setValueFinanceCode] = useState("");
  const [suggestionsFinanceCode, setSuggestionsFinanceCode] = useState([]);

  useEffect(() => {
    setListFinanceName(
      [
        ...new Set(
          listData
            .map((item) => {
              return { id: item.name, name: item.name };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [listData]);

  useEffect(() => {
    setListFinanceCode(
      [
        ...new Set(
          listData
            .map((item) => {
              return {
                id: item.financeResourceCode,
                name: item.financeResourceCode,
              };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [listData]);

  const handleFilter = useCallback(
    (key, value) => {
      setFilter({
        ...filters,
        [key]: value,
      });
    },
    [filters]
  );

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
                <div className="form-group col-md-3">
                  <label for="project">Mã nguồn tài chính</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFinanceCode}
                    setSuggestions={setSuggestionsFinanceCode}
                    valueKey={valueFinanceCode}
                    setValue={setValueFinanceCode}
                    arrInput={listFinanceCode}
                    handleFilter={handleFilter}
                    fieldName={"financeResourceCode"}
                    placeholder="Nhập mã nguồn tài chính"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label for="project">Tên nguồn tài chính</label>
                  <AutoSuggestionInput
                    suggestions={suggestionsFinanceName}
                    setSuggestions={setSuggestionsFinanceName}
                    valueKey={valueFinanceName}
                    setValue={setValueFinanceName}
                    arrInput={listFinanceName}
                    handleFilter={handleFilter}
                    fieldName={"name"}
                    placeholder="Nhập tên nguồn tài chính"
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
