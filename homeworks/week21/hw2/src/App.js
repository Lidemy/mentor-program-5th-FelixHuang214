import "./App.css";
import * as S from "./style";
import { useState, useEffect } from "react";

const Square = ({
  handleAddStone,
  position,
  getGomokuState,
  lastItem,
  lastRow,
}) => {
  return (
    <S.SquareItem
      onClick={() => {
        handleAddStone(position);
      }}
      state={getGomokuState(position)}
      lastItem={lastItem}
      lastRow={lastRow}
    />
  );
};

const RowBoard = ({
  handleAddStone,
  rowCount,
  size,
  getGomokuState,
  lastRow,
}) => {
  return (
    <S.Board>
      {size.map((squareCount, index) => (
        <Square
          getGomokuState={getGomokuState}
          key={index}
          handleAddStone={handleAddStone}
          position={squareCount + rowCount}
          lastItem={size.length === index + 1}
          lastRow={lastRow}
        />
      ))}
    </S.Board>
  );
};

const Information = ({ size, currentState, info, events }) => {
  const { controlPreviousButton, controlNewState, controlNextButton, restart } =
    events;
  const { firstPlayer, secondPlayer, gomoku, message } = info;
  return (
    <S.InfoWrapper size={size * 34 + 28}>
      {!currentState.viewMode && (
        <S.Round>{currentState.player.name} 的回合</S.Round>
      )}
      {currentState.viewMode && (
        <S.StepInfo>
          第 {currentState.currentStep}/{gomoku.length} 步
        </S.StepInfo>
      )}
      <S.Player player={firstPlayer}>{firstPlayer.name}</S.Player>
      <S.Player player={secondPlayer}>{secondPlayer.name}</S.Player>
      <S.ButtonWrapper>
        <S.PreviousButton onClick={controlPreviousButton} />
        <div onClick={controlNewState}>
          {currentState.viewMode ? "☺" : "更新"}
        </div>
        <S.NextButton onClick={controlNextButton} />
      </S.ButtonWrapper>
      <S.Restart onClick={restart}>重新開始</S.Restart>
      {message && <S.ErrorMessage>{message}</S.ErrorMessage>}
    </S.InfoWrapper>
  );
};

const Winner = ({ events, currentState, size }) => {
  const { controlViewMode, restart } = events;
  return (
    <S.WinnerWrapper currentState={currentState} size={100 + (size / 2) * 34}>
      <div>恭喜 {currentState.player.name} 勝利</div>
      <div onClick={controlViewMode}>觀看這局棋譜</div>
      <div onClick={restart}>重新開始這局</div>
    </S.WinnerWrapper>
  );
};

function App() {
  const setting = {
    length: 19,
    firstPlayer: {
      name: "Tim",
      senteOrGote: "sente", //先手
      stoneColor: "black",
    },
    secondPlayer: {
      name: "Bob",
      senteOrGote: "gote", //後手
      stoneColor: "white",
    },
  };
  const { length: size } = setting;
  const { firstPlayer, secondPlayer } = setting;
  const borderGenerateByArray = Array.from(setting, (v, i) => i + 1);

  const [counter, setCounter] = useState(() => {
    const counterData = window.localStorage.getItem("counter");
    if (counterData) {
      return {
        ...JSON.parse(counterData),
      };
    }
    return {};
  });
  const [gomoku, setGomoku] = useState(() => {
    const gomokurData = window.localStorage.getItem("gomoku");
    if (gomokurData) {
      return [...JSON.parse(gomokurData)];
    }
    return [];
  });
  const [message, setMessage] = useState(() => {
    const messageData = window.localStorage.getItem("message");
    if (messageData) {
      return JSON.parse(messageData);
    }
    return "";
  });
  const [currentState, setCurrentState] = useState(() => {
    const currentStateData = window.localStorage.getItem("currentState");
    if (currentStateData) {
      return {
        ...JSON.parse(currentStateData),
      };
    }
    return {
      player: firstPlayer,
      currentStep: 0,
      winner: false,
      viewMode: false,
    };
  });

  useEffect(() => {
    const myStates = {
      counter,
      gomoku,
      message,
      currentState,
    };
    writeStatesToLocalStorage(myStates);
  });

  const getGomokuState = (position) => {
    const step = counter[position];
    const { currentStep } = currentState;
    if (step > currentStep) return;
    return gomoku[step - 1];
  };

  const handleAddStone = (position) => {
    if (currentState.winner === true) return;
    if (currentState.currentStep < gomoku.length)
      return setMessage("按更新才可繼續下棋");
    const currentPosition = position;
    const {
      player,
      player: { stoneColor: currentStoneColor },
    } = currentState;
    let { currentStep } = currentState;
    const isWin = isWinFunc(currentPosition, currentStoneColor);

    if (!counter[position]) {
      currentStep++;
      setCounter({
        ...counter,
        [position]: currentStep,
      });

      setGomoku([
        ...gomoku,
        {
          ...currentState,
          position,
          currentStep,
        },
      ]);

      if (isWin) {
        return setCurrentState({
          ...currentState,
          currentStep,
          winner: isWin && true,
        });
      }

      setCurrentState({
        ...currentState,
        currentStep,
        player: player.name !== firstPlayer.name ? firstPlayer : secondPlayer,
        winner: isWin && true,
      });
    }
  };

  const controlNewState = () => {
    if (currentState.viewMode) return;
    setMessage("");
    const { currentStep } = currentState;
    setGomoku(gomoku.slice(0, currentStep));
    setCounter(Object.filter(counter, (step) => step <= currentStep));
  };

  const controlPreviousButton = () => {
    const { player } = currentState;
    let { currentStep } = currentState;
    if (currentStep <= 0) return;
    setCurrentState({
      ...currentState,
      currentStep: currentStep - 1,
      player: player.name !== firstPlayer.name ? firstPlayer : secondPlayer,
    });
  };

  const controlNextButton = () => {
    const { player } = currentState;
    let { currentStep } = currentState;
    if (currentStep >= gomoku.length) return;
    setCurrentState({
      ...currentState,
      currentStep: currentStep + 1,
      player: player.name !== firstPlayer.name ? firstPlayer : secondPlayer,
    });
  };

  const controlViewMode = () => {
    setCurrentState({
      ...currentState,
      viewMode: true,
    });
  };

  const restart = () => {
    setCounter({});
    setGomoku([]);
    setCurrentState({
      player: firstPlayer,
      currentStep: 0,
      winner: false,
      viewMode: false,
    });
    setMessage("");
  };

  const isWinFunc = (currentPosition, currentStoneColor) => {
    const conditions = [size + 1, size - 1, size, 1];
    return conditions.some((condition) => {
      let count = 1;
      const testMinus = (position, distance) => {
        if (distance === 1 && (position - 1) % size === 0) {
          return false;
        }
        let minusPosition = position - distance;
        if (minusPosition <= 0 || !counter[minusPosition]) {
          return false;
        }
        const {
          player: { stoneColor: testStoneColor },
        } = getGomokuState(minusPosition);
        if (currentStoneColor !== testStoneColor) return false;
        count++;
        return testMinus(minusPosition, distance) || count;
      };

      const testPlus = (position, distance) => {
        if (distance === 1 && position % size === 0) {
          return false;
        }
        let plusPosition = position + distance;
        if (plusPosition > size * size || !counter[plusPosition]) {
          return false;
        }
        const {
          player: { stoneColor: testStoneColor },
        } = getGomokuState(plusPosition);
        if (currentStoneColor !== testStoneColor) return false;
        count++;
        return testPlus(plusPosition, distance) || count;
      };
      testMinus(currentPosition, condition);
      testPlus(currentPosition, condition);
      return count >= 5;
    });
  };

  return (
    <S.GameWrapper currentState={currentState}>
      <Winner
        events={{ controlViewMode, restart }}
        currentState={currentState}
        size={size}
      />
      <Information
        events={{
          controlPreviousButton,
          controlNextButton,
          controlNewState,
          restart,
        }}
        info={{ firstPlayer, secondPlayer, gomoku, message }}
        currentState={currentState}
        size={size}
      />
      <S.Game size={size}>
        {borderGenerateByArray.map((_, index) => (
          <RowBoard
            key={index}
            getGomokuState={getGomokuState}
            rowCount={borderGenerateByArray.length * index}
            size={borderGenerateByArray}
            handleAddStone={handleAddStone}
            lastRow={size === index + 1}
          ></RowBoard>
        ))}
      </S.Game>
    </S.GameWrapper>
  );
}

export default App;

const writeStatesToLocalStorage = (states) => {
  Object.keys(states).map((stateName) =>
    window.localStorage.setItem(stateName, JSON.stringify(states[stateName]))
  );
};

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => {
      res[key] = obj[key]
      return res
    }, {});
