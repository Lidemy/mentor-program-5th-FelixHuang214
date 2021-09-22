import { useState } from "react";
import styled from "styled-components";

import { EmojiSmile as EmojiSmileIcon } from "@styled-icons/bootstrap";
import { wolf } from "../../images/head-photo";

const CommentWrapper = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 40px;
  width: 1000px;
  padding: 40px 100px;
  border: 1px solid rgba(0, 0, 0, 0.09);
`;

const CommentTitle = styled.div`
  font-size: 22px;
  margin-bottom: 18px;
`;

const CommentBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0px;
  border-top: 1px solid #9e9e9e;
`;

const CommentBlockWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid #9e9e9e;
  width: 93%;
  font-size: 18px;
  padding: 14px 20px;
`;

const Comment = styled.textarea`
  width: 100%;
  resize: none;
  background: transparent;
  border: 0;
  ::placeholder {
    color: #9e9e9e;
  }
`;

const CommentBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background: transparent;
  color: #795548;
  :hover {
    cursor: pointer;
  }
  &:first-child {
    margin-right: 10px;
  }
`;

const StyledEmojiSmileIcon = styled(EmojiSmileIcon)`
  width: 20px;
`;

const CommentBlock = () => {
  return (
    <CommentBlockWrapper>
      <Comment placeholder="撰寫留言……" />
      <CommentBar>
        <div>
          <StyledEmojiSmileIcon />
        </div>
        <div>
          <Button>取消</Button>
          <Button>發佈</Button>
        </div>
      </CommentBar>
    </CommentBlockWrapper>
  );
};

const CommentPreview = styled.div`
  box-sizing: border-box;
  border: 1px solid #9e9e9e;
  width: 93%;
  font-size: 18px;
  padding: 20px;
  :hover {
    cursor: pointer;
    border-color: black;
  }
`;

const CommentPhoto = styled.div`
  position: relative;
  top: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("${wolf}");
  background-position: 50% 50%;
  background-size: 200%;
`;

export default function CommentSection() {
  const [commentState, setCommentState] = useState(false);

  const handleClickPreview = () => {
    setCommentState(true);
  };

  return (
    <CommentWrapper>
      <CommentTitle>留言</CommentTitle>
      <CommentBody>
        <CommentPhoto />
        {commentState ? (
          <CommentBlock />
        ) : (
          <CommentPreview onClick={handleClickPreview}>
            撰寫留言……
          </CommentPreview>
        )}
      </CommentBody>
    </CommentWrapper>
  );
}
