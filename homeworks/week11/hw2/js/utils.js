// 碰到元素含有「user-data」及跳出否則繼續對每個內容元素做顯示或隱藏
export function isNextElementHide(startElem, className) {
  // 元素含有「user-data」或下面沒有內容要跳出
  if (startElem.classList.contains(className) ||
      !startElem.nextElementSibling) {
    return false
  }
  startElem.classList.toggle('nodisplay')
  startElem = startElem.nextElementSibling
  return (isNextElementHide(startElem, className))
}

export const template =
  {
    emoji: `
      <span>&#x1F601</span><span>&#x1F602</span><span>&#x1F609</span>
      <span>&#x1F622</span><span>&#x1F623</span><span>&#x1F647</span>
      <span>&#x1F64F</span><span>&#x2764</span><span>&#x2753</span>
      <span>&#x2757</span><span>&#x1F680</span><span>&#x26BD</span>
      <span>&#x26C4</span><span>&#x1F382</span><span>&#x1F3B5</span>
    `
  }
