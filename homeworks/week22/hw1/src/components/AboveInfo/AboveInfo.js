import styled from "styled-components";
import headPhoto from "../../images/head-photo";

const Photo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url("${(p) => p.image}");
  background-position: 50% 50%;
  background-size: 150%;
`;

const Author = styled.div``;

const DateTime = styled.div``;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  height: 32px;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  ${ItemsWrapper} {
    ${(p) => p.ItemsWrapper}
  }
  ${Author} {
    ${(p) => p.Author}
  }
  ${DateTime} {
    ${(p) => p.DateTime}
  }
  ${Photo} {
    ${(p) => p.Photo}
  } ;
`;

export default function AboveInfo({
  author,
  createdAt,
  headPhotoIndex,
  style,
}) {
  return (
    <Wrapper {...style}>
      <Photo image={headPhoto[headPhotoIndex]} />
      <ItemsWrapper>
        <Author>{author}</Author>
        <DateTime>{new Date(createdAt).toLocaleString()}</DateTime>
      </ItemsWrapper>
    </Wrapper>
  );
}
