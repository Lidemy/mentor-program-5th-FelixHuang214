import * as Icon from "@fortawesome/free-solid-svg-icons";
import useTodos from "./useTodos";
import * as S from "./style";

const TodoInput = ({ onKeyDown, onChange, value }) => {
  return (
    <S.InputItemWrapper>
      <S.CircleIcon />
      <S.InputItem value={value} onKeyDown={onKeyDown} onChange={onChange} />
    </S.InputItemWrapper>
  );
};

const TodoDoneButton = ({ handleDoneButton, todo }) => {
  return (
    <S.ItemCircleIcon
      todo={todo}
      onClick={() => {
        handleDoneButton(todo.id);
      }}
    >
      {todo.isDone && <S.CheckIcon icon={Icon.faCheck} />}
    </S.ItemCircleIcon>
  );
};

const TodoItem = ({ todo, itemsEvents }) => {
  const { handleDoneButton, handDeleteButton } = itemsEvents;
  return (
    <S.TaskItemWrapper>
      <TodoDoneButton handleDoneButton={handleDoneButton} todo={todo} />
      <S.TaskItem todo={todo}>{todo.content}</S.TaskItem>
      <S.DeleteButton
        onClick={() => {
          handDeleteButton(todo.id);
        }}
      />
    </S.TaskItemWrapper>
  );
};

const ActiveBlock = ({ handleItemDisplay, display }) => {
  return (
    <S.ActiveWrapper>
      {["All", "Incomplete", "Completed"].map((name) => (
        <S.ActiveItem
          display={display}
          key={name}
          onClick={() => {
            handleItemDisplay(name);
          }}
        >
          {name}
        </S.ActiveItem>
      ))}
    </S.ActiveWrapper>
  );
};

const InfoBlock = ({ display, count, infoEvents }) => {
  const { handleItemDisplay, handleClearButton } = infoEvents;
  return (
    <S.InfoWrapper>
      <S.Count>{count} items left</S.Count>
      <ActiveBlock display={display} handleItemDisplay={handleItemDisplay} />
      <S.ClearItems onClick={handleClearButton}>Clear {display}</S.ClearItems>
    </S.InfoWrapper>
  );
};

const TodoContent = ({ display, todos, itemsEvents, infoEvents }) => {
  return (
    <S.ContentWrapper>
      {(display === "All" &&
        todos.map((todo) => (
          <TodoItem itemsEvents={itemsEvents} key={todo.id} todo={todo} />
        ))) ||
        (display === "Incomplete" &&
          todos.map(
            (todo) =>
              !todo.isDone && (
                <TodoItem itemsEvents={itemsEvents} key={todo.id} todo={todo} />
              )
          )) ||
        (display === "Completed" &&
          todos.map(
            (todo) =>
              todo.isDone && (
                <TodoItem itemsEvents={itemsEvents} key={todo.id} todo={todo} />
              )
          ))}
      <InfoBlock
        display={display}
        infoEvents={infoEvents}
        count={todos.filter((todo) => !todo.isDone).length}
      />
    </S.ContentWrapper>
  );
};

const TodoList = () => {
  const {
    value,
    todos,
    display,
    handleChange,
    handleKeyDown,
    handleDoneButton,
    handDeleteButton,
    handleItemDisplay,
    handleClearButton,
  } = useTodos();

  return (
    <S.Container>
      <S.TodoTitle>
        <h1>T O D O</h1>
      </S.TodoTitle>
      <S.ListWrapper>
        <TodoInput
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <TodoContent
          display={display}
          itemsEvents={{ handDeleteButton, handleDoneButton }}
          infoEvents={{ handleItemDisplay, handleClearButton }}
          todos={todos}
        />
      </S.ListWrapper>
    </S.Container>
  );
};

export default TodoList;
