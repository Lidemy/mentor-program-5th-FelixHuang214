/* eslint-env jquery */
/* eslint-disable arrow-body-style, no-useless-escape */
const CommentsControler = {
  isLoad: false,
  appendDOM: null,
  isPrepend: false,
  offset: 0,
  options: {
    type: 'GET',
    url: 'http://mentor-program.co/mtr04group4/eshau/week12/hw1/comment_api.php?site_key=eshau&offset='
  },
  getCommentsFromAPI(isGetMore) {
    // 阻擋多次載入
    if (this.isLoad) {
      return false
    } else {
      this.isLoad = true
    }
    if (isGetMore) {
      this.offset += 5
      this.isLoad = true
    }
    this.options.url = this.options.url.replace(/(?<=offset=)(.*)/, this.offset)
    $.ajax(this.options).done((data) => {
      // 失敗
      if (data.message !== 'success') {
        alert(`${data.message}`)
        return
      }
      const comments = data.discussions
      for (const comment of comments) {
        this.addCommentToDom(this.appendDOM, comment)
      }
      // 成功
      controlBtn(data)
      this.isLoad = false
    })
  },
  addCommentToDom(DOM, comment) {
    const html = `
      <div class="card">
        <div class="card-header">
          <span class="badge bg-primary card-title">@${escape(comment.nickname)}</span>
        </div>
        <div class="card-body">
          <p class="card-text">${escape(comment.content)}</p>
        </div>
      </div>
    `
    if (this.isPrepend) {
      DOM.prepend(html)
    } else {
      DOM.append(html)
    }
  }
}
// 將載入更多按紐移動至最下方或刪除按鈕
const controlBtn = (data) => {
  if (data.content === 'all') {
    $('.btn-load-more').parent().remove()
    return
  }
  $('.comments').append($('.btn-load-more').parent())
}

const escape = (toOutput) => {
  return toOutput
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F')
}

$(document).ready(() => {
  const comments = { ...CommentsControler }
  comments.appendDOM = $('.comments')
  comments.getCommentsFromAPI()
  // 新增留言
  $('.add-comment-form').submit((e) => {
    e.preventDefault()
    const newOptions = {
      type: 'POST',
      url: 'http://mentor-program.co/mtr04group4/eshau/week12/hw1/add_comment_api.php',
      data: {
        site_key: 'eshau',
        nickname: $('input[name=nickname]').val(),
        content: $('textarea[name=content]').val()
      }
    }
    const newComment = { ...comments }
    newComment.options = newOptions
    newComment.isPrepend = true
    newComment.getCommentsFromAPI()
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')
  })
  // 載入更多留言
  $('.btn-load-more').click(() => {
    comments.getCommentsFromAPI(true)
  })
})
