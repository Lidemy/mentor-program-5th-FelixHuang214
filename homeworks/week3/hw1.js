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
  const n = Number(input[0])
  for (let i = 1; i <= n; i++) {
    console.log(printStars('*', i))
  }
}

function printStars(str, times) {
  let result = ''
  for (let i = 0; i < times; i++) {
    result += str
  }
  return result
}
