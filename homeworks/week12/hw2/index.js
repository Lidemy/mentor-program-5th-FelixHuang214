/* eslint-env jquery */
/* eslint-disable arrow-body-style, no-useless-escape, camelcase */
const html = `
  <div class="accordion origin-show unfinish" id="accordionExample">
    <div class="bg-finish-cover"></div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <div class="check-box">
          <div class="check-done"></div>
        </div>
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c$id" aria-expanded="true" aria-controls="collapseOne">
          <span class="btn btn-warning btn-sm ms-4 me-2 note-type">$note-type</span>
          <span class="note-title">$note-title</span>
        </button>
      </h2>
      <div id="c$id" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <textarea class="note visiable"></textarea>
          <p class="note-words">請輸入內容</p>
        </div>
        <div class="card-btn mt-2">
          <button type="button" class="btn btn-secondary btn-sm btn-edit hide">編輯</button>
          <button type="button" class="btn btn-danger btn-sm btn-per-del hide" data-bs-toggle="modal" data-bs-target="#c$iddle">刪除</button>
          <button type="button" class="btn btn-secondary btn-sm btn-confirm show">確定</button>
        </div>
        <div class="modal fade" id="c$iddle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                你即將刪除該項目！
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary btn-per-del__confirm" data-bs-dismiss="modal">確定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`
// 控制內容的顯示方式
let contentStatus = 'default'
// 替代字元
const escape = (toOutput) => {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}
// 顯示所選內容
const showContentStatus = (status) => {
  const items = $('.accordion')
  switch (status) {
    case 'done':
      items.addClass(function() {
        if ($(this).hasClass('finish')) return 'origin-show'
      })
      items.removeClass(function() {
        if ($(this).hasClass('unfinish')) return 'origin-show'
      })
      break
    case 'undone':
      items.addClass(function() {
        if ($(this).hasClass('unfinish')) return 'origin-show'
      })
      items.removeClass(function() {
        if ($(this).hasClass('finish')) return 'origin-show'
      })
      break
    default:
      items.addClass('origin-show')
  }
}
// 刪除所選內容
const removeChooseContent = (status) => {
  const items = $('.accordion')
  switch (status) {
    case 'done':
      items.filter('.finish').remove()
      break
    case 'undone':
      items.filter('.unfinish').remove()
      break
    default:
      items.remove()
  }
}
// 取得網頁 query string (截取至網路)
const queryString = () => {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  const queryString = {}
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    // If first entry with this name
    if (typeof queryString[pair[0]] === 'undefined') {
      /* eslint-disable-next-line */
      queryString[pair[0]] = pair[1]
    // If second entry with this name
    } else if (typeof queryString[pair[0]] === 'string') {
      const arr = [queryString[pair[0]], pair[1]]
      queryString[pair[0]] = arr
    // If third or later entry with this name
    } else {
      queryString[pair[0]].push(pair[1])
    }
  }
  return queryString
}
// 儲存狀態
const saveTodoStatus = () => {
  const accordions = $('.accordion')
  const todoStatus = {
    inputTitleVal: $('.input-note-title').val(),
    inputTypeVal: $('.input-note-type').text(),
    todoShowMode: contentStatus,
    notes: { }
  }
  accordions.filter((index, ele) => {
    const obj = {}
    obj.finish = $(ele).hasClass('finish')
    obj.title = $(ele).find('.note-title').text()
    obj.type = $(ele).find('.note-type').text()
    obj.content = $(ele).find('.note-words').text()
    obj.collapsed = $(ele).find('.accordion-button').hasClass('collapsed')
    todoStatus.notes[index] = obj
    return true
  })
  return JSON.stringify(todoStatus)
}
// 將狀態呈現成網頁
function parseJsonFromServer(obj) {
  const container = $('.container')
  const contents = $('.contents')
  contents.html('')
  // 儲存未送出的文字
  container.find('.input-note-title').val(obj.inputTitleVal)
  container.find('.input-note-type').text(obj.inputTypeVal)
  container.find('.form-select').val(obj.todoShowMode)
  // 項目的顯示方式
  contentStatus = obj.todoShowMode
  for (const [key, value] of Object.entries(obj.notes)) {
    const newHtml = html
      .replace(/\$id/g, key)
      .replace(/\$note-title/, value.title)
      .replace(/\$note-type/, value.title)
      .replace('請輸入內容', value.content)
    contents.append(newHtml)
    const accordion = $('.contents').find('>:last-child')
    // 項目是否已完成
    if (value.finish) {
      accordion.addClass('finish')
      accordion.removeClass('unfinish')
      accordion.find('.accordion-button').addClass('collapsed')
      accordion.find('.accordion-button').attr('collapsed')
      accordion.find('.accordion-collapse').removeClass('show')
    }
    // 項目內容是否折疊
    if (value.collapsed) {
      accordion.find('.accordion-button').addClass('collapsed')
      accordion.find('.accordion-button').attr('collapsed')
      accordion.find('.accordion-collapse').removeClass('show')
    }
  }
}

$(document).ready(() => {
  const contents = $('.contents')
  // 取得 todo id，回傳數字或 undefined
  const todo_id = queryString().id
  // 控制 Bootstrap 元素的 id，用來解決動作重複問題
  let id = 1
  // 網頁載入後內容為全部開啟
  showContentStatus(contentStatus)
  // 將紀錄在資料庫的 todo 載入
  if (todo_id) {
    $.ajax({
      type: 'GET',
      url: `http://mentor-program.co/mtr04group4/eshau/week12/hw2/log_todo_api.php?id=${todo_id}`
    }).done((data) => {
      const todoDataFromServer = JSON.parse(data.todo_data)
      parseJsonFromServer(todoDataFromServer)
      showContentStatus(contentStatus)
    })
  }
  // 將資料儲存至後端
  $('.btn-save__confirm').click(() => {
    const todoDataFromClient = saveTodoStatus()
    // 更新內容
    if (todo_id) {
      $.ajax({
        type: 'POST',
        url: `http://mentor-program.co/mtr04group4/eshau/week12/hw2/update_todo_api.php?id=${todo_id}`,
        data: {
          todo_data: todoDataFromClient
        }
      }).done((data) => {
        alert(data.message)
      })
    // 儲存內容
    } else {
      $.ajax({
        type: 'POST',
        url: 'http://mentor-program.co/mtr04group4/eshau/week12/hw2/save_todo_api.php',
        data: {
          todo_data: todoDataFromClient
        }
      }).done((data) => {
        alert(`
          ${data.message}
          網址後加上 ?id=X 即可取得儲存的 todo 
          ${location.href}?id=${data.id}`)
      })
    }
  })
  // 更換事項類型
  $('.dropdown-menu').click((e) => {
    if ($(e.target).hasClass('dropdown-item')) {
      $('.dropdown-title').html($(e.target).html())
    }
  })
  // 新增內容
  $('button[name=submit]').click((e) => {
    const type = $('.input-note-type').text()
    const title = $('.input-note-title').val()
    if (type === '' || type === '事項類型' ||
        title === '') {
      alert('請輸入內容及選擇類型')
      return
    }
    let newHtml = html
    newHtml = newHtml.replace(/\$note-type/g, type)
      .replace(/\$note-title/g, escape(title))
      .replace(/\$id/g, id)
    id++
    contents.prepend(newHtml)
    $('.input-note-type').text('事項類型')
    $('.input-note-title').val('')
  })
  // 顯示所選內容
  $('.form-select').change((e) => {
    contentStatus = $(e.target).val()
    showContentStatus(contentStatus)
  })
  // 刪除所選內容
  $('.btn-all-del__confirm').click(() => {
    removeChooseContent(contentStatus)
  })
  // 內容區塊
  contents.click((e) => {
    const target = $(e.target)
    if (target.hasClass('edit-title')) {
      e.stopPropagation()
    }
    if (target.hasClass('check-done')) {
      const item = target.closest('.accordion')
      // 勾選或取消已完成
      item.toggleClass('finish')
      item.toggleClass('unfinish')
      // 勾選已完成後收起內容
      const itemBtn = item.find('.accordion-button')
      if (!itemBtn.hasClass('collapsed')) {
        const itemContent = item.find('.accordion-collapse')
        itemBtn.addClass('collapsed')
        itemBtn.attr('aria-expanded', false)
        itemContent.removeClass('show')
      }
      // 如果已選擇內容顯示的方式時，把不符合的內容隱藏
      setTimeout(() => {
        showContentStatus(contentStatus)
      }, 500)
    }
    // 編輯內容
    if (target.hasClass('btn-edit')) {
      // words 為內容的文字，note 為 textarea 用來修改內容
      const note = target.closest('.accordion-collapse').find('.note')
      const words = target.closest('.accordion-collapse').find('.note-words').text()
      target.parent().addClass('status-edit')
      note.val(words)
      note.removeClass('visiable')
      note.focus()
    }
    // 內容編輯完成
    if (target.hasClass('btn-confirm')) {
      const note = target.closest('.accordion-collapse').find('.note')
      const words = target.closest('.accordion-collapse').find('.note-words')
      words.text(note.val())
      note.addClass('visiable')
      target.parent().removeClass('status-edit')
    }
    // 刪除單個內容
    if (target.hasClass('btn-per-del__confirm')) {
      target.closest('.accordion').remove()
    }
  })
})
