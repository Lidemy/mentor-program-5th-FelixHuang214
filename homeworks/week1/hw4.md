## 跟你朋友介紹 Git

* 首先安裝 Git Bash，開啟後我們先用指令切換當前的目錄，輸入 `cd 笑話存放的位置`，例如:我目前的位置為 /c/users/Administrator ，而我想移動到 f 槽的資料夾，因此我輸入 `cd  f:/eshau/test` ，這樣我就切到了 f 槽的 test 資料夾了。或是在資料夾空白處，滑鼠右鍵選擇 Git Bash Here，也可以達到同樣的效果。

![Imgur](https://i.imgur.com/3T3kjqe.png)

* 假設你的笑話存放在 test 資料夾，這時我們必須先輸入 `git init` 來建立版本控制所需的檔案 `.git`，並輸入 `git status` 確認是否建立成功。

*  Untracked files 下的紅色文字為你還，綠字則反之。如果要將 joke2 加入可以輸入 ` add joke2.txt `

![Imgur](https://i.imgur.com/FWqkAmQ.png)

* 或是一次加入所有檔案，請輸入 `add .`。

![Imgur](https://i.imgur.com/OrnQgKb.png)

* 如有不想加入版本控制的檔案，請在資料夾內新建一個 `.gitignore` 檔案，建立方法為輸入`touch.gitignore`。
* 接下來我們要在 Git Bash 中修改 `.gitignore` 文件，輸入 `vi(或是 vim) .gitignore` 來啟動文字編輯器。在此模式中按 "i "可以啟動編輯模式， "esc" 可以結束編輯模式，想要離開文字編輯器請先「離開編輯模式」後再輸入 `：q`。而我們要新增的是「不想要加入版本控制」的檔案的名稱，並在結束編輯模式後輸入 `:wq` 存檔並離開該模式。

![Imgur](https://i.imgur.com/YpnpNS3.png)

* 可以看到本來需要加入版本控制的檔案消失了，之後有想避開版本控制的文件都可以直接用此方法。

![Imgur](https://i.imgur.com/5PmEh8r.png)

![Imgur](https://i.imgur.com/O18edPV.png)

* 當我們都把檔案 add 後 ，我們就開始可以建立第一個版本了，輸入 `git commit -am "message"`，message 可以輸入對這個版本的敘述，最好輸入能夠一眼就想起這個版本改動了什麼的訊息，接著我們可以輸入 `git log` 來確認現在的版本數量。

![Imgur](https://i.imgur.com/hk6Lccl.png)

* 如果之後修改了某些檔案，想建立一個新的版本我們可以直接輸入第3點的 `git commit -am "massage"` (如果是新增檔案的話就必須先 add 後才能 commit )，或是先 add 再輸入 `git commit -m "massage"`(前者是把所有檔案 add 後 commit；後者是只 commit 你 add 過的檔案，未 add 的檔案不會加入 commit，之後如果切換到該版本，沒有 add 的檔案會是上個版本沒有修改過的狀態)，都可以達到同樣的效果。

![Imgur](https://i.imgur.com/DYjJr3G.png)

* 到這裡我們已經完成了初步的版本控制了，接著我們要學會如何自由切換版本，首先我們要先知道要切換版本的代號，輸入`git log`或是`git log --oneline`，我們可以看到 commit 後有一串代碼，之後只要輸入 `git checkout 代碼(或前7碼)`就可以做到版本切換，之後可以輸入 `git checkout master` 切換到最新版本。

![Imgur](https://i.imgur.com/DNjcW2O.png)

* 你可能會有疑問，該如何知道這些版本的差異在哪?其實 Git Bash 就能夠做到，但今天想介紹一個網站 GitHub ，它可以讓你更方便地觀察你的版本，只需要幾個步驟就可以達成。

* 首先我們到 GitHub 新建一個 repository，輸入本機資料夾的名稱並大概地描述一下這個專案，創建後我們可以看到好幾行程式碼，在`…or push an existing repository from the command line` 下有幾行程式碼，我們需要複製 `git remote add origin ...`及 `git push -u origin master(或 main)` 這兩行至 Git Bash上。

![Imgur](https://i.imgur.com/gX9zlcI.png)

* 重新整理該網頁後，可以發現資料夾內的檔案都會顯示在上面，此時我們可以點擊畫面上的 commit 來知道每次更新版本新增或減少了什麼東西。

* 當每次 commit 後我們都可以在 Git Bash 上用指令把本機的檔案同步到 GitHub 上，輸入`git push origin master` 就可以輕鬆同步；相反的，我們也可以在 GitHub 修改檔案並建立新的  commit，只要在修改完成後輸入 `git pull origin master` 就可以把 GitHub 做的修改同步到本機上了。

