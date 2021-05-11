const request = require('request')
const process = require('process')

const { argv } = process
/*
function getName(argv) {
  let result = argv[2]
  for (let i = 3; i < argv.length; i++) {
    result += ' '
    result += argv[i]
  }
  return result
}
*/
const name = argv[2]
//  console.log(name)

const data = {
  url: `https://restcountries.eu/rest/v2/name/${name}`
}

request(data, (error, response, body) => {
  const newBody = JSON.parse(body)
  if (response.statusCode >= 200 && response.statusCode < 300) {
    for (let i = 0; i < newBody.length; i++) {
      console.log('=============')
      console.log('國家 :', newBody[i].name)
      console.log('首都 :', newBody[i].capital)
      console.log('貨幣 :', newBody[i].currencies[0].code)
      console.log('國碼 :', newBody[i].callingCodes[0])
    }
  } else {
    console.log('找不到資訊')
  }
})
