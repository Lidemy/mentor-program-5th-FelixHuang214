import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { StateContext } from "../../contexts";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../utils";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  position: relative;
  background: white;
`;

const SiteName = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

export default function Header() {
  const { state, dispatch } = useContext(StateContext);
  const history = useHistory();
  const handleLogout = () => {
    setAuthToken("");
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };
  return (
    <HeaderWrapper>
      <SiteName to="/">Blog</SiteName>
      <Navbar isLogin={state.user ? 1 : null} handleLogout={handleLogout} />
    </HeaderWrapper>
  );
}
