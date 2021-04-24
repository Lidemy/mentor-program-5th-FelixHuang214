function printFactor(n) {
	for (i=1; i<=n; i++) {
		if (n % i === 0) {
			console.log(i)
		}
	}

}

printFactor(7);
