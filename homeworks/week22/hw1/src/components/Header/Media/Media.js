import styled from "styled-components";
import { Twitter } from "@styled-icons/boxicons-logos";
import { Facebook } from "@styled-icons/boxicons-logos";

const MediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60px;
`;

const StyledTwitter = styled(Twitter)`
  width: 25px;
`;

const StyledFacebook = styled(Facebook)`
  width: 25px;
`;

export default function Media() {
  return (
    <MediaWrapper>
      <StyledFacebook />
      <StyledTwitter />
    </MediaWrapper>
  );
}
