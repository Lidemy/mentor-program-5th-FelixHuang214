import { useState } from "react";
import useInput from "./useInput";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [display, setDisplay] = useState("All");
  const { id, value, setValue, handleChange } = useInput();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const content = value;
      if (!content) return;
      setTodos([
        {
          id: id.current,
          content,
          isDone: false,
        },
        ...todos,
      ]);
      setValue("");
      id.current++;
    }
  };

  const handleDoneButton = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handDeleteButton = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleItemDisplay = (name) => {
    setDisplay(name);
  };

  const handleClearButton = () => {
    if (display === "All") setTodos([]);
    if (display === "Incomplete") setTodos(todos.filter((todo) => todo.isDone));
    if (display === "Completed") setTodos(todos.filter((todo) => !todo.isDone));
  };

  return {
    id,
    value,
    setValue,
    todos,
    setTodos,
    display,
    setDisplay,
    handleChange,
    handleKeyDown,
    handleDoneButton,
    handDeleteButton,
    handleItemDisplay,
    handleClearButton,
  };
}
