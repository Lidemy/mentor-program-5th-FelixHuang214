import styled from "styled-components";
import { Link } from "react-router-dom";

import { setPhotoToLocalStorage } from "../../utils";

import headPhoto from "../../images/head-photo";
import articlePhoto from "../../images/article-photo";

import AboveInfo from "../AboveInfo";
import BelowInfo from "../BelowInfo";

const ArticlePhoto = styled.div`
  width: 100%;
  height: 200px;
  background-image: url("${(p) => p.image}");
  background-position: 50% 50%;
  background-size: 100%;
  transition: all 0.4s;
  :hover {
    background-size: 110%;
    transition: all 0.4s;
  }
`;

const ArticleTitle = styled.div`
  margin-bottom: 15px;
  font-size: 24px;
  color: black;
  margin-top: 15px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    color: rgb(120, 94, 46);
  }
`;

const ArticleContent = styled.p`
  font-size: 18px;
  color: #737373;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArticleBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  min-height: 260px;
`;

const ArticleWrapper = styled.div`
  box-sizing: border-box;
  width: 450px;
  min-width: 450px;
  margin-bottom: 35px;
  border: 1px solid rgba(0, 0, 0, 0.09);
`;

const ToArticle = styled(Link)``;

export default function Article({ post }) {
  const articlePhotoIndex = setPhotoToLocalStorage(
    post.id,
    "articlePhoto",
    articlePhoto.length
  );
  const headPhotoIndex = setPhotoToLocalStorage(
    post.id,
    "headPhoto",
    headPhoto.length
  );
  return (
    <ArticleWrapper>
      <ToArticle to={`/article/${post.id}`}>
        <ArticlePhoto image={articlePhoto[articlePhotoIndex]} />
      </ToArticle>
      <ArticleBody>
        <div>
          <AboveInfo
            headPhotoIndex={headPhotoIndex}
            author={post.user.nickname}
            createdAt={post.createdAt}
          />
          <ToArticle to={`/article/${post.id}`}>
            <ArticleTitle>{post.title}</ArticleTitle>
          </ToArticle>
          <ArticleContent>{post.body}</ArticleContent>
        </div>
        <BelowInfo />
      </ArticleBody>
    </ArticleWrapper>
  );
}
