const html = `
  <div class="accordion origin-show unfinish" id="accordionExample">
    <div class="bg-finish-cover"></div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <div class="check-box">
          <div class="check-done"></div>
        </div>
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#c$id" aria-expanded="true" aria-controls="collapseOne">
          <span class="btn btn-warning btn-sm ms-4 me-2">$note-type</span>
          <span class="note-title">$note-title</span>
        </button>
      </h2>
      <div id="c$id" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <textarea class="note visiable"></textarea>
          <p class="words">請輸入內容</p>
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
export default html
