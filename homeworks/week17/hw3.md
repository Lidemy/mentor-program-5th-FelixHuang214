## 什麼是 MVC？

分別為 M：Model、V：View 及 C：Controller，model 可以控制我們匯入資料庫的型態，例如 string 或 integer 等，可以根據每個檔案來區分每個 table 存入 column 的資料形式 ，view 可以讓我們依照 response 回傳的變數來對 html 操作，然後在瀏覽器呈現成網頁被我們看見，controller 可以依照我們設定的條件來控制 model 要取用或存入的值，例如我們要登入會員，我們可以在 controller 內設計一個可以依照資料庫的資料，來判斷有沒有該使用者且密碼正確的條件，進而達成使用者的登入。

MVC 的好處就是把各個區塊的分工劃的更細，各個區塊基本上是做完自己的工作再把資料傳給下個區塊，因此在錯誤處理就能清楚知道是在那個地方發生，而也因為各個功能分開寫，因此也比較能夠沿用到其它的開發上。

## 請寫下這週部署的心得

這次在 heroku 上用的資料庫與課程上不同，因此有需多問題產生，首先是資料庫並不是 mySQL 資料庫，而是postgreSQL 因此必須另外下載 pg 套件，而連線至資料庫的方式也稍有不同，因此在 config.json 的設定也會不相同，其中增加了 dialectOptions 的 ssl 設定，這邊雖然不確定是不是因為連接資料庫的方式為 ssl 才需要做如此設定，但還是照著文件去增加這個參數，但我認為不瞭解參數會是之後部屬的隱患，可能會因為不瞭解各個環境需要的參數不同，而導致無法預期的錯誤，而雖然還沒搞懂 dialectOptions 的設定原因，但還是會找時間去瞭解。

而這次雖然有研究如何部屬在自己的主機上，但最後以失敗告終，一開始的錯誤是 apache2 與 nginx 的 port 衝突，在看了許多文章後修改了 apache2 的 httpd.conf 與 000-default.conf 文件，改成 8080 port，修改後可以使用 publicIP:8080，來進入預設網頁，但沒辦法使用我們自己的網域加上 :8080 來進入，這邊在猜可能是 cloudflare 的設定問題，有空在研究。

解決衝突問題後，就將作業丟上去執行看看，但這邊在 ubuntu 裝 npm 的套件時跳出許多錯誤，所以後來還是改為 heroku 來部屬。


## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

通常我們在 ejs 網頁上不會加太多的條件，而之前為了取得資料都必須在 php 檔內與資料庫做溝通，這樣導致 php 畫面有需多與 html 不相關得程式碼導致畫面混亂，而在除錯上也會搞不清楚是哪一方的問題，而在用 nodejs 的方式來寫後端後，因為與資料庫做溝通的工作分到另一個區塊單獨作業，而 ejs 只要判斷有沒有接到資料就好，而沒有資料或非預期資料的錯誤基本上都是 controller 那邊的問題，在除錯上就變的比較方便。
