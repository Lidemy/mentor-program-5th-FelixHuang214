import styled from "styled-components";
import { useEffect, useState, useContext } from "react";

import { addPost } from "../../WebAPI";
import { StateContext } from "../../contexts";

const ArticleWrapper = styled.div`
  box-sizing: border-box;
  min-height: calc(100vh - 130px);
  padding: 40px;
`;

const FormWrapper = styled.form`
  position: relative;
  width: 800px;
  font-size: 24px;
  margin: 0 auto;
  background: white;
  border: 12px solid white;
  outline: 1px solid #c6c6c6;
  padding: 0px 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  padding: 20px 14px;
  border: 0;
  outline: 0;
`;

const Button = styled.button`
  padding: 14px 20px;
  font-size: 18px;
  background: grey;
  color: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  color: red;
  bottom: 5%;
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 24px;
  padding: 20px 14px;
  resize: none;
  border: 1px solid #c6c6c6;
`;

export default function AddArticlePage() {
  const { state, dispatch } = useContext(StateContext);
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const data = await addPost(postContent);
        if (data.ok === 0) {
          dispatch({ type: "FETCH_FAILURE", payload: data.message });
          return;
        }
        dispatch({ type: "FETCH_SUCCESS" });
        setPostContent({
          title: "",
          content: "",
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const handleChangeValue = (e) => {
    if (e.target.name === "title") {
      return setPostContent({
        ...postContent,
        title: e.target.value,
      });
    }
    if (e.target.name === "content") {
      return setPostContent({
        ...postContent,
        content: e.target.value,
      });
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "ERROR_MESSAGE_INIT" });
    };
  }, [dispatch]);
  return (
    <ArticleWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <TitleInput
          onChange={handleChangeValue}
          value={postContent.title}
          placeholder="請輸入標題"
          type="text"
          name="title"
        />
        <Textarea
          placeholder="請輸入內容"
          value={postContent.content}
          rows="12"
          onChange={handleChangeValue}
          name="content"
        />
        <ButtonWrapper>
          <Button>送出</Button>
        </ButtonWrapper>
        {state.isError && <ErrorMessage>{state.errorMessage}</ErrorMessage>}
      </FormWrapper>
    </ArticleWrapper>
  );
}
