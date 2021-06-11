const inputArray = [
  {
    name: 'nickname',
    nameCH: '暱稱'
  },
  {
    name: 'email',
    nameCH: '電子郵件'
  },
  {
    name: 'phone',
    nameCH: '手機號碼'
  },
  {
    name: 'radio',
    nameCH: '報名類型'
  },
  {
    name: 'activity',
    nameCH: '怎麼知道這個活動的'
  },
  {
    name: 'else',
    nameCH: '其它'
  }
]

const reset = document.querySelector('input[name=reset]')
const submit = document.querySelector('.login-form')
submit.addEventListener('submit', getForm)

function getForm(e) {
  for (let i = 0; i < inputArray.length; i++) {
    e.preventDefault()
    const elements = document.querySelectorAll(`input[name=${inputArray[i].name}]`)
    if (inputArray[i].name === 'radio') {
      checkRadio(inputArray[i].name, elements, e)
    } else {
      checkContent(inputArray[i].name, elements[0], e)
    }
  }

  const storage = window.localStorage
  if (storage.length >= 5) {
    // 排除狀況：4 個必要 + 1 個其他
    if (storage.length !== 5 || storage.else === '') {
      let formText = ''

      // 表單資料
      for (let i = 0; i < storage.length; i++) {
        if (storage[inputArray[i].name] !== '') {
          formText += `${inputArray[i].nameCH} : ${storage[inputArray[i].name]}\n`
        }
      }
      alert(formText)
      reset.click()
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
function checkRadio(name, elements, e) {
  const alertBlock = document.querySelector('.list .alert-block')

  // 檢查是否有勾選
  if ([...elements].some((element) => element.checked)) {
    alertBlock.classList.add('alert-block--hidden')
    const content = document.querySelector('input[name=radio]:checked').nextElementSibling.innerText
    window.localStorage.setItem(name, content)
  } else {
    alertBlock.classList.remove('alert-block--hidden')
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
