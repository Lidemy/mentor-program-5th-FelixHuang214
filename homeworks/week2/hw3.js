function reverse(str) {
	var count = 0//計算準備替換的字串的 index 值
	for (let i=str.length-1; i>=0; i--) {
		if (count < Math.floor(str.length)/2) {
			//6 個字元的話執行 3 次，5 個字元執行 2 次，以此類推。

			let temp = str[count]//儲存將被替換掉的字串
			let initial = 0//起始字串的 index
			let final = str.length//最後字串的 index
			str = str.slice(initial, count) + str.slice(count).replace(str[count], str[i])
			/*
			假設字串為 6 個字元
			第一層 : 在 str[0-5]，將 str[0] 替換成 str[5] 後儲存。
			第二層 : 在 str[1-5]，將 str[1] 替換成 str[4] 後再加上 str[0] 儲存。
			第三層 : 在 str[2-5]，將 str[2] 替換成 str[3] 後再加上 str[0-1] 儲存
			*/
			str = str.slice(initial, i) + str[i].replace(str[i], temp) + str.slice(i+1, final)
			/*
			第一層 : 將 str[5] 替換成 str[0](temp) 後再加上 str[0-4] 儲存
			第二層 : 將 str[4] 替換成 str[1](temp) 後再加上 str[0-3] 及 str[5]
			第三層 : 將 str[3] 替換成 str[2](temp) 後再加上 str[0-2] 及 str[4-5]
			*/
			count++
		}else {
			break
		}
    }
    console.log(str)
}

reverse('yoyoyo')

reverse('1abc2')

reverse('1,2,3,2,1')
