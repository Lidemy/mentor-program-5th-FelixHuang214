const request = require('request')
const process = require('process')

const [...argv] = process.argv

function getName(argv) {
  let result = argv[2]
  for (let i = 3; i < argv.length; i++) {
    result += ' '
    result += argv[i]
  }
  return result
}

const name = getName(argv)
//  console.log(name)

const data = {
  url: `https://restcountries.eu/rest/v2/name/${name}`
}

request(data, (error, response, body) => {
  const newBody = JSON.parse(body)[0]
  if (!newBody) {
    console.log('找不到國家資訊')
    return 1
  }
  console.log('=============')
  console.log('國家 :', newBody.name)
  console.log('首都 :', newBody.capital)
  console.log('貨幣 :', newBody.currencies[0].code)
  console.log('國碼 :', newBody.callingCodes[0])
  console.log('=============')
})
