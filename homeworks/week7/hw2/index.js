const names = ['nickname', 'email', 'phone', 'list', 'activity', 'else']
const namesCH = ['暱稱', '電子郵件', '手機號碼', '報名類型', '怎麼知道這個活動的', '其他']
const submit = document.querySelector('input[type=submit]')
submit.addEventListener('click', getForm)

function getForm(e) {
  localStorage.clear()
  for (let i = 0; i < names.length; i++) {
    const elements = document.querySelectorAll(`input[name=${names[i]}]`)
    if (names[i] === 'list') {
      checkList(names[i], elements)
    } else {
      checkContent(names[i], elements[0])
    }
  }
  const storage = window.localStorage
  if (storage.length >= 5) {
    // 排除狀況：4 個必要 + 1 個其他
    if (storage.length !== 5 || storage.else === undefined) {
      let formText = ''
      for (let i = 0; i < storage.length; i++) {
        if (storage[names[i]] !== '') {
          formText += `${namesCH[i]} : ${storage[names[i]]}\n`
        }
      }
      alert(formText)
      return true
    }
  }

  // 檢查欄位內容是否為空的或是預設文字
  function checkContent(name, element) {
    const content = element.value
    const alertBlock = element.closest('.questions').querySelector('.alert-block')
    if (content === '') {
      if (name !== 'else') {
        alertBlock.classList.remove('alert-block--hidden')
        e.preventDefault()
      }
    } else {
      if (name !== 'else') {
        alertBlock.classList.add('alert-block--hidden')
      }
      window.localStorage.setItem(name, content)
    }
  }

  // 判斷報名類型是否勾選
  function checkList(name, elements) {
    // 用來判斷是否有勾選，1 為勾選，0 未勾選
    let count = 0

    // 依序檢查是否有勾選
    for (let i = 0; i < elements.length; i++) {
      const content = elements[i].nextElementSibling.innerText
      const alertBlock = elements[i].closest('.list').querySelector('.alert-block')
      if (elements[i].checked) count++
      if (count) {
        if (!alertBlock.classList.contains('alert-block--hidden')) {
          alertBlock.classList.toggle('alert-block--hidden')
        }
        window.localStorage.setItem(name, content)

        // 確認有勾選即跳出函式
        return
      } else if (i === elements.length - 1) {
        if (alertBlock.classList.contains('alert-block--hidden')) {
          alertBlock.classList.toggle('alert-block--hidden')
        }
        e.preventDefault()
      }
    }
  }
}
