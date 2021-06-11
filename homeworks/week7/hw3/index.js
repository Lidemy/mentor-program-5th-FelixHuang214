const list = document.querySelector('.list-block')
const form = document.querySelector('.form')
const input = document.querySelector('.input-block__add')

/*
list.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('item-name')) {
    const note = e.target.closest('.item').querySelector('.note')
    note.classList.remove('note--hidden')
    note.style.left = `${e.layerX + 30}px`
  }
})
*/

input.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    const content = escapeHtml(input.value)
    const newItem = document.createElement('li')
    newItem.classList.add('item')
    newItem.classList.add('unfinished')
    newItem.innerHTML = `
      <button class="checkbox done--hidden"type="button">
        <span class="bubble-fin">完成</span>
      </button>
      <p class="item-name bottom-line">${content}</p>
      <div id="del" class="delete-block"></div>
    `
    list.appendChild(newItem)
    input.value = ''
  }
})

form.addEventListener('click', (e) => {
  const notes = document.querySelectorAll('.note')
  if (!e.target.classList.contains('item-name') &&
      !e.target.classList.contains('note')) {
    for (let i = 0; i < notes.length; i++) {
      if (!notes[i].classList.contains('note--hidden')) {
        notes[i].classList.add('note--hidden')
      }
    }
  }

  if (e.target.classList.contains('delete-block')) {
    list.removeChild(e.target.closest('.item'))
  }

  if (e.target.classList.contains('checkbox')) {
    const onOff = e.target.closest('.item')
    onOff.classList.toggle('finished')
    onOff.classList.toggle('unfinished')
  }
})

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/*
const checkbox = document.querySelectorAll('.checkbox')
const listItem = document.querySelector('.item')

for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener('click', (e) => {
  const onOff = checkbox[i].closest('.item')
  onOff.classList.toggle('finished')
})
}

const deleteBlock = document.querySelectorAll('.delete-block')
for (let i = 0; i < deleteBlock.length; i++) {
deleteBlock[i].addEventListener('click', (e) => {
list.removeChild(e.target.closest('.item'))
})
}
*/
