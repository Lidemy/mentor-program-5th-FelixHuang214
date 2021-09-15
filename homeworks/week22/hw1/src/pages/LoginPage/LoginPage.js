import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { login, getUser } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { StateContext } from "../../contexts";

import { User as UserIcon } from "@styled-icons/boxicons-solid";
import { Lock as LockIcon } from "@styled-icons/boxicons-solid";
import { User as UserIconNoColor } from "@styled-icons/boxicons-regular";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 900px;
  width: 100%;
  background: rgb(30, 163, 164);
  background: linear-gradient(
    270deg,
    rgba(30, 163, 164, 1) 0%,
    rgba(6, 112, 112, 0.7881481481481482) 50%,
    rgba(57, 116, 158, 0.84) 100%
  );
`;

const LoginWrapper = styled.form`
  position: relative;
  box-sizing: border-box;
  width: 500px;
  height: 450px;
  padding: 40px 50px;
  margin: 0 auto;
  border: 0;
  background: #005991ad;
  border-radius: 45px;
  box-shadow: inset 0px 0px 3px 2px #ffffff96;
`;

const HeadIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background: #093165;
  border: 0;
  border-radius: 50%;
`;

const LoginHeadIcon = styled(UserIconNoColor)`
  width: 100px;
  color: white;
`;

const LoginBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0;
  width: 100%;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  background: #1262cc;
  border: 0;
  & + & {
    margin-top: 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
`;

const StyledUserIcon = styled(UserIcon)`
  width: 35px;
`;

const StyledLockIcon = styled(LockIcon)`
  width: 35px;
`;
const Input = styled.input`
  box-sizing: border-box;
  flex: 1;
  font-size: 24px;
  font-family: sans-serif;
  letter-spacing: 1px;
  color: white;
  padding: 0px 15px;
  background: #66666699;
  border: 0;
  ::placeholder {
    color: #c9c9c9;
    letter-spacing: 2.2px;
  }
`;

const UsernameInput = ({ desc, value, event }) => {
  const { handleChangeValue } = event;
  return (
    <InputWrapper>
      <IconWrapper>
        <StyledUserIcon />
      </IconWrapper>
      <Input
        onChange={handleChangeValue}
        type="text"
        placeholder={desc}
        value={value}
        name="username"
      />
    </InputWrapper>
  );
};

const PasswordInput = ({ desc, value, event }) => {
  const { handleChangeValue } = event;
  return (
    <InputWrapper>
      <IconWrapper>
        <StyledLockIcon />
      </IconWrapper>
      <Input
        onChange={handleChangeValue}
        type="password"
        placeholder={desc}
        value={value}
        name="password"
      />
    </InputWrapper>
  );
};

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 1px;
  position: relative;
  top: 40px;
  width: 100%;
  height: 70px;
  background: rgb(219, 219, 219);
  background: linear-gradient(
    180deg,
    rgba(219, 219, 219, 1) 0%,
    rgba(0, 104, 100, 0.7659259259259259) 23%,
    rgba(0, 128, 145, 0.837037037037037) 74%
  );
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  :hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 75%;
  font-size: 16px;
  color: red;
`;

export default function LoginPage() {
  const { state, dispatch } = useContext(StateContext);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const history = useHistory();
  const handleChangeValue = (e) => {
    if (e.target.name === "username") {
      setUsernameValue(e.target.value);
    }
    if (e.target.name === "password") {
      setPasswordValue(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValue || !passwordValue) {
      dispatch({ type: "LOGIN_FAILURE", payload: "輸入內容不可空白" });
      return;
    }
    try {
      const data = await login({
        username: usernameValue,
        password: passwordValue,
      });
      if (!data.ok) {
        dispatch({ type: "LOGIN_FAILURE", payload: "帳號或密碼錯誤" });
        return;
      }
      setAuthToken(data.token);
      const user = await getUser();
      dispatch({ type: "LOGIN", payload: user.data });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "ERROR_MESSAGE_INIT" });
    };
  }, [dispatch]);
  return (
    <Root>
      <LoginWrapper onSubmit={handleSubmit}>
        <HeadIconWrapper>
          <LoginHeadIcon />
        </HeadIconWrapper>
        <LoginBody>
          <UsernameInput
            event={{ handleChangeValue }}
            value={usernameValue}
            desc="Email ID"
          />
          <PasswordInput
            event={{ handleChangeValue }}
            value={passwordValue}
            desc="Password"
          />
          {state.errorMessage && (
            <ErrorMessage>{state.errorMessage}</ErrorMessage>
          )}
        </LoginBody>
        <LoginButton type="submit">LOGIN</LoginButton>
      </LoginWrapper>
    </Root>
  );
}
