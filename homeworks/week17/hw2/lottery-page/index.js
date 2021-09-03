$(() => {
  const resultInfo = $('.banner').find('.wrap')
  const form = $('.form')
  const bannerImg = $('.banner__img')
  const loading = $('.loading')
  const title = $('.result-title')
  $('.btn').click(() => {
    renderNewPage()
  })
  $('.result-btn').click(() => {
    resultInfo.addClass('block-hide')
    form.removeClass('block-hide')
    bannerImg.removeAttr('style')
  })
  async function renderNewPage() {
    loading.removeClass('block-hide')
    try {
      const data = await fetch('https://calm-beyond-52457.herokuapp.com/api')
      const { rows } = await data.json()
      form.addClass('block-hide')
      resultInfo.removeClass('block-hide')
      title.text(`恭喜你中${rows.award},
      ${rows.content}`)
      bannerImg.css('background-image', `url('data:${rows.type};base64,${rows.image}')`)
    } catch (err) {
      alert('系統不穩，請稍後再試！')
    }
    loading.addClass('block-hide')
  }
})
