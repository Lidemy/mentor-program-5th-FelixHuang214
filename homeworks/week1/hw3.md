## 教你朋友 CLI

所謂 command line 就是以輸入指令的方式來操作電腦，簡單來說你用滑鼠或鍵盤做的事情，例如:創建刪除資料夾或是做一些檔案的改名，其實都可以用 command line 來達成。

必須先確認你有沒有安裝執行 command line 指令的工具，而我會使用 Git Bash 這個工具來告訴你如何達成你的目的。

而 command line 的指令之間或是指令與檔案之前會以一個空白鍵做分隔，例如 touch 檔案名稱，可以創建一個新的檔案。

1. 開啟 Git Bash 後，我會先確認自己所在的位置，請輸入 pwd 來確認你所在的資料夾。

   

![Imgur](https://i.imgur.com/2nf4F4m.png)

2. 當我們需要變更檔案或是想要在某個位置創建檔案時，我們必須移動至當前位置才能達成目的。 
   請輸入 cd 想要移動到的位置，例如:我目前的位置為 /c/users/Administrator ，而我想移動到 f 槽的資料夾，因此我輸入 cd  f:/eshau/test ，這樣我就切到了 f 槽的 test 資料夾了。

![Imgur](https://i.imgur.com/3T3kjqe.png)

3. 接下來我們輸入 mkdir 資料夾名稱，來創建自己想要的資料夾，之後再輸入 l(L的小寫)s 來確認是否建立成功。

![Imgur](https://i.imgur.com/qZiyG8M.png)

4. 如同第2點所說，我們必須移動到 wifi 資料夾內才可以在裡面新增檔案，因此輸入 cd wifi，然後輸入 touch 檔案名稱.副檔名，來創建檔案，之後再用 ls 來確認當前目錄下是否包含檔案。

![Imgur](https://i.imgur.com/MQUE6A8.png)