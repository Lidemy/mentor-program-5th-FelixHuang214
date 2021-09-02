import { useState, useRef } from "react";

export default function useInput() {
  const id = useRef(1);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { id, value, setValue, handleChange };
}
