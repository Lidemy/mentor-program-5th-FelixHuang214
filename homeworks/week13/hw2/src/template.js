const formTemplate = `
  <div class="row device-row">
    <form class="row col-5 add-comment-form">
      <div class="form-floating mb-3">
        <input name="nickname" type="text" class="form-control" id="input-nickname" placeholder="name@example.com">
        <label for="input-nickname">暱稱</label>
      </div>
      <div class="form-floating">
        <textarea name="content" class="form-control input-content" placeholder="Leave a comment here" id="input-content" style="height: 443px"></textarea>
        <label for="input-content">Comments</label>
      </div>
      <div>
        <input name="submit" type="submit" class="btn btn-outline-secondary" value="送出">
      </div>
    </form>
    <div class="row col-7 comments-area">
      <div class="comments" data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
        <div class="d-grid mt-2">
          <button class="btn btn-primary btn-load-more" type="button">載入更多</button>
        </div>
      </div>
    </div>
  </div>
`

export default formTemplate
