import Autosuggest from "react-autosuggest";

export const AutoSuggestionInput = ({
  suggestions,
  setSuggestions,
  valueKey,
  setValue,
  arrInput,
  handleFilter,
  fieldName,
  placeholder,
}) => {
  function getSuggestions(arr, value) {
    return arr.filter((item) =>
      item.name?.toLowerCase().includes(value.trim().toLowerCase())
    );
  }
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsClearRequested={() => setSuggestions([])}
      onSuggestionsFetchRequested={({ value }) => {
        setValue(value);
        setSuggestions(getSuggestions(arrInput, value));
      }}
      onSuggestionSelected={(_, { suggestionValue }) => {
        const valuefilter = arrInput?.filter(
          (e) => e?.name === suggestionValue
        )[0]?.id;
        handleFilter(fieldName, valuefilter);
      }}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
      inputProps={{
        placeholder: placeholder,
        value: valueKey,
        onChange: (_, { newValue, method }) => {
          setValue(newValue);
        },
        onKeyDown: (event) => {
          if (event.key === "Enter") {
            handleFilter(fieldName, valueKey);
          }
        },
      }}
      highlightFirstSuggestion={true}
    />
  );
};
