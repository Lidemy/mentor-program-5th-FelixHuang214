import { useState } from "react";
import styled from "styled-components";

import {
  Heart as HeartIcon,
  HeartFill as HeartFillIcon,
} from "@styled-icons/bootstrap";

const WatchCounts = styled.div`
  &:hover {
    cursor: default;
  }
`;
const CommentsCounts = styled.div`
  margin-left: 20px;
  &:hover {
    cursor: default;
  }
`;
const ItemsWrapper = styled.div`
  display: flex;
  font-size: 12px;
`;

const StyledHeartIcon = styled(HeartIcon)`
  height: 15px;
  color: red;
  :hover {
    cursor: pointer;
  }
`;

const StyledHeartFillIcon = styled(HeartFillIcon)`
  height: 15px;
  color: red;
  :hover {
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-top: 2px solid #ccc;
  padding-top: 20px;
  color: #6e6e6e;
  ${WatchCounts} {
    ${(p) => p.WatchCounts}
    color: ${(p) => p.theme.main};
  }
  ${CommentsCounts} {
    ${(p) => p.CommentsCounts}
  }
  ${ItemsWrapper} {
    ${(p) => p.ItemsWrapper}
  }
  ${StyledHeartIcon} {
    ${(p) => p.StyledHeartIcon}
  }
  ${StyledHeartFillIcon} {
    ${(p) => p.StyledHeartFillIcon}
  }
`;

export default function BelowInfo({ style }) {
  const [heartFill, setHeartFill] = useState(false);
  const handleHeartState = () => {
    setHeartFill(!heartFill);
  };
  return (
    <Wrapper {...style}>
      <ItemsWrapper>
        <WatchCounts>100 次瀏覽</WatchCounts>
        <CommentsCounts>100 則留言</CommentsCounts>
      </ItemsWrapper>
      <div onClick={handleHeartState}>
        {heartFill ? <StyledHeartFillIcon /> : <StyledHeartIcon />}
      </div>
    </Wrapper>
  );
}
