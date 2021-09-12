import styled from "styled-components";

export const InfoWrapper = styled.div`
  margin-bottom: 40px;
  & > p:nth-child(3) {
    color: red;
    color: #e74149;
    font-size: 16px;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 2em;
`;

export const InfoTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 0px 0px 35px 0px;
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 2px 0px;
  width: 60%;
  margin-top: 10px;
  &:placeholder-shown {
    ${(p) =>
      p.state.isSubmit &&
      `
      color: transparent;
    `}
  }
`;

export const FormWrapper = styled.div`
  background: white;
  margin: 0 auto;
  padding: 54px 150px 35px 42px;
  max-width: 645px;
  margin-top: 129px;
  box-shadow: 1.8px 2.4px 5px 0 #0000004c;
  border-top: solid 10px #fad312;
`;

export const SectionWrapper = styled.div`
  margin-bottom: 40px;
  min-height: 122px;
`;

export const SectionTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
  ${(p) =>
    p.necessary &&
    `
    &:before {
      content: ' *';
      color: red;
    }
  `}
`;
export const SectionErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 12px;
  font-weight: bold;
  max-width: 60%;
`;

export const SectionDescription = styled.div`
  margin-top: 5px;
  color: #3f51b5;
  font-size: 12px;
  font-weight: bold;
`;

export const ListWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 14px;
  flex-direction: column;
  & > label {
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  background: #fad312;
  padding: 10px;
  color: black;
  font-size: 15px;
  border: none;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    background: #f4ce11;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid yellow;
  height: 40px;
  width: 100%;
  background: black;
  color: #999999;
  font-size: 14px;
  margin-top: 40px;
`;

export const Wrapper = styled.div``;

export const FormInfoWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0);
`;

export const DataList = styled.ul`
  position: absolute;
  box-sizing: border-box;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: #f2f2f2;
  border: 1px solid transparent;
  box-shadow: 2px 4px 5px 3px #bbb;
  list-style: none;
`;

export const ListItem = styled.li`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  max-width: 358px;
  overflow-wrap: break-word;
  color: black;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 20px;
  & > button:first-child {
    margin-right: 5px;
  }
`;
