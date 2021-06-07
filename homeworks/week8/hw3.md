## 什麼是 Ajax？
Ajax 是 AsynChronous JavaScript and XML 的縮寫，字面上解釋的話就是用非同步的方式，然候用 JavaScript 去與 Sever 交換資料，並解析 XML 格式的檔案。

## 用 Ajax 與我們用表單送出資料的差別在哪？

Ajax 與表單最大的差別在，表單會重整目前的頁面，或是跳轉到其他頁面，適合單純的提交資料的場合，而 Ajax 適合當需要對接收到的資料做些修改或加些動態的場合。 

## JSONP 是什麼？

利用 `script tag` 的 src 屬性不會被同源政策管制的特性，來取得因同源政策而不能取得的資料。

## 要如何存取跨網域的 API？

使用 script 標籤內的 src 指向跨網域的網址，並執行 API 提供的 function 就可以把 function 內包的資料顯示出來。
例如我們想呼叫一個某個跨網域的 API，他的文件長這樣：

```
callback({name: 'Andy', age: '30'})
```
那麼我們可以這樣呼叫來取得他的資料：

```
<script type="text/javascript">
	let callback = function(data) {
		console.log(data)
	}
</script>

<script type="text/javascript" src="檔案位置或網址“></script>
```
data 就可以顯示出我們需要的資料了。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週當我們跟 Sever 要資料時，Sever 會直接給我們，而這週 Sever 會先經過瀏覽器，才會把資料給我們，而這樣就能透過瀏覽器來幫我阻擋一些有害的資料。