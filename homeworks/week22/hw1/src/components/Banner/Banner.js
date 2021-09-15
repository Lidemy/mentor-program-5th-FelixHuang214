import styled from "styled-components";

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 200px;
  margin: 0 auto;
  background: ${(p) => p.color};
`;

const BannerWrapper = styled.div`
  background-image: url("${(p) => p.image}");
  background-size: 100%;
  padding: 80px 0px;
  min-height: 360px;
  box-sizing: border-box;
`;

const MainWords = styled.div`
  font-size: 42px;
`;

const MinorWords = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const Quote = styled.div`
  font-family: Apple Chancery, cursive;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export default function Banner({
  image,
  desc = {
    isDisplay: true,
    descriptionColor: "white",
    mainWords: "WELCOME TO MY BLOG",
    minorWords: "READ ALL ABOUT IT",
    quoteWords: "",
  },
}) {
  const { isDisplay, mainWords, minorWords, quoteWords, descriptionColor } =
    desc;
  console.log(desc);
  return (
    <BannerWrapper image={image}>
      {isDisplay ? (
        <Description color={descriptionColor}>
          <MainWords>{mainWords}</MainWords>
          <MinorWords>{minorWords}</MinorWords>
          <Quote>{quoteWords}</Quote>
        </Description>
      ) : null}
    </BannerWrapper>
  );
}
