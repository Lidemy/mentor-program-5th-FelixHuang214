import "./App.css";
import * as S from "./style";
import { useState, useEffect, memo } from "react";

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
          // 棋子的位置，為 1 ~ size * size 的數字
          // 邏輯為第一行為 1 + size*0 ~ size + size*0，第二行為 1 + size*1 ~ size + size*1
          position={squareCount + rowCount}
          lastItem={size.length === index + 1} // 判斷是不是最後一行
          lastRow={lastRow}
        />
      ))}
    </S.Board>
  );
};

const MemoRowBoard = memo(RowBoard);

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
  // 繪製棋盤，為 1 ~ size 的陣列
  const borderGenerateArray = Array.from(setting, (v, i) => i + 1);

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
    // 將狀態寫入 localStorage
    writeStatesToLocalStorage(myStates);
  });

  const getGomokuState = (position) => {
    const step = counter[position];
    const { currentStep } = currentState;
    // 控制畫面上的棋子依照操做 ↶ 及 ↷ 來顯示
    if (step > currentStep) return;
    return gomoku[step - 1];
  };
  // 新增棋子
  const handleAddStone = (position) => {
    // 出現勝利者後不得再下棋
    if (currentState.winner === true) return;
    // 防制按了 ↶ 或 ↷ 再繼續下棋的狀況
    if (currentState.currentStep < gomoku.length)
      return setMessage("按更新才可繼續下棋");
    const currentPosition = position;
    const {
      player,
      player: { stoneColor: currentStoneColor },
    } = currentState;
    let { currentStep } = currentState;
    const isWin = isWinFunc(currentPosition, currentStoneColor);
    // 棋盤上沒有準備放入棋子的位置
    if (!counter[position]) {
      currentStep++;
      // 將下的棋子的位置加入 counter
      setCounter({
        ...counter,
        [position]: currentStep,
      });
      // 將下的棋子的資訊加入 gomoku
      setGomoku([
        ...gomoku,
        {
          ...currentState,
          position,
          currentStep,
        },
      ]);
      // 勝利則將 winner: true 加入 currentState
      if (isWin) {
        return setCurrentState({
          ...currentState,
          currentStep,
          winner: isWin,
        });
      }
      // 每下一次棋都改變 currentState 的狀態，使用者交換，目前步數增加
      setCurrentState({
        ...currentState,
        currentStep,
        player: player.name !== firstPlayer.name ? firstPlayer : secondPlayer,
      });
    }
  };
  // 點擊更新按鈕
  const controlNewState = () => {
    if (currentState.viewMode) return;
    setMessage("");
    const { currentStep } = currentState;
    // 從 gomoku 刪除大於目前步數的棋子
    setGomoku(gomoku.slice(0, currentStep));
    // 從 counter 刪除大於目前步數的棋子
    setCounter(Object.filter(counter, (step) => step <= currentStep));
  };
  // 點擊 ↶
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
  // 點擊 ↷
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
  // 點擊觀看棋譜
  const controlViewMode = () => {
    setCurrentState({
      ...currentState,
      viewMode: true,
    });
  };
  // 點擊重新開始
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
  /*
    判斷每個棋子周遭的狀況 
    size: 直向的棋子
    1: 橫向的棋子
    size + 1: 左上至右下的棋子
    size - 1: 左下至右上的棋子
  */
  const isWinFunc = (currentPosition, currentStoneColor) => {
    const conditions = [size + 1, size - 1, size, 1];
    return conditions.some((condition) => {
      // 計算 testMinus、testPlus 符合條件的棋子總和
      let count = 1;
      const testMinus = (position, distance) => {
        // 防止跨行的判斷
        if (distance === 1 && (position - 1) % size === 0) {
          return false;
        }
        let minusPosition = position - distance;
        // 防止超出棋盤的判斷
        if (minusPosition <= 0 || !counter[minusPosition]) {
          return false;
        }
        const {
          player: { stoneColor: testStoneColor },
        } = getGomokuState(minusPosition);
        // 棋子顏色必須相同
        if (currentStoneColor !== testStoneColor) return false;
        count++;
        // 找不到棋子則回傳 count
        return testMinus(minusPosition, distance) || count;
      };

      const testPlus = (position, distance) => {
        // 防止跨行的判斷
        if (distance === 1 && position % size === 0) {
          return false;
        }
        let plusPosition = position + distance;
        // 防止超出棋盤的判斷
        if (plusPosition > size * size || !counter[plusPosition]) {
          return false;
        }
        const {
          player: { stoneColor: testStoneColor },
        } = getGomokuState(plusPosition);
        // 棋子顏色必須相同
        if (currentStoneColor !== testStoneColor) return false;
        count++;
        // 找不到棋子則回傳 count
        return testPlus(plusPosition, distance) || count;
      };
      testMinus(currentPosition, condition);
      testPlus(currentPosition, condition);
      // 棋子 >= 5 則回傳勝利
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
        {borderGenerateArray.map((_, index) => (
          <MemoRowBoard
            key={index}
            getGomokuState={getGomokuState}
            rowCount={borderGenerateArray.length * index}
            size={borderGenerateArray}
            handleAddStone={handleAddStone}
            lastRow={size === index + 1} // 判斷是不是最後一列
          ></MemoRowBoard>
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
// 依照條件判斷 key 的值來重組 object
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});
