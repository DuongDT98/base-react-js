import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  // set up list data select
  const [listProjName, setListProjName] = useState([]);

  //Suggest input
  const [valueDeparmentName, setValueDeparmentName] = useState("");
  const [suggestionsDeparmentName, setSuggestionsDeparmentName] = useState([]);

  useEffect(() => {
    setListProjName(
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
                <label for="project">Tên phòng ban</label>
                <AutoSuggestionInput
                  suggestions={suggestionsDeparmentName}
                  setSuggestions={setSuggestionsDeparmentName}
                  valueKey={valueDeparmentName}
                  setValue={setValueDeparmentName}
                  arrInput={listProjName}
                  handleFilter={handleFilter}
                  fieldName={"name"}
                  placeholder="Nhập tên phòng ban"
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
