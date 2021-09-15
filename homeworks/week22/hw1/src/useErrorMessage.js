import { useState } from "react";
import { defaultData as DATA, FORM_ERROR as ERROR } from "./useStaticData";

const useErrorMessage = (setFormState, getValueFromInputValue) => {
  const [message, setMessage] = useState(() => {
    const { localMessage } = window.localStorage;
    return localMessage ? JSON.parse(localMessage) : {};
  });
  // 依照輸入的內容判斷是否符合格式，false 則回傳 error message
  // 空字串會回傳空字串，防止未輸入訊息卻跳出錯誤訊息
  const checkInputValue = (name) => {
    const value = getValueFromInputValue(name);
    if (value === "") return "";
    if (name === "email") {
      const emailRegExp =
        /^[a-zA-z][a-zA-Z0-9]*([_.-][A-Za-z0-9]+)*@([a-z]+\.[a-z]+)/;
      return !emailRegExp.test(value) && ERROR.INVALID_EMAIL.message;
    }
    if (name === "phone") {
      const phoneRegExp = /^09\d{8}/;
      return !phoneRegExp.test(value) && ERROR.INVALID_PHONE.message;
    }
  };
  // 當點擊任何地方，就會判斷有輸入值的 input value
  const handleInputConditions = () => {
    let errorMessage = {};
    DATA.formData.map((data) => {
      // input value 為空字串不做任何改動
      if (checkInputValue(data.name) === "") {
        errorMessage = {
          ...errorMessage,
        };
      } else {
        // 不符合格式則輸出錯誤訊息，符合則空字串
        errorMessage = {
          ...errorMessage,
          [data.name]: checkInputValue(data.name) || "",
        };
      }
    });

    setMessage({
      ...message,
      ...errorMessage,
    });
  };
  // 點擊送出按鈕會判斷，資料格式是否正確、資料是否為空白
  const handleSubmitConditions = (e) => {
    // 防止點擊送出按鈕執行 handleInputConditions
    e.stopPropagation();
    let errorMessage = {};
    DATA.formData.map((data) => {
      // 必要資料，如果是空字串則輸出錯誤訊息，有資料則輸出空字串
      if (data.necessary) {
        errorMessage = {
          ...errorMessage,
          [data.name]:
            getValueFromInputValue(data.name) === ""
              ? ERROR.EMPTY_CONTENT.message
              : "",
        };
        // 非必要資料輸出空字串
      } else {
        errorMessage = {
          ...errorMessage,
          [data.name]: "",
        };
      }
    });
    // 與上方寫法稍有不同，因為這是最初寫法
    // 而上方為了不蓋掉空字串的錯誤訊息才操作調整
    DATA.formData.map(
      (data) =>
        checkInputValue(data.name) &&
        (errorMessage[data.name] = checkInputValue(data.name))
    );
    // 判斷有無 errorMessage，沒有則將 isSubmit: true 加入 formState
    !Object.values(errorMessage).some((errorMessage) => errorMessage !== "") &&
      setFormState({
        isSubmit: true,
      });

    setMessage({
      ...message,
      ...errorMessage,
    });
  };

  const getErrorMessageFromMessageState = (name) => {
    return message[name];
  };

  return {
    message,
    setMessage,
    handleInputConditions,
    handleSubmitConditions,
    getErrorMessageFromMessageState,
  };
};

export default useErrorMessage;
