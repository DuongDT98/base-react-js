import { AutoSuggestionInput } from "components/autoSuggestion/autoSuggestionInput";
import { useEffect, useState } from "react";

export const SearchLayout = ({ listData, getObjectFilter }) => {
  const [filters, setFilter] = useState({});
  const [listProjName, setListProjName] = useState([]);
  const [valueProjName, setValueProjName] = useState("");
  const [suggestionsProjName, setSuggestionsProjName] = useState([]);

  useEffect(() => {
    setListProjName(
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
                <div className="form-group col-md-3">
                  <label for="project">Tên dự án</label>
                  {/* <InputAutoComplete
                    placeholder={"nhập tên dự án"}
                    keySearch={"name"}
                    dataSelect={listProjName}
                    handleFilter={handleFilter}
                  /> */}
                  <AutoSuggestionInput
                    suggestions={suggestionsProjName}
                    setSuggestions={setSuggestionsProjName}
                    valueKey={valueProjName}
                    setValue={setValueProjName}
                    arrInput={listProjName}
                    handleFilter={handleFilter}
                    fieldName={"name"}
                    placeholder="Nhập tên dự án"
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
