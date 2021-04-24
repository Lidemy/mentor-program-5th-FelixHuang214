function capitalize(str) {
	
	if (str[0] >= 'a' && str[0] <= 'z') {
		str = str.replace(str[0], String.fromCharCode(str.charCodeAt(0) - 32))//將第一個字元替換成大寫字元
	}
	return str//第一個字元非小寫或非英文字母，則不改動
	
}

console.log(capitalize('nick'));

console.log(capitalize('Nick'));

console.log(capitalize(',hello'));
