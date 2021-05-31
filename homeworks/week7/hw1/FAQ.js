const faqList = document.querySelector('.faq-block')

faqList.addEventListener('click', (e) => {
  if (e.target.classList.contains('Q-title')) {
    const question = e.target.closest('.Q')
    question.classList.toggle('Q-click')
    question.classList.toggle('Q-unclick')
  }
  if (e.target.classList.contains('Q')) {
    e.target.classList.toggle('Q-click')
    e.target.classList.toggle('Q-unclick')
  }
})
