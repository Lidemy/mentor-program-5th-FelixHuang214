import { useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { getPosts, getAllPosts } from "../../WebAPI";
import { StateContext } from "../../contexts";

import ArticlesSection from "../../components/ArticlesSection";
import Banner from "../../components/Banner";

import { bannerHome } from "../../images/background-photo";

const SizingHeightWhenLoading = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function HomePage() {
  const { state, dispatch } = useContext(StateContext);
  const { currentPage, isLoading } = state;
  let { page } = useParams();
  page = parseInt(page, 10) || 1;
  useEffect(() => {
    if (currentPage !== page) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: page });
      return;
    }
    (async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const data = await getPosts(currentPage);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentPage, dispatch, page]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllPosts();
        const lastPage = Math.ceil(data.length / 6);
        dispatch({ type: "SET_LAST_PAGE", payload: lastPage });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);
  return (
    <>
      <Banner image={bannerHome} />
      {isLoading && <SizingHeightWhenLoading />}
      <ArticlesSection />
    </>
  );
}
