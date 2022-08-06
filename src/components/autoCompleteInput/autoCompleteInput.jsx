import { useCallback, useEffect, useState } from "react";
import "./autoCompleteInput.scss";

const InputAutoComplete = ({
  dataSelect,
  disabled,
  onKeyDown,
  formatResult,
  handleFilter,
  keySearch,
  placeholder,
  ...props
}) => {
  const [isShowResult, setIsShowResult] = useState(false);
  const [selectOption, setSelectOption] = useState([]);
  const [searchString, setSearchString] = useState();

  const handleOnSearch = useCallback((e) => {
    if (e.target.value.length === 0) {
      setIsShowResult(false);
    } else {
      setIsShowResult(true);
    }
    setSearchString(e.target.value);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsShowResult(false);
  }, []);

  useEffect(() => {
    setSelectOption(
      [
        ...new Set(
          dataSelect
            .filter((item) =>
              item?.value?.toLowerCase()?.includes(searchString)
            )
            .map(JSON.stringify)
        ),
      ].map(JSON.parse) || []
    );
  }, [dataSelect, searchString]);

  const handleOnFocus = () => {
    if (!!searchString) {
      setIsShowResult(true);
    } else {
      setIsShowResult(false);
    }
  };

  const handleClick = useCallback(
    (result) => {
      if (result) {
        setIsShowResult(false);
        setSearchString(result?.value);
        handleFilter(keySearch, result?.value);
      }
    },
    [handleFilter, keySearch, setSearchString]
  );

  const formatResultWithKey = formatResult
    ? formatResult
    : (item) => item?.value;

  return (
    <div className="container">
      <input
        className="input-search"
        spellCheck={false}
        value={searchString}
        onChange={handleOnSearch}
        onFocus={handleOnFocus}
        placeholder={placeholder}
        onBlur={handleOnBlur}
        {...props}
      />
      {isShowResult && (
        <div className="containerResult">
          {selectOption?.length > 0 ? (
            selectOption.map((result) => (
              <div
                className={
                  searchString === result?.value ? "selected" : "result"
                }
                data-test="result"
                key={result.value}
                onClick={() => handleClick(result)}
              >
                <div className="ellipsis" title={result?.value}>
                  {formatResultWithKey(result)}
                </div>
              </div>
            ))
          ) : (
            <div className={"result"}>Không có dữ liệu</div>
          )}
        </div>
      )}
    </div>
  );
};
export default InputAutoComplete;
