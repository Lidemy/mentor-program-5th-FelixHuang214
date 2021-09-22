import { useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { getTargetPost } from "../../WebAPI";
import { StateContext } from "../../contexts";
import { getPhotoFromLocalStorage } from "../../utils";

import articlePhoto from "../../images/article-photo";

import AboveInfo from "../../components/AboveInfo";
import BelowInfo from "../../components/BelowInfo";
import CommentSection from "../../components/CommentSection";

const AboveInfoStyle = {
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
};

const BelowInfoStyle = {
  StyledHeartIcon: {
    height: "20px",
  },
  StyledHeartFillIcon: {
    height: "20px",
  },
};

const ArticleWrapper = styled.div`
  min-width: 450px;
  margin: 50px auto;
  border: 1px solid rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
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
        style={AboveInfoStyle}
        headPhotoIndex={headPhotoIndex}
        author={post.user.nickname}
        createdAt={post.createdAt}
      />
      <ArticleBody>
        <ArticleTitle>{post.title}</ArticleTitle>
        <ArticleImage image={articlePhoto[articlePhotoIndex]} />
        <ArticleContent>{post.body}</ArticleContent>
        <BelowInfo style={BelowInfoStyle} />
      </ArticleBody>
    </ArticleWrapper>
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
