import styled from "styled-components";

import Banner from "../../components/Banner";
import { bannerAbout } from "../../images/background-photo";

const quotes = [
  "Sometimes it is the people who no one imagines anything of who do the things that no one can imagine.",
  "Those who don’t understand you cheer at your success, those who do are saddened by the price you paid.",
  "Do you know why people like violence?It is because it feels good.Humans find violence deeply satisfying, but remove the satisfaction,the acts becomes hollow.",
  "But if you choose to stay, remember you chose to be here. What happens from this moment forwards is not my responsibility. It’s yours.",
];

const MiddleWrapper = styled.div`
  box-sizing: border-box;
  min-height: calc(100vh - 130px);
  padding: 40px;
`;

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  width: 800px;
  height: 500px;
  margin: 0 auto;
`;

const AboutTitle = styled.div`
  font-size: 36px;
  font-family: Arial, sans-serif;
`;

const AboutMainWords = styled.div`
  margin-top: 40px;
  text-align: center;
  font-family: Apple Chancery, cursive;
`;

export default function AboutPage() {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const descOptions = {
    isDisplay: true,
    quoteWords: quotes[randomNumber],
  };
  return (
    <>
      <Banner image={bannerAbout} desc={descOptions} />
      <MiddleWrapper>
        <AboutWrapper>
          <AboutTitle>About Me</AboutTitle>
          <AboutMainWords>我也不知道要寫什麼～～</AboutMainWords>
        </AboutWrapper>
      </MiddleWrapper>
    </>
  );
}
