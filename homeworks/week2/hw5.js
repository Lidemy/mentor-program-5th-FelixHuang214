function join(arr, concatStr) {
	var temp = ''
	for (let i=0; i<arr.length; i++) {
		temp += arr[i]
		if (i < arr.length - 1)	{
			temp += concatStr
		}
	}
	return temp	
}  
	


function repeat(str, times) {
	var temp = ''
	for (i=0; i<times; i++) {
		temp += str
	}
	return temp
}

console.log(join([1, 2, 3], ''));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
