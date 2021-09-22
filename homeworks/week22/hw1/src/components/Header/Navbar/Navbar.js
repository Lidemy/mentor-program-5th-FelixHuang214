import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "../Search";

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Nav = styled(Link)`
  display: flex;
  font-size: 20px;
  color: black;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  cursor: pointer;
  & + & {
    margin-left: 15px;
  }
`;

export default function Navbar({ isLogin, handleLogout }) {
  return (
    <NavbarWrapper>
      <Nav to="/">Home</Nav>
      <Nav to="/about">About</Nav>
      {!isLogin && <Nav to="/login">Sign in</Nav>}
      {!isLogin && <Nav to="/signup">Sign up</Nav>}
      {isLogin && <Nav to="/post">Post</Nav>}
      {isLogin && (
        <Nav to="/#" onClick={handleLogout}>
          Sign out
        </Nav>
      )}
      <Search />
    </NavbarWrapper>
  );
}
