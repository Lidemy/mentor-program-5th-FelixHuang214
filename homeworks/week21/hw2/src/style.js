import styled from "styled-components";

export const GameWrapper = styled.div`
  position: relative;
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  margin: 0 auto;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0);
    width: 100%;
    height: 100vh;
    z-index: -1;
    z-index: ${(p) =>
      p.currentState.winner && p.currentState.viewMode === false && "100"};
  }
`;

export const SquareItem = styled.button`
  position: relative;
  background: #9d563e;
  border: 1px solid black;
  ${(p) =>
    p.lastItem &&
    `
    border: 0;
    background: transparent;
  `}
  ${(p) =>
    p.lastRow &&
    `
    border: 0;
    background: transparent;
  `}
  border-radius: 0;
  line-height: 35px;
  height: 35px;
  width: 35px;
  text-align: center;
  margin-right: -1px;
  pointer-events: none;
  &:focus {
    outline: none;
  }
  &:before {
    content: "";
    pointer-events: auto;
    position: absolute;
    height: 20px;
    width: 20px;
    top: 0%;
    left: 0%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: ${(p) => p.state && p.state.player.stoneColor};
    border: ${(p) => p.state && `1px solid black`};
    cursor: pointer;
  }
`;

export const Board = styled.div`
  display: table;
  margin-top: -2px;
`;

export const Game = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 44px;
  margin-top: 34px;
  min-width: ${(p) => p.size * 34}px;
  &:before {
    content: "";
    position: absolute;
    border: 14px solid #5d200d;
    box-shadow: 3px 3px 5px 5px #cccccc;
    border-radius: 4px;
    top: -34px;
    left: -34px;
    width: 100%;
    height: 100%;
    background: #9d563e;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-sizing: border-box;
  height: ${(p) => p.size}px;
  width: 100px;
  min-width: 100px;
  border: 1px solid black;
  background: #aaa;
  padding: 10px;
  & > div {
    margin-bottom: 10px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 5px 0px;
  justify-content: space-between;
  & > div:hover {
    cursor: pointer;
    color: blue;
  }
`;

export const PreviousButton = styled.div`
  color: black;
  &:before {
    content: "\\21B6";
    font-size: 20px;
  }
`;
export const NextButton = styled.div`
  color: black;
  &:after {
    content: "\\21B7";
    font-size: 20px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  text-wrap: wrap;
`;

export const Restart = styled.div`
  text-align: center;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

export const Round = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
  background: #3174e2;
  color: white;
`;
export const StepInfo = styled(Round)``;

export const Player = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:after {
    content: "";
    position: absolute;
    background: ${(p) => p.player.stoneColor};
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`;

export const WinnerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  color: #434343;
  top: 50%;
  left: ${(p) => p.size}px;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  background: rgba(255, 255, 255, 0);
  z-index: -1;
  z-index: ${(p) =>
    p.currentState.winner && p.currentState.viewMode === false && "101"};
  & > div {
    padding: 5px;
    background: rgba(255, 197, 66, 1);
    margin-bottom: 10px;
  }
`;
