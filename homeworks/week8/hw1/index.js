const request = new XMLHttpRequest()
const resultInfo = document.querySelector('.banner').querySelector('.wrap')
const form = document.querySelector('.form')
// const banner = document.querySelector('.banner')
const bannerImg = document.querySelector('.banner__img')

// 取得伺服器資料
document.querySelector('.btn').addEventListener('click', getData)

// 取得伺服器資料後跳至結果頁面
request.addEventListener('load', () => {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText
    let resultData = {}
    try {
      resultData = JSON.parse(response)
    } catch (err) {
      console.log('Error! 資料解析錯誤！')
      console.log('ERROR:', err)
      return
    }
    renderNewPage(resultData.prize)
  } else {
    alert('系統不穩定，請再試一次')
  }
})

request.onerror = function(err) {
  console.log('Error! 呼叫不到該網站！')
  console.log('ERROR:', err)
}

// 跳回抽獎頁面
document.querySelector('.result-btn')
  .addEventListener('click', () => {
    resultInfo.classList.add('block-hide')
    // banner.style.background = 'url(bg.jpg) center/cover no-repeat'
    form.classList.remove('block-hide')
    bannerImg.classList.remove('first')
    bannerImg.classList.remove('second')
    bannerImg.classList.remove('third')
    bannerImg.classList.remove('none')
  })

// 取得伺服器資料
function getData() {
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
  request.send()
}

//  抽獎時顯示或隱藏頁面
function renderNewPage(prize) {
  //  判斷 pirze 是否錯誤
  if (!prize) {
    alert('系統不穩定，請再試一次')
    return false
  }
  newHtml(prize)
}

// 依照 prize 去修改顯示文字及背景圖片
function newHtml(prize) {
  form.classList.add('block-hide')
  resultInfo.classList.remove('block-hide')
  const title = document.querySelector('.result-title')

  switch (prize) {
    case 'FIRST':
      title.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'
      bannerImg.classList.add('first')
      // title.style.color = 'black'
      // banner.style.background = 'url(bg_first.jpg) center/cover no-repeat'
      break

    case 'SECOND':
      title.innerText = '二獎！90 吋電視一台！'
      bannerImg.classList.add('second')
      // title.style.color = 'white'
      // banner.style.background = 'url(bg_second.jpg) center/cover no-repeat'
      break

    case 'THIRD':
      title.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
      bannerImg.classList.add('third')
      // title.style.color = 'white'
      // banner.style.background = 'url(bg_third.jpg) center/cover no-repeat'
      break

    case 'NONE':
      title.innerText = '銘謝惠顧'
      bannerImg.classList.add('none')
      // title.style.color = 'white'
      // banner.style.background = 'black'
      break
  }
}
