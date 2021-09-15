import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { getTargetPost } from "../../WebAPI";
import { StateContext } from "../../contexts";
import { getPhotoFromLocalStorage } from "../../utils";

import articlePhoto from "../../images/article-photo";
import AboveInfo from "../../components/AboveInfo";
import BelowInfo from "../../components/BelowInfo";

import { wolf } from "../../images/head-photo";
import { EmojiSmile as EmojiSmileIcon } from "@styled-icons/bootstrap";

AboveInfo.defaultProps = {
  theme: {
    ItemsWrapper: {
      "flex-direction": "row",
      "align-items": "center",
      height: "32px",
      "margin-left": "10px",
    },
    Photo: {
      width: "50px",
      height: "50px",
    },
    DateTime: {
      "margin-left": "10px",
      "font-size": "20px",
    },
    Author: {
      "font-size": "22px",
    },
  },
};

BelowInfo.defaultProps = {
  theme: {
    StyledHeartIcon: {
      height: "20px",
    },
    StyledHeartFillIcon: {
      height: "20px",
    },
  },
};

const ArticleWrapper = styled.div`
  box-sizing: border-box;
  min-width: 450px;
  margin-bottom: 35px;
  margin: 50px auto;
  border: 1px solid rgba(0, 0, 0, 0.09);
  width: 1000px;
  padding: 60px 100px;
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 400px;
  ${(p) => `
    background-image: url("${p.image}");
  `}
  background-position: 50% 50%;
  background-size: 100%;
  margin: 20px 0px;
`;

const ArticleTitle = styled.div`
  font-size: 27px;
  margin-top: 15px;
  max-width: 100%;
  word-break: break-word;
`;

const ArticleContent = styled.p`
  font-size: 18px;
  margin-top: 15px;
  color: black;
  padding: 0px 0px 60px 0px;
  max-width: 100%;
  word-break: break-word;
`;

const ArticleBody = styled.div`
  box-sizing: border-box;
`;

const Article = ({ post }) => {
  const articlePhotoIndex = getPhotoFromLocalStorage(post.id, "articlePhoto");
  const headPhotoIndex = getPhotoFromLocalStorage(post.id, "headPhoto");
  return (
    <ArticleWrapper>
      <AboveInfo
        headPhotoIndex={headPhotoIndex}
        author={post.user.nickname}
        createdAt={post.createdAt}
      />
      <ArticleBody>
        <ArticleTitle>{post.title}</ArticleTitle>
        <ArticleImage image={articlePhoto[articlePhotoIndex]} />
        <ArticleContent>{post.body}</ArticleContent>
        <BelowInfo />
      </ArticleBody>
    </ArticleWrapper>
  );
};

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

const CommentSection = () => {
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
};

const SizingHeightWhenLoading = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function ArticlePage() {
  const { state, dispatch } = useContext(StateContext);
  const { targetPost, isLoading } = state;
  let { id } = useParams();
  id = parseInt(id, 10);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (targetPost.length >= 1 && targetPost[0].id === id) {
      return;
    }
    (async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const data = await getTargetPost(id);
        dispatch({ type: "FETCH_TARGET_POST_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id, dispatch, targetPost]);
  return (
    <>
      {isLoading ? (
        <SizingHeightWhenLoading />
      ) : (
        targetPost.map((post) => <Article key={post.id} post={post} />)
      )}
      {!isLoading && <CommentSection />}
    </>
  );
}
