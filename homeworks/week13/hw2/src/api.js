// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'
import { escape } from './utils'

const globalVariable = {
  offset: 0
}

const commentsController = {
  isLoad: false,
  appendDOM: null,
  isPrepend: false,
  offset: 0,
  options: { },
  getCommentsFromAPI(isGetMoreComments) {
    // 阻擋多次載入
    if (this.isLoad) return false
    this.isLoad = true
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
    }).fail((xhr, status, error) => {
      const errMessage = `
        Status-Code : ${xhr.status}
        Error-Message : ${status.toUpperCase()}
        ${error}
      `
      console.log(errMessage)
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
    this.isPrepend ? DOM.prepend(html) : DOM.append(html)
  }
}

const controlBtn = (data) => {
  if (data.content === 'all') {
    $('.btn-load-more').parent().remove()
    return
  }
  $('.comments').append($('.btn-load-more').parent())
}

export function addComments(options) {
  const newComment = { ...commentsController }
  newComment.options = options
  newComment.appendDOM = $('.comments')
  newComment.isPrepend = true
  newComment.getCommentsFromAPI()
}

export function getComments(options, isGetMoreComments) {
  const comments = { ...commentsController }
  comments.options = options
  if (isGetMoreComments) {
    globalVariable.offset += 5
    comments.offset = globalVariable.offset
  }
  comments.appendDOM = $('.comments')
  comments.getCommentsFromAPI(isGetMoreComments)
}
