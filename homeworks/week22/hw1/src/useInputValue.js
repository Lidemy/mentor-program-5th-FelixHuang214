import { useState } from "react";
import { defaultData as DATA } from "./useStaticData";

const useInputValue = () => {
  const [inputValue, setInputValue] = useState(() => {
    const { localInputValue } = window.localStorage;
    return localInputValue
      ? JSON.parse(localInputValue)
      : {
          ...DATA.initialInputValue,
        };
  });

  const handleInputValue = (e, name) => {
    const { value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: { value },
    });
  };

  const getValueFromInputValue = (name) => {
    return inputValue[name].value;
  };

  return {
    inputValue,
    setInputValue,
    handleInputValue,
    getValueFromInputValue,
  };
};

export default useInputValue;
