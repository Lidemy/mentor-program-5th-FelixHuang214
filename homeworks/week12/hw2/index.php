<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script type="module">
    import * as utils from './utils.js'
    // 控制內容的顯示方式
    let contentStatus = 'default'
    // 替代字元
    function escape(toOutput) {
      return toOutput
        .replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27')
        .replace(/\//g, '&#x2F');
    }
    // 顯示所選內容
    function showContentStatus(status) {
      let items = $('.accordion')
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
    function removeChooseContent(status) {
      let items = $('.accordion')
      switch (status) {
        case 'done':
          items.filter('.finish').remove()
          break;
        case 'undone':
          items.filter('.unfinish').remove()
          break
        default:
          items.remove()
      }
    }
    // 取得網頁 query string (截取至網路)
    function queryString() {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++)
      {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined")
        {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string")
        {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else
        {
            query_string[pair[0]].push(pair[1]);
        }
      }
      return query_string;
    }

    $(document).ready(function() {
      const contents = $('.contents')
      // 取得 todo id，回傳數字或 undefined
      let todo_id = queryString().id
      // 控制 Bootstrap 元素的 id，用來解決動作重複問題
      let id = 1
      // 網頁載入後內容為全部開啟
      showContentStatus(contentStatus)
      // 將紀錄在資料庫的 todo 載入
      if (todo_id) {
        $.ajax({
          type: 'GET',
          url: `http://localhost/eshau/week12/hw2/log_todo_api.php?id=${todo_id}`
        }).done(function(data) {
          const todoDataFromServer = data.todo_data
          contents.html(todoDataFromServer) 
        })
      }
      // 將資料儲存至後端
      $('.btn-save__confirm').click(function() {
        const todoDataFromClient = contents.html()
        // 更新內容
        if (todo_id) {
          $.ajax({
            type: 'POST',
            url: `http://localhost/eshau/week12/hw2/update_todo_api.php?id=${todo_id}`,
            data: {
              todo_data: todoDataFromClient
            }
          }).done(function(data) {
            alert(data.message)
          })
        // 儲存內容
        } else {
          $.ajax({
            type: 'POST',
            url: 'http://localhost/eshau/week12/hw2/save_todo_api.php',
            data: {
              todo_data: todoDataFromClient
            }
          }).done(function(data) {
            alert(`
              ${data.message}
              網址後加上 ?id=X 即可取得儲存的 todo 
              ${location.href}?id=${data.id}`)
          })
        }
      })
      // 更換事項類型
      $('.dropdown-menu').click(function(e) {
        if ($(e.target).hasClass('dropdown-item')) {
          $('.dropdown-title').html($(e.target).html())
        }
      })
      // 新增內容
      $('button[name=submit]').click(function(e) {
        let type = $('.input-note-type').text()
        let title = $('.input-note-tile').val()
        if (type === '' || type === '事項類型' ||
            title === '') {
          alert('請輸入內容及選擇類型')
          return
        }
        let html = utils.html
        html = html.replace(/\$note-type/g, escape(type))
          .replace(/\$note-title/g, escape(title))
          .replace(/\$id/g, id)
        id++
        contents.prepend(html)
        $('.input-note-type').text('事項類型')
        $('.input-note-tile').val('')
      })
      // 顯示所選內容
      $('.form-select').change(function(e) {
        contentStatus = $(e.target).val()
        showContentStatus(contentStatus)
      })
      // 刪除所選內容
      $('.btn-all-del__confirm').click(function(e) {
        removeChooseContent(contentStatus)
      })
      // 內容區塊
      contents.click(function(e) {
        let target = $(e.target)
        if (target.hasClass('edit-title')) {
          e.stopPropagation()
        }
        if (target.hasClass('check-done')) {
          let item = target.closest('.accordion')
          // 勾選或取消已完成
          item.toggleClass('finish')
          item.toggleClass('unfinish')
          // 勾選已完成後收起內容
          let itemBtn = item.find('.accordion-button')
          if (!itemBtn.hasClass('collapsed')) {
            let itemContent = item.find('.accordion-collapse')
            itemBtn.addClass('collapsed')
            itemBtn.attr('aria-expanded', false)
            itemContent.removeClass('show')
          }
          // 如果已選擇內容顯示的方式時，把不符合的內容隱藏
          setTimeout(function() {
            showContentStatus(contentStatus)
          }, 500)
        }
        // 編輯內容
        if (target.hasClass('btn-edit')) {
          // words 為內容的文字，note 為 textarea 用來修改內容
          let note = target.closest('.accordion-collapse').find('.note')
          let words = target.closest('.accordion-collapse').find('.words').text()
          target.parent().addClass('status-edit')
          note.val(words)
          note.removeClass('visiable')
          note.focus()
        }
        // 內容編輯完成
        if (target.hasClass('btn-confirm')) {
          let note = target.closest('.accordion-collapse').find('.note')
          let words = target.closest('.accordion-collapse').find('.words')
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
    
  </script>
  <title>Todo</title>
  <style>
  body {
    background: #f8f9fa;
  }

  .container .title {
    text-align: center;
    font-family: sans-serif;
  }

  .title {
    color: #0a58ca;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
  }

  .card-btn {
    position: relative;
    padding: 0px 20px 16px 20px;
  }

  .btn-per-del, .btn-confirm {
    position: absolute;
    right: 20px;
  }

  .btn-confirm {
    display: none;
  }

  .accordion-header {
    position: relative;
  }

  .check-done {
    top: 1rem;
    height: 25px;
    width: 25px;
    position: absolute;
    z-index: 10;
    transform: translate(37%, 12%);
    color: #198754;
  }

  .finish .check-done {
    background: url(http://localhost/eshau/week12/hw2/check-circle-regular.svg);
  }

  .unfinish .check-done {
    background: url(http://localhost/eshau/week12/hw2/circle-regular.svg);
  }

  .check:hover {
    cursor: pointer;
  }

  .form-select {
    color: #6c757d;
  }

  .form-select > option:not(:first-child) {
    color: black;
  }

  .accordion-body {
    position: relative;
  }

  .note {
    padding: 16px 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: 0;
    border: 0;
    resize: none;
  }

  .visiable {
    visibility: hidden;
  }

  .status-edit .hide {
    visibility: hidden;
  }

  .status-edit .show {
    display: inline-block;
  }

  .dropdown-menu {
    cursor: default;
  }

  .input-note-type {
    cursor: default !important;
  }

  .accordion {
    position: relative;
    display: none;
  }

  .finish:before{
    content: '';
    position: absolute;
    width: calc(100% - 24px);
    height: 100%;
    top: 0;
    background: grey;
    opacity: 0.3;
    z-index: 2;
  }

  .accordion-button {
    position: relative;
    background: #e7f1ff !important;
    color: #0c63e4;
  }

  .accordion-button:focus {
    box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
  }

  .origin-show {
    display: block;
  }

  .origin-hide {
    position: absolute;
    display: none;
  }

  .edit-title {
    background: #e7f1ff;
    color: #0c63e4;
  }

  .words {
    white-space: pre-line;
  }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand">Todo</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <div class="d-flex">
          <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#btn-save">儲存</button>
          <div class="modal fade" id="btn-save" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Warning</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                確定儲存內容嗎？
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary btn-save__confirm" data-bs-dismiss="modal">確定</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row mt-4">
      <h1 class="display-1 title">Todo</h1>
    </div>
    <!-- 輸入事項類型及標題 -->
    <div class="row mt-2">
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary dropdown-toggle dropdown-title input-note-type" type="button" data-bs-toggle="dropdown" aria-expanded="false">事項類型</button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item">隨手紀錄</a></li>
          <li><a class="dropdown-item">待辦事項</a></li>
          <li><a class="dropdown-item">其它</a></li>
        </ul>
        <input type="text" class="form-control input-note-tile" placeholder="輸入事項標題" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button name="submit" class="btn btn-outline-secondary" type="button" id="button-addon2">送出</button>
      </div>
    </div>
    <!-- 顯示選取內容並刪除 -->
    <div class="input-group">
      <select class="form-select" aria-label="Default select example">
        <option value='' selected>顯示所選內容(點擊刪除刪除所選內容)</option>
        <option value="default">全部</option>
        <option value="done">已完成</option>
        <option value="undone">未完成</option>
      </select>
      <button type="button" class="btn btn-danger btn-all-del" data-bs-toggle="modal" data-bs-target="#exampleModal">
        刪除
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              你即將刪除所有內容！
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary btn-all-del__confirm" data-bs-dismiss="modal">確定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 內容 -->
    <div class="row contents">
      <div class="accordion unfinish" id="accordionExample">
        <div class="bg-finish-cover"></div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <div class="check-box">
              <div class="check-done"></div>
            </div>
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c0" aria-expanded="true" aria-controls="collapseOne">
              <span class="btn btn-warning btn-sm ms-4 me-2">類型</span>
              <span class="note-title">標題</span>
              <!-- 未完成(修改標題)
              <input class="edit-title origin-hide" type="text" value="Accordion Item #1"/> -->
            </button>
          </h2>
          <div id="c0" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <textarea class="note visiable"></textarea>
              <p class="words">
                1.新增內容必須選類型及輸入標題<br>
                2.按編輯可變更內容，目前無法變更標題及事項類型<br>
                3.勾選已完成會自動將內想收起，必須取消勾選才能更改內容<br>
                4.上方刪除會依照所選內容做刪除<br>
                5.右上角儲存會給一個網址(原網址後加?id=)可回到之前儲存的狀態<br>
                6.導向的網址儲存後會更新內容<br>
              </p>
            </div>
            <div class="card-btn mt-2">
              <button type="button" class="btn btn-secondary btn-sm btn-edit hide">編輯</button>
              <button type="button" class="btn btn-danger btn-sm btn-per-del hide" data-bs-toggle="modal" data-bs-target="#c0dle">刪除</button>
              <button type="button" class="btn btn-secondary btn-sm btn-confirm show">確定</button>
            </div>
            <div class="modal fade" id="c0dle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    </div>
  </div>
</body>
</html>