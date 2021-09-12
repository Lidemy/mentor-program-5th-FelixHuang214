import { useState } from "react";

const useFormState = () => {
  const [formState, setFormState] = useState({
    isSubmit: false,
  });

  const controlUpdateForm = () => {
    setFormState({
      isSubmit: false,
    });
  };

  return {
    formState,
    setFormState,
    controlUpdateForm,
  };
};

export default useFormState;
