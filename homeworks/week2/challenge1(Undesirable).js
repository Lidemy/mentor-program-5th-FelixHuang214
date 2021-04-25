var readline = require('readline');

var lines = []
var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', function (line) {
  lines.push(line)
});

rl.on('close', function() {
  solve(lines)
})

function solve(lines) { 
  let  wholeNumber = []
  nCount = Number(lines[0].split(' ')[0])
  mCount = Number(lines[0].split(' ')[1])
  for (let i=1; i<=nCount; i++) {
    wholeNumber.push(Number(lines[i]))
  }

  nCount+=1
  for (let i=nCount; i<nCount+mCount; i++) {
    console.log(search(wholeNumber, Number(lines[i])))
  }
}

function search(arr, n) {

  	let mid = Math.floor(arr.length/2)
  	var indexCount = mid
  	while (mid !== 1){	
    	if (arr[mid] <  n) {
    		arr = arr.slice(mid, arr.length)
    		mid = Math.floor(arr.length/2)
    		indexCount += mid
    		if (arr[arr.length-1] === n && arr.length % 2 !== 0) {
    			indexCount += mid
    			return indexCount
    		}else if (arr[arr.length-1] === n && arr.length % 2 === 0) {
    			indexCount += mid - 1
    			return indexCount
    		}					    		 		
    	}else if (arr[mid] > n) {	
 
    		arr = arr.slice(0, mid+1)
    		mid = Math.floor(arr.length/2)
    		indexCount -= mid
    		indexCount += 1	//
    		if (arr[0] === n && arr.length % 2 === 0) {
    			
    			indexCount -= mid
    			indexCount += 1
    			return indexCount
    		}else if (arr[0] === n && arr.length % 2 !== 0) {
    			indexCount -= mid
    			return indexCount
    		}
    	}
    	if (arr[mid] === n) {
      		return indexCount
    	}
  	}
  	return -1

} 
