import { useEffect, useReducer } from "react";
import styled, { keyframes } from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { StateContext } from "../../contexts";
import { getUser } from "../../WebAPI";
import { dataFetchReducer } from "../../utils";

import Header from "../Header";
import Footer from "../Footer";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import ArticlePage from "../../pages/ArticlePage";
import SignupPage from "../../pages/SignupPage";
import AddArticlePage from "../../pages/AddArticlePage";
import AboutPage from "../../pages/AboutPage";
import { LoaderCircle } from "@styled-icons/boxicons-regular";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
    color: white;
  }

  50% {
    transform: rotate(180deg);
    color: transparent;
  }

  100% {
    transform: rotate(360deg);
    color: white;
  }
`;

const LoadingSection = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: transparent;
  width: 400px;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;

const LoadingTitle = styled.div`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;

const StyledLoadingCircle = styled(LoaderCircle)`
  animation: ${rotate} 2s linear infinite;
  width: 50px;
  z-index: 99999;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingSection>
        <LoadingTitle>Loading</LoadingTitle>
        <StyledLoadingCircle />
      </LoadingSection>
    </LoadingWrapper>
  );
};

const useGetUser = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    user: null,
    errorMessage: null,
    posts: [],
    targetPost: [],
    categorizeContent: [
      {
        name: "All Posts",
        lastPage: null,
        query: {
          page: 1,
        },
      },
    ],
    currentPage: 1,
    lastPage: null,
  });

  useEffect(() => {
    (async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await getUser();
        if (result.ok === 1) {
          dispatch({ type: "LOGIN", payload: result.data });
        }
        if (result.ok === 0) {
          dispatch({ type: "NO_LOGIN" });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return [state, dispatch];
};

export default function App() {
  const [state, dispatch] = useGetUser();
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {state.isLoading && <Loading />}
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/home", "/home/:page"]}>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/post">
            <AddArticlePage />
          </Route>
          <Route path="/article/:id">
            <ArticlePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </StateContext.Provider>
  );
}
