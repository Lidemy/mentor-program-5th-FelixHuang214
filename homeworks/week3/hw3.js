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
    if (isValid(Number(input[i]))) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

function isValid(number) {
  if (number === 1) return false
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false
  }
  return true
}
