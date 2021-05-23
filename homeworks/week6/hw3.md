## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

### **`<video>`**

可以在網頁中嵌入媒體播放器，通常用於影片播放。

```
<video src="影片名稱.mp4" width="1080" height="720" controls>
  Sorry, your browser doesn't support embedded videos.
</video>
```

要注意的點是，必須加上 `controls` 才能在網頁上控制影片，而此元素是 HTML5 才新增的，因此可能有些瀏覽器或是某些版本會不支援。因此下方文字就是，當影片無法正常顯示時可以告訴使用者的訊息。

參考資料 : [\<video> - HTML（超文本標記語言）| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

而除了 `<video>` 元素外還有 `<audio>` 元素，使用方法也很類似。



### `<button>`

可以在網頁中設置按鈕，但與 input 元素創建的按鈕不同，它能夠在元素內部放置內容或是圖片。

```
<button type='button' style="width:100px;height:100px;">
  <img src="test.jpg" />
</button>
```

<button type='button' style="width:100px;height:100px;"><img src="button.jpg" /></button>

另外也可以在 button 加入網址形成一個超連結。

```
<button type='button' onclick="location.href='https://www.google.com/'">
  前往 Google
</button>
```

<button type='button' onclick="location.href='https://www.google.com/'">前往 Google</button>

需要注意的是，`button` 如果用在表單的話，可能會因為不同瀏覽器取的值不同而導致出錯，例如 : 提交表單時有些瀏覽器會取 `value` 作為數據交給伺服器，而有些會把 `button` 開始與結束標籤之間的內容做為 `name ` 對應的值提交給伺服器。

參考資料 : [表單提交：button input submit 的區別 | Harttle Land](https://harttle.land/2015/08/03/form-submit.html)



### `<datalist>`

建立下拉式清單，需要先建立 input 元素。

```
<input list="foods">

<datalist id="foods">
  <option value="apple" />
  <option value="banana" />
  <option value="orange" />
  <option value="watermelon" />
</datalist>
```

![Imgur](https://i.imgur.com/S6Du7vo.png)

## 請問什麼是盒模型（box modal）

區分成幾個區域，可以讓我們用來對其增加、縮小寬高。

* 內容(content) : 為這個區塊的元素，例如 : 文字。

* 內邊距(padding) : 內容擴大出去的距離，也可以說是內容元素與框線的距離。

* 邊框(border) : 顧名思義，就是這整個區塊的框線。

* 外邊距(margin) : 邊框擴大出去的距離，也可以說是此元素與其他元素的距離。

  

  可以參考 :

  ![Imgur](https://i.imgur.com/BBWo5FQ.jpg)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

### 【差別】

inline 與 inline-block 兩者都是可以將內容並排，差別在 inline-block 能夠設定自己的寬高，而 inline 沒辦法直接設定，只能使用 padding 的方式增加寬高，且 inline 只能調整左右的 margin，無法調整上下。

而 block 我們可以發現雖然它可以設定寬高，但如果你設定的寬小於父層(包裹住它的區塊)的寬，那麼它實質的寬就是父層的寬，所以我們就可以知道為何 block 是直向排列，因為它把那一行填滿了因此只能換行，我們看起來就會像直向排列了。

### 【使用時機】

block : 可以讓排版由上而下，常見元素有`<div>、<p>、<ul>、<li>`。

inline : 可以使用在文字的並排，常見元素有 `<a>、<span>、<strong>`。

inline-block : 一些小區塊的並排，常見元素有 `<img>`。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？



* #### static

  ##### 將元素放在預設的位置，無法使用 top、bottom、left、right。

  

* #### absolute

  ##### 會往上找第一個 position 不是 static 的元素，再依據找到的元素的區塊來設定此元素，設定後會影響周圍的元素的排列。

  ##### 可以用在購物車上，依照物品加入的數量而變化的小圖示。

  

* #### relative

  ##### 依照「目前位置」來使用 top、bottom、left、right 來控制元素，不會影響到其他元素的排列。

  ##### 做一些區塊的組合，例如這次 hw1 的討論區我就是用 relative 來將大頭照與留言的框線結合。

  

* #### fixed

  ##### 可以使用 top、bottom、left、right 並固定在「視窗」的相對位置上，區塊不會因為上下滑而改變位置，而是固定在窗口上。

  ##### 可以用在像是想讓別人快速跳轉到文章某部分的列表，不需要滑到最上面就可以使用。