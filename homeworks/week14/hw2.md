一開始自己看文件設定的時候，完全遠離了正確的作法，一開始依照我找到的文件跑去開了 RDS 而裡面可以直接建立 database，因此我就照著指示把 database 建立起來，而也成功用 Sequel Pro 連上該資料庫，但不知為何無法對資料庫進行新增檔案之類的動作，而同時我也想到這樣沒辦法開 PHP 檔阿，因此決定繼續在 AWS 上找放置 PHP 檔的方法，後來發現了叫做 Aws sdk for php，看起來可以達到我的目的，所以又照著文件跑了一陣子，但卡在無法使用金鑰與遠端連線，重複翻了很多次文件最終無法解決後，才決定去看老師提供的資訊，看了以後才發現跟我做的完全是兩回事，之後就照著指示將該安裝該更新的東西都完成了。

接下來就是要把之前的作業丟到租的伺服器上了，這時我有想到可以用之前交作業用的 FileZilla 來把資料丟過去，不過還是想先試試用 git 把資料丟過去，因此我在本機另外建了一個用來處理存放網站的資料夾，並在 GitHub 新建一個 Repositories，但在此之前我試著把檔案整理了一下，覺得最棘手的地方是要怎麼把不同的檔案區分開來，考慮到必須要讓管理比較方便，我還是決定先把 php 與 img 分開，而 html、css、js 依照每個網頁放在同一個區塊，原因是這樣我會比較好再進行修改，也不會因為檔案分得太開導致路徑錯綜複雜，不過不清楚當一個專案變大的時候，如何整理會比較好，之後等存放的資料更多的時候，應該會將功能性的 js，或是共用的 css 再分出來自成一個資料夾，而 html、主要 css、主要 js 還是會放在一塊，而 conn.php 目前是只要用到的網站都直接複製一份給它，原因是要修改太多路徑，但是之後的檔案都會連到同一個 conn.php。

將網站丟到伺服器後發現了個問題，就是我的 js 檔只要別人知道路徑就可以被讀到，像是 twich 的金鑰因為必須要利用它去通過 API 的認證，因此目前是一併寫在 js 上，不知道有什麼方法可以不讓別人看到這個 js 檔案。

[檔案的規劃方式](https://github.com/FelixHuang214/website)

[Todo 網頁](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/webpage/todo/index.html)

[Twitch Top Games](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/webpage/twitch_topgames/)

[restaurant](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/webpage/restaurant/home/index.html)

[留言板](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/webpage/message_board/)

[會員留言板](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/php/comments/index.php)

[blog](http://ec2-54-249-42-178.ap-northeast-1.compute.amazonaws.com/website/php/blog/index.php)
