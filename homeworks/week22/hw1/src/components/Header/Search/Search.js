import { useContext, useState } from "react";
import styled from "styled-components";

import { Search as SearchIcon } from "@styled-icons/boxicons-regular";
import { Cross as CrossIcon } from "@styled-icons/entypo";

import { StateContext } from "../../../contexts";
import { getPostsByAuthor } from "../../../WebAPI";

const StyledSearch = styled(SearchIcon)`
  height: 20px;
`;

const StyledCrossIcon = styled(CrossIcon)`
  position: absolute;
  right: 0;
  height: 18px;
  cursor: pointer;
`;

const SearchWrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding: 7px 0px;
  width: 180px;
  &:hover {
    border-bottom: 2px solid black;
  }
`;

const StyledInput = styled.input`
  max-width: 120px;
  font-size: 18px;
  margin-left: 10px;
  border: 0;
  ::placeholder {
    font-size: 16px;
  }
`;

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const { state, dispatch } = useContext(StateContext);
  const handleChangeValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickCrossButton = () => {
    setInputValue("");
  };

  const handleSearchPosts = (e) => {
    e.preventDefault();
  };
  return (
    <SearchWrapper onSubmit={handleSearchPosts}>
      <StyledSearch />
      <StyledInput
        value={inputValue}
        placeholder="Search..."
        onChange={handleChangeValue}
      />
      {inputValue && <StyledCrossIcon onClick={handleClickCrossButton} />}
    </SearchWrapper>
  );
}
