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
  const times = Number(input[0])
  for (let i = 1; i <= times; i++) {
    console.log(
      whoWin(Number(input[i].split(' ')[2]),
        LOWorHigh(input[i].split(' ')[0], input[i].split(' ')[1]))
    )
  }
}

function whoWin(k, whoHigh) {
  if (k === 1) {
    return whoHigh
  } else {
    if (whoHigh === 'A') {
      return 'B'
    } else if (whoHigh === 'B') {
      return 'A'
    } else {
      return 'DRAW'
    }
  }
}

function LOWorHigh(A, B) {
  if (A.length === B.length) {
    for (let i = 0; i < 512; i++) {
      if (A[i] > B[i]) {
        return 'A'
      } else if (A[i] < B[i]) {
        return 'B'
      }
    }
    return 'DRAW'
  } else if (A.length > B.length) {
    return 'A'
  } else {
    return 'B'
  }
}
