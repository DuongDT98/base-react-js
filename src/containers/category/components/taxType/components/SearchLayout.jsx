import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  const [listCostTypeName, setListCostTypeName] = useState(
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
  const [listCostCode, setListCostCode] = useState(
    [
      ...new Set(
        listData
          .map((item, index) => {
            return {
              id: index,
              name: item.costTypeCode,
            };
          })
          .map(JSON.stringify)
      ),
    ].map(JSON.parse) || []
  );

  //Suggest input
  const [valueCostTypeCode, setValueCostTypeCode] = useState("");
  const [suggestionsCostTypeCode, setSuggestionsCostTypeCode] = useState([]);

  const [valueCostTypeName, setValueCostTypeName] = useState("");
  const [suggestionsCostTypeName, setSuggestionsCostTypeName] = useState([]);

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
                <label for="project">Mã chi phí</label>
                <AutoSuggestionInput
                  suggestions={suggestionsCostTypeCode}
                  setSuggestions={setSuggestionsCostTypeCode}
                  valueKey={valueCostTypeCode}
                  setValue={setValueCostTypeCode}
                  arrInput={listCostCode}
                  handleFilter={handleFilter}
                  fieldName="costTypeCode"
                  placeholder="Nhập mã chi phí"
                />
              </div>
              <div className="form-group col-md-3">
                <label for="project">Tên chi phí</label>
                <AutoSuggestionInput
                  suggestions={suggestionsCostTypeName}
                  setSuggestions={setSuggestionsCostTypeName}
                  valueKey={valueCostTypeName}
                  setValue={setValueCostTypeName}
                  arrInput={listCostTypeName}
                  handleFilter={handleFilter}
                  fieldName="name"
                  placeholder="Nhập tên chi phí"
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
