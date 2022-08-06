import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  //edit
  const [listSupplyName, setListSupplyName] = useState([]);

  //Suggest input
  const [valueSupplyName, setValueSupplyName] = useState("");
  const [suggestionsSupplyName, setSuggestionsSupplyName] = useState([]);

  useEffect(() => {
    setListSupplyName(
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
  //edit

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
                <label for="project">Tên nhà cung cấp</label>
                <AutoSuggestionInput
                  suggestions={suggestionsSupplyName}
                  setSuggestions={setSuggestionsSupplyName}
                  valueKey={valueSupplyName}
                  setValue={setValueSupplyName}
                  arrInput={listSupplyName}
                  handleFilter={handleFilter}
                  fieldName="name"
                  placeholder="Nhập tên nhà cung cấp"
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
