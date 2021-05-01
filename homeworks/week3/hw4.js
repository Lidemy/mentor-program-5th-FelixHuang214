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
  const s = input[0]
  if (isValid(s)) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function isValid(str) {
  let temp = ''
  for (let i = str.length - 1; i >= 0; i--) {
    temp += str[i]
  }
  if (temp === str) return true
  return false
}
