## 什麼是 Ajax？
Ajax 是 AsynChronous JavaScript and XML 的縮寫，字面上解釋的話就是用非同步的方式，然候用 JavaScript 去與 Server 交換資料，並解析 XML 格式的檔案。

要了解為何我們要使用 Ajax 來取得資料時，我們要先知道同步與非同步的差別，前者簡單來說就是程式碼跑完一行才會跑下一行，<strike>而後者不會因為某段程式碼未回傳資料而停下來</strike>而後者不會去等待某行程式碼跑完，而是會繼續執行。

這也就是當我們想依照 Server 端回傳的資料來對自己的網站做變化時，我們必須使用 Ajax 的方式取得資料，否則就必須等待對方資料回傳後，下方的程式碼才能執行，阻礙我們想對網站做的其他動作。
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

另一個方法是 **CORS**，Server 必須在 Response 的 Header 裡面加上 `Access-Control-Allow-Origin`，例如說當我們連到 Twitch 提供的 API  網址時，我們會發現回傳資料內的 `Response Headers` 含有 `Access-Control-Allow-Origin: *`，這代表所有 Origin 都能被接受，也就可以存取對方給的資料。
## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

###DOM 同源政策
第四週當我們直接跟 Server 要資料，Server 回傳資料時沒有經過瀏覽器，因此不會被瀏覽器的**同源政策**影響。

而這週 Sever 會先經過瀏覽器，才會把資料給我們，而瀏覽器是透過判斷接收資料的 **Client 端**與發送資料的 **Server 端** <strike>是否「同源」來允許雙方可不可以接受到對方傳的資料</strike>client 會因為同源政策的影響 Client 端沒辦法讀取 Server 端的資料。這是因為瀏覽器基於「代理人」的角色，為了安全性會對雙方的資料存取有一定的限制。

###Cookie 同源政策
當我們登入銀行帳密後，Server 會給我一個憑證存在 cookie，如此一來我們便能在網路銀行進行各種操作，但如果該 cookie 還未失效時，我們瀏覽到了一個惡意網站，想把銀行給的 cookie 偷過去，但當我們在瀏覽銀行網站時，Server 就會在傳過來的 cookie 內寫入 domain 及 path，這樣就可以在判斷兩者皆相同的情況下存取 cookie。