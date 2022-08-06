import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  //edit
  const [listBankCode, setListBankCode] = useState([]);
  const [listBankName, setListBankName] = useState([]);
  //Suggest input
  const [valueBankCode, setValueBankCode] = useState("");
  const [suggestionsBankCode, setSuggestionsBankCode] = useState([]);

  const [valueBankName, setValueBankName] = useState("");
  const [suggestionsBankName, setSuggestionsBankName] = useState([]);

  useEffect(() => {
    setListBankCode(
      [
        ...new Set(
          listData
            .map((item, index) => {
              return { id: index, name: item.bankCode };
            })
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
    setListBankName(
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
  }, []);

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
                <label for="project">Tên viết tắt</label>
                <AutoSuggestionInput
                  suggestions={suggestionsBankCode}
                  setSuggestions={setSuggestionsBankCode}
                  valueKey={valueBankCode}
                  setValue={setValueBankCode}
                  arrInput={listBankCode}
                  handleFilter={handleFilter}
                  fieldName={"bankCode"}
                  placeholder="Nhập mã ngân hàng"
                />
              </div>
              <div className="form-group col-md-3">
                <label for="project">Tên ngân hàng</label>
                <AutoSuggestionInput
                  suggestions={suggestionsBankName}
                  setSuggestions={setSuggestionsBankName}
                  valueKey={valueBankName}
                  setValue={setValueBankName}
                  arrInput={listBankName}
                  handleFilter={handleFilter}
                  fieldName={"name"}
                  placeholder="Nhập tên ngân hàng"
                />
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};
export default SearchLayout;
