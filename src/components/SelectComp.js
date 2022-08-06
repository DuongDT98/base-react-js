import React, { useEffect, useState } from "react";
import Select from "react-select";

const SelectComp = ({ option, handleChange, options }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const i = options.find((o) => o.value === option);
    if (i) {
      setValue(i);
    }
  }, [option, options]);

  return (
    <Select
      value={value}
      onChange={(e) => handleChange(e.value)}
      options={options}
      placeholder="Chọn..."
      styles={{
        control: (base) => ({
          ...base,
          fontSize: "0.815rem",
        }),
      }}
    />
  );
};

export default SelectComp;
