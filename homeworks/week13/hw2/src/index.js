/* eslint-disable arrow-body-style, no-useless-escape */
// eslint-disable-next-line import/no-unresolved
import $ from 'jquery'
import { addComments, getComments } from './api'
import { formTemplate } from './template'
// eslint-disable-next-line no-unused-vars
import css from './style.sass'

export default function init(options) {
  const { apiUrl } = options
  const { siteKey } = options
  const containerSelector = $(options.containerSelector)
  containerSelector.append(formTemplate)
  const getCommentsOptions = {
    type: 'GET',
    url: `${apiUrl}comment_api.php?site_key=${siteKey}&offset=`
  }
  getComments(getCommentsOptions)
  $('.add-comment-form').submit((e) => {
    e.preventDefault()
    const addCommentsOptions = {
      type: 'POST',
      url: `${apiUrl}add_comment_api.php`,
      data: {
        site_key: `${siteKey}`,
        nickname: $('input[name=nickname]').val(),
        content: $('textarea[name=content]').val()
      }
    }
    addComments(addCommentsOptions)
    $('input[name=nickname]').val('')
    $('textarea[name=content]').val('')
  })
  $('.btn-load-more').click(() => {
    getComments(getCommentsOptions, true)
  })
}
