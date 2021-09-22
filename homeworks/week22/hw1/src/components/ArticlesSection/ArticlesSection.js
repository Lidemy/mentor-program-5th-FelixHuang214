import { useContext } from "react";
import styled from "styled-components";

import { StateContext } from "../../contexts";

import PageBlock from "../PageBlock";
import CategorizeBar from "../CategorizeBar";
import Article from "../Article";

const SectionWrapper = styled.div`
  box-sizing: border-box;
  padding-bottom: 20px;
  position: relative;
  max-width: 930px;
  margin: 40px auto;
`;

const SectionContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 2000px;
  margin-top: 40px;
`;

export default function ArticlesSection() {
  const { state } = useContext(StateContext);
  const { posts, currentPage, lastPage } = state;
  return (
    <SectionWrapper>
      <CategorizeBar />
      <SectionContent>
        {posts.map((post) => (
          <Article key={post.id} post={post} />
        ))}
        <PageBlock lastPage={lastPage} currentPage={currentPage} />
      </SectionContent>
    </SectionWrapper>
  );
}
