const request = require('request')

request({
  url: 'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  method: 'GET'
},
(error, response, body) => {
  const newBody = JSON.parse(body)
  for (let i = 0; i < newBody.length; i++) {
    console.log(newBody[i].id, newBody[i].name)
  }
})
