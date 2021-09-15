import styled from "styled-components";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
`;

const PageNumber = styled(Link)`
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 25px;
  height: 30px;
  border: 1px solid #9e9e9e;
  font-size: 20px;
  color: #494949;
  & + & {
    margin-left: 5px;
  }
  :hover {
    background: #7c8397;
    color: white;
  }
  ${(p) =>
    p.pagenow &&
    `
    background: #7c8397;
    color: white;
  `}
`;

const Ellipsis = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 30px;
  font-size: 18px;
`;

export default function PageBlock({ lastPage, currentPage }) {
  let middlePage = [2, 3, 4, 5];
  // 中間頁數
  if (lastPage - currentPage > 3 && currentPage > 2) {
    middlePage = Array.from({ length: 4 }, (v, i) => i + currentPage - 1);
  }
  // 接近末頁用 lastPage 往前算 4 頁
  if (lastPage - currentPage <= 3 && lastPage - 1 >= 4) {
    middlePage = Array.from({ length: 4 }, (v, i) => i + lastPage - 4);
  }
  // 頁數 < 5
  if (lastPage - 1 <= 4) {
    middlePage = Array.from({ length: lastPage - 2 }, (v, i) => i + 2).filter(
      (page) => page >= 0
    );
  }

  return (
    <PageWrapper>
      <PageNumber pagenow={currentPage === 1 ? 1 : 0} key={1} to={`/home/1`}>
        {1}
      </PageNumber>
      {currentPage > 3 && lastPage > 6 && <Ellipsis>...</Ellipsis>}
      {middlePage.map((page) => (
        <PageNumber
          pagenow={page === currentPage ? 1 : 0}
          key={page}
          to={`/home/${page}`}
        >
          {page}
        </PageNumber>
      ))}
      {lastPage - currentPage >= 4 && lastPage > 6 && <Ellipsis>...</Ellipsis>}

      {lastPage !== 1 && (
        <PageNumber
          pagenow={lastPage === currentPage ? 1 : 0}
          key={lastPage}
          to={`/home/${lastPage}`}
        >
          {lastPage}
        </PageNumber>
      )}
    </PageWrapper>
  );
}
