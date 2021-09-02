import styled from "styled-components";
import background from "./background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  width: 500px;
  margin: 0px auto;
  position: absolute;
  top: 127px;
  left: 50vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transform: translate(-50%);
`;

export const TodoTitle = styled.div`
  color: white;
  text-align: left;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 5px;
`;

export const InputItem = styled.input`
  box-sizing: border-box;
  width: 80%;
  margin-left: 20px;
  font-size: 20px;
  height: 35px;
  padding: 5px;
  outline: none;
  focus: auto;
  border: 0;
  border-bottom: 0.5px solid #ddd;
`;

export const CircleIcon = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  border: 1px solid #ddd;
  border-radius: 50%;
`;

export const ItemCircleIcon = styled(CircleIcon)`
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.todo.isDone &&
    `
      background: #434343;
      border-color: #434343; 
  `};
`;

export const CheckIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: white;
`;

export const TaskItem = styled.div`
  color: black;
  ${(props) =>
    props.todo.isDone &&
    `
      color: #bbb;
      text-decoration: line-through;
      text-decoration-thickness: 2px;
    `}
  box-sizing: border-box;
  width: 80%;
  margin-left: 20px;
  font-size: 20px;
  height: 35px;
  padding: 5px;
`;

export const TaskItemWrapper = styled(InputItemWrapper)`
  border: none;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  cursor: default;
  &:hover {
    background: #7d7d7d;
    transition: background 0.2s;
    & > div {
      color: white;
    }
    & > div:nth-child(3):before,
    & > div:nth-child(3):after {
      background: white;
    }
  }
`;

export const ContentWrapper = styled.div`
  user-select: none;
  margin-top: 20px;
  box-shadow: 0px 4px 10px 3px #0000001c;
  border-radius: 5px;
  background: white;
  & > div:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  & > div:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export const InfoWrapper = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  color: #7d7d7d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  width: 100%;
  padding: 15px 5px;
`;

export const Count = styled.div`
  font-size: 14px;
  margin-left: 10px;
`;

export const ActiveWrapper = styled.div`
  display: flex;
  & > div {
    cursor: pointer;
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
  & > div + div {
    margin-left: 10px;
  }
`;

export const ActiveItem = styled.div`
  color: ${(props) => props.children === props.display && "#0642ce"};
`;

export const ClearItems = styled.div`
  margin-right: 15px;
  font-size: 12px;
  min-width: 106px;
  text-align: end;
  &:hover {
    cursor: pointer;
    transform: scale(1.05, 1.05);
    color: #434343;
  }
`;

export const DeleteButton = styled.div`
  position: relative;
  margin-left: 15px;
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
  &:before {
    content: "";
    position: absolute;
    height: 1px;
    width: 20px;
    background: #7d7d7d;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 20px;
    background: #7d7d7d;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 350px;
  background-image: url("${background}");
  background-position: 50% 50%;
`;
