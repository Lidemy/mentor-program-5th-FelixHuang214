import { useEffect, useRef } from "react";
import { style as S, defaultData as DATA } from "./useStaticData";
import { useInputValue, useFormState, useErrorMessage } from "./useCustomHooks";

const SubmitData = ({ approach, events }) => {
  const { controlUpdateForm } = events;
  const { getValueFromInputValue } = approach;
  return (
    <S.FormInfoWrapper>
      <S.DataList>
        {DATA.formData.map(
          (data) =>
            getValueFromInputValue(data.name) && (
              <S.ListItem key={data.name}>
                {data.title} : {getValueFromInputValue(data.name)}
              </S.ListItem>
            )
        )}
        <S.ButtonWrapper>
          <S.Button onClick={controlUpdateForm}>修正</S.Button>
          <S.Button>確認</S.Button>
        </S.ButtonWrapper>
      </S.DataList>
    </S.FormInfoWrapper>
  );
};

const Radio = ({ info, handleInputValue, value, radioRef }) => {
  const { radioContents, name } = info;
  return (
    <S.ListWrapper>
      {radioContents.map((content, index) => (
        <label key={index}>
          <input
            key={index}
            onClick={(e) => {
              handleInputValue(e, name);
            }}
            type="radio"
            name="radio"
            ref={content === value ? radioRef : null}
            value={content}
          />
          {content}
        </label>
      ))}
    </S.ListWrapper>
  );
};

const Section = ({ info, events, state, approaches, radioRef }) => {
  const { handleInputValue } = events;
  const { type, title, name, description, necessary } = info;
  const { getErrorMessageFromMessageState, getValueFromInputValue } =
    approaches;
  return (
    <S.SectionWrapper>
      <S.SectionTitle necessary={necessary}>{title}</S.SectionTitle>
      {description && (
        <S.SectionDescription>{description}</S.SectionDescription>
      )}
      {type === "text" && (
        <S.Input
          state={state}
          value={getValueFromInputValue(name)}
          placeholder={"請輸入您的" + title}
          onChange={(e) => {
            handleInputValue(e, name);
          }}
        />
      )}
      {type === "radio" && (
        <Radio
          handleInputValue={handleInputValue}
          value={getValueFromInputValue(name)}
          info={info}
          radioRef={radioRef}
        />
      )}
      {getErrorMessageFromMessageState(name) && (
        <S.SectionErrorMessage>
          {getErrorMessageFromMessageState(name)}
        </S.SectionErrorMessage>
      )}
    </S.SectionWrapper>
  );
};

const Info = () => {
  return (
    <S.InfoWrapper>
      <S.InfoTitle>新拖延運動報名表單</S.InfoTitle>
      <S.InfoContent>
        <p>活動日期：2020/12/10 ~ 2020/12/11</p>
        <p>活動地點：台北市大安區新生南路二段1號</p>
      </S.InfoContent>
      <p>* 必填</p>
    </S.InfoWrapper>
  );
};

const Footer = () => {
  return (
    <S.FooterWrapper>
      <p>© 2020 © Copyright. All rights Reserved.</p>
    </S.FooterWrapper>
  );
};

function App() {
  const { inputValue, handleInputValue, getValueFromInputValue } =
    useInputValue();

  const { formState, setFormState, controlUpdateForm } = useFormState();

  const {
    message,
    handleInputConditions,
    handleSubmitConditions,
    getErrorMessageFromMessageState,
  } = useErrorMessage(setFormState, getValueFromInputValue);

  const radioRef = useRef(null);

  useEffect(() => {
    // 從 localStorage 判斷有沒有值，有的話把加入屬性 checked="true"
    radioRef.current && radioRef.current.setAttribute("checked", true);

    const writeValueToLocalStorage = () => {
      window.localStorage.setItem(
        "localInputValue",
        JSON.stringify(inputValue)
      );
      window.localStorage.setItem("localMessage", JSON.stringify(message));
      window.localStorage.setItem("localFormState", JSON.stringify(formState));
    };

    writeValueToLocalStorage();
    if (formState.isSubmit === true) {
      writeValueToLocalStorage();
    }
  }, [inputValue, message, formState]);

  return (
    <S.Wrapper onClick={handleInputConditions}>
      {formState.isSubmit && (
        <SubmitData
          events={{ controlUpdateForm }}
          state={formState}
          approach={{ getValueFromInputValue }}
        />
      )}
      <S.FormWrapper>
        <Info />
        {DATA.formData.map((data, index) => (
          <Section
            key={index}
            state={formState}
            radioRef={radioRef}
            approaches={{
              getErrorMessageFromMessageState,
              getValueFromInputValue,
            }}
            info={{ ...data }}
            events={{ handleInputValue }}
            radioRef={radioRef}
          />
        ))}
        <S.Button onClick={handleSubmitConditions}>送出</S.Button>
      </S.FormWrapper>
      <Footer />
    </S.Wrapper>
  );
}

export default App;
