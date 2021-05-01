const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(input) {
  const start = Number(input[0].split(' ')[0])
  const end = Number(input[0].split(' ')[1])
  for (let i = start; i <= end; i++) {
    if (isValid(i)) console.log(i) // 印出符合水仙花數數字
  }
}

// 153

function isValid(number) {
  const digits = digitsCount(number)
  let total = 0
  let temp = number
  for (let i = 0; i < digits; i++) {
    total = total + (temp % 10) ** digits // 提出尾數並做「位數」的次方
    temp /= 10
    temp = Math.floor(temp) // 將尾數去掉
  }
  if (total === number) {
    return true
  }
  return false
}

function digitsCount(number) {
  let digits = 0
  while (number > 1) {
    number /= 10
    digits += 1
  }
  return digits
}
