const names = ['nickname', 'email', 'phone', 'list', 'activity', 'else']
const namesCH = ['暱稱', '電子郵件', '手機號碼', '報名類型', '怎麼知道這個活動的', '其他']
const submit = document.querySelector('input[type=submit]')
submit.addEventListener('click', getForm)

function getForm(e) {
  for (let i = 0; i < names.length; i++) {
    const elements = document.querySelectorAll(`input[name=${names[i]}]`)
    if (names[i] === 'list') {
      checkList(names[i], elements, e)
    } else {
      checkContent(names[i], elements[0], e)
    }
  }

  const storage = window.localStorage

  if (storage.length >= 5) {
    // 排除狀況：4 個必要 + 1 個其他
    if (storage.length !== 5 || storage.else === undefined) {
      let formText = ''

      // 表單資料
      for (let i = 0; i < storage.length; i++) {
        if (storage[names[i]] !== '') {
          formText += `${namesCH[i]} : ${storage[names[i]]}\n`
        }
      }
      alert(formText)
    }
  }
  localStorage.clear()
}

// 檢查欄位內容是否為空的或是預設文字
function checkContent(name, element, e) {
  const content = element.value
  const alertBlock = element.closest('.questions').querySelector('.alert-block')

  if (content === '' && name !== 'else') {
    alertBlock.classList.remove('alert-block--hidden')
    e.preventDefault()
  } else {
    if (name === 'email' && !isEmail(content)) {
      alertBlock.querySelector('span').innerText = '請輸入正確的電子郵件\n(例如：example＠example.com)'
      alertBlock.classList.remove('alert-block--hidden')
      return false
    }

    if (name === 'phone' && !isPhone(content)) {
      alertBlock.querySelector('span').innerText = '請輸入正確的電話\n(例如：0912345678)'
      alertBlock.classList.remove('alert-block--hidden')
      return false
    }

    if (name !== 'else') {
      alertBlock.classList.add('alert-block--hidden')
    }

    window.localStorage.setItem(name, content)
  }
}

// 判斷報名類型是否勾選
function checkList(name, elements, e) {
  // 用來判斷是否有勾選，1 為勾選，0 未勾選
  let count = 0

  // 依序檢查是否有勾選
  for (let i = 0; i < elements.length; i++) {
    const content = elements[i].nextElementSibling.innerText
    const alertBlock = elements[i].closest('.list').querySelector('.alert-block')
    if (elements[i].checked) count++
    if (count) {
      alertBlock.classList.add('alert-block--hidden')
      window.localStorage.setItem(name, content)

      // 確認有勾選即跳出函式
      return

    // 判斷到最後一項在顯示提示
    } else if (i === elements.length - 1) {
      alertBlock.classList.remove('alert-block--hidden')
      e.preventDefault()
    }
  }
}

function isEmail(strEmail) {
  if (strEmail.search(/\w@[A-Za-z0-9.]/) !== -1) {
    return true
  }
}

function isPhone(strPhone) {
  if (strPhone.search(/^(09)\d{8}$/) !== -1) {
    return true
  }
}
