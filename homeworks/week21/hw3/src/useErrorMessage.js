import { useState } from "react";
import { defaultData as DATA, FORM_ERROR as ERROR } from "./useStaticData";

const useErrorMessage = (setFormState, getValueFromInputValue) => {
  const [message, setMessage] = useState(() => {
    const { localMessage } = window.localStorage;
    return localMessage ? JSON.parse(localMessage) : {};
  });

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

  const handleInputConditions = () => {
    let errorMessage = {};
    DATA.formData.map((data) => {
      if (checkInputValue(data.name) === "") {
        errorMessage = {
          ...errorMessage,
        };
      } else {
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

  const handleSubmitConditions = (e) => {
    e.stopPropagation();
    let errorMessage = {};
    DATA.formData.map((data) => {
      if (data.necessary) {
        errorMessage = {
          ...errorMessage,
          [data.name]:
            getValueFromInputValue(data.name) === ""
              ? ERROR.EMPTY_CONTENT.message
              : "",
        };
      } else {
        errorMessage = {
          ...errorMessage,
          [data.name]: "",
        };
      }
    });

    DATA.formData.map(
      (data) =>
        checkInputValue(data.name) &&
        (errorMessage[data.name] = checkInputValue(data.name))
    );

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
    console.log(message);
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
