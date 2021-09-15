import { useContext } from "react";
import styled from "styled-components";

import { StateContext } from "../../contexts";

const CategorizeBarWrapper = styled.div`
  display: flex;
  font-size: 16px;
  color: #545454;
  align-items: center;
  div + div {
    margin-left: 30px;
  }
  div:hover {
    cursor: pointer;
    color: rgb(120, 94, 46);
  }
`;

export default function CategorizeBar() {
  const { state } = useContext(StateContext);
  const { categorizeContent } = state;
  // 未實做，目標為使用 search 搜尋時可以加上上一個分類
  const handleClickCategorizeItems = () => {};
  return (
    <CategorizeBarWrapper>
      {categorizeContent.map((content, index) => (
        <div key={index} onClick={handleClickCategorizeItems}>
          {content.name}
        </div>
      ))}
    </CategorizeBarWrapper>
  );
}
