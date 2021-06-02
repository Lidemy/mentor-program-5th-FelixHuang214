const faqList = document.querySelector('.faq-block')

faqList.addEventListener('click', (e) => {
  const question = e.target.classList.contains('Q-title') ? e.target.closest('.Q') : e.target

  if (question.classList.contains('Q')) {
    question.classList.toggle('Q-click')
    question.classList.toggle('Q-unclick')
  }
})
/*
簡化此程式碼

if (e.target.classList.contains('Q-title')) {
  const question = e.target.closest('.Q')
  question.classList.toggle('Q-click')
  question.classList.toggle('Q-unclick')
}
if (e.target.classList.contains('Q')) {
  e.target.classList.toggle('Q-click')
  e.target.classList.toggle('Q-unclick')
}
*/
