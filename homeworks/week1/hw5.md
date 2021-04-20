## 請解釋後端與前端的差異。

前端就是呈現在使用者眼前的介面，例如網頁或是手機上的 APP 都是前端的一種。

而後端就是指可以儲存、處理或傳送資料的伺服器或是資料庫，例如我們打了一串網址後，瀏覽器會發送一個 request 經由瀏覽器 -> 作業系統(windows) -> 網卡，透過網址的網域找到相對應的 DNS 伺服器，DNS 會傳給我們一個 IP 位址，經由此 IP 我們可以找到對應的 Server(伺服器)，而 Server 可以幫我們向資料庫溝通並取得我們想要的資料，而 DNS、Server、資料庫就是後端的一部份。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 瀏覽器會發送一個 request 經由瀏覽器 -> 作業系統(windows) -> 網卡，並依照網域(google.com)至相對應的 DNS 伺服器，DNS 會傳給我們一個 IP 位址。
2. 我們可以從 Network 的 search?q=javascript...內的 Headers 發現我們使用 https(傳輸協定) 的 get 方法，而這個就是 request 的請求方法，它會經由瀏覽器 -> 作業系統(windows) -> 網卡，再發送至這個 IP 位址對應的伺服器(Server)。
3. Server 會視 request 的需求決定是否與資料庫溝通，之後發送一個 response 經由 Sever -> 網卡 -> 作業系統 -> 瀏覽器，而在 status code 中我們看到它回傳了 200，此數字代表請求成功了。
4. 因此我們可以看到對方傳送的一些編碼(圖片、文字等等)，這些編碼經過瀏覽器的解析後將帶有圖片及文字的畫面呈現在我們眼前。




## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

### Stash

可以在不 Commit 的狀況下將修改到一半的狀態儲存起來。

#### 1. 暫存

當我們工作到一半但卻必須放下手邊的工作去處理其他的專案，但卻不想增加太多 Commit 造成管理上的困難時，我們可以就可以使用 Stash 指令。

```
$ git stash
Saved working directory and index state WIP on master: f6a4bd1 test2
```

而如果有 Untracked 狀態的檔案就必須使用以下的指令(此方法會一併加入 Modifided 狀態的檔案)

```
$ git stash -u
```



#### 2. 位置

我們可以輸入指令來確認有沒有正確儲存。

```
$ git stash list
stash@{0}: WIP on master: f6a4bd1 test2
stash@{1}: WIP on master: f6a4bd1 test2
```

#### 3. 恢復儲存點

我們可以使用 pop 指令來將儲存點恢復，但此方法會在恢復後將儲存點刪除。

```
$ git stash pop // 恢復最新的儲存點({0})
$ git stash pop stash@{0} //只恢復指定的儲存點
```

另一個方法是用 apply 指令，此方法在取出後不會刪除儲存點。

```stas
$ git stash apply // 恢復後不刪除儲存點
```

### Fetch

把 GitHub 上對檔案的更新拉到本機

```
$ git fetch
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), 632 bytes | 3.00 KiB/s, done.
From https://github.com/FelixHuang214/test
   478c064..6b00e25  master     -> origin/master
```

但本機端的檔案目前還看不出變化，因此我們使用 Sourcetree 來觀察發生什麼事。

![Imgur](https://i.imgur.com/iL2ucSp.png)



![Imgur](https://i.imgur.com/63qRAEk.png)

可以發現多了一個新的 Commit，就是我們在 GitHub 修改檔案後的新版本，而我們想將 GitHub 更新內容反應在我們本機端的檔案上的話，我們就必須使用 merge 來合併檔案。

```
$ git merge origin/master
Updating 478c064..6b00e25
Fast-forward
 fetch_test.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

[參考資料](https://gitbook.tw/chapters/github/pull-from-github.html)

### Rebase & cherry-pick

#### 1. 合併分支

當我們想要將某分支的 Commit 合併到另一個分支時，我們可以使用 cherry-pick 指令，例如我想要把 `second` 分支的 Commit 合併至  `fitst` 分支，方法如下:

```
$ git checkout first 
$ git cherry-pick d46f14d 50cd455//想要加入 first 的 Commit 
```

可以看到我們已經成功在 first 分支加入 second 的 Commit。

#####  *second 的 Commit*

![Imgur](https://i.imgur.com/PKxeprH.png)

##### *執行 cherry-pick 後的 first*

![Imgur](https://i.imgur.com/4THfnDi.png)



[參考資料](https://zlargon.gitbooks.io/git-tutorial/content/branch/rebase.html)

#### 2. 刪除 Commit

Rebase 指令還可以輕鬆做到管理 Commit，如果我們想把 first 分支的 update 2 刪除的話要怎麼做呢?

方法如下:

```
$ git rebase -i 7896494 //代表可以修改 add Rebase.txt 之後的 Commit 
```

![Imgur](https://i.imgur.com/3qNZr9t.png)

這是一個 vim 編輯器，我們將 pick 修改成 drop 來達成刪除 Commit 的目的。

![Imgur](https://i.imgur.com/B6da96Y.png)

這樣我們就成功刪除 update 2 了!

![Imgur](https://i.imgur.com/fFFXzi9.png)

[參考資料](https://gitbook.tw/chapters/rewrite-history/remove-and-reorder-commit.html)
