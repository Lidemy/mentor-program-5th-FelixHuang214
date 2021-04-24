function printStars(n) {
	if (n >= 1 && n <= 30) {
		for (i=1; i<=n; i++) {
			console.log('*')
		}
	}else {
		console.log('Please enter the interval which is one to thirty')
	}		
}

printStars(6)
