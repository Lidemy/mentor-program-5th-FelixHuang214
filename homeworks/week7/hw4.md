## 什麼是 DOM？

DOM 可以把 HTML 文件內的標籤、文字、圖片定義成物件來讓我們利用 DOM API 來抓取元素，並用 Javascript 來控制這些元素。

##### DOM 是一個樹狀結構，我們可以依照節點(node)去選取元素。

![Imgur](https://i.imgur.com/PPoXG8q.gif)

##### 可以把 DOM 節點大致分成 4 種 ：

1. **Document**：指文件本身。
2. **Element**：指文件內的標籤，例如：`div`、`input`。
3. **Text**：指被標籤包住的文字，例如：`<h1>Text</h1>`，這個被標籤包住的就是此元素的文字。
4. **Attribute**：指標籤內的屬性，例如：`<input type="text" />`，這個 type 就是該元素的屬性，而等號後的 text 為該屬性的值(value)。

## 使用 DOM API 來取得節點

首先我們透過 Javascript 來選取節點：

```
// 選取符合 id 的值為 xxx 的元素。 p.s.: id 名稱不會重複
document.getElementById('xxx')

// 選取所有符合標籤(tag)名稱為 xxx 的元素。
document.getElementsByTagName('xxx')

// 選取所有符合 class 的值為 xxx 的元素
documnet.getElementsByClassName('xxx')
/*
依照 Selector 條件來選取元素。
'.' 代表選取 class 值為 xxx 的元素，'#' 代表選取 id 值為 xxx 的元素，不加代表選取標籤元素。
而 Selector 會選到由上到下第一個配對到的元素，SelectorAll 則是全部符合的元素。
 */
document.querySelector('＃xxx')
document.querySelectorAll('.xxx')
```


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

在事件傳遞中，當我們點擊某個目標，會先從根節點(例如：window)往下去找到目標，而「往下去找到目標」就是我們稱為的「捕獲」，而當捕獲到目標後，會從該節點向上回傳至根節點，這個過程我們就稱為「冒泡」，冒泡會觸發點擊事件，這樣我們就能使用 Javascript 來讓網頁做某些變化，而這整個流程就是事件傳遞機制。

## 什麼是 event delegation，為什麼我們需要它？

舉例來說，當網頁有很多元素，而我們想要監控元素的點擊或輸入等等事件，我們不可能把每個元素都加上一個 EventListener，這時我們可以透過監控包在元素外層的父元素來達成對每個元素的監控，只需要再加上些判斷式就可以區分每個元素的事件，例如：

```
// 繪製兩個按鈕
<div class="form">
  <button class="btn1">button1</button>
  <button class="btn2">button2</button>
</div>

-----------------------------------------

const form = document.querySelector('.form')

// 對整個 div 區塊監聽「點擊事件」
form.addEventListener('click', (e) => {

// 當點擊到 button1，將按鈕變成紅色
  if (e.target.classList.contains('btn1')) {
    e.target.style.background = 'red'
  }
  
  // 當點擊到 button2，將按鈕變成藍色
  if (e.target.classList.contains('btn2')) {
    e.target.style.background = 'blue'
  }
})
```

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？


#### **event.preventDefault()**

可以阻止元素的預設行為，例如：阻止表單在點擊提交按鈕後提交。

#### **event.stopPropagation()**

阻止目標元素不斷向上層冒泡，主要發生在目標元素包在其他元素內並重疊，而且其他元素也有相同的事件時，舉個例子：

```
// 繪製兩個方塊
<div class="outer" style="background:red; height:200px; width:200px">
  <div class="inner" style="background:grey; height:100px; width:100px"></div>
</div>
```
![Imgur](https://i.imgur.com/2NOrjTy.png?1)
 
 接下來我們給兩個方塊點擊事件，點擊後會跳出文字視窗：
 
```
const outer = document.querySelector('.outer')
const inner = document.querySelector('.inner')

outer.addEventListener('click', (e) => {
  alert('outer')
})
inner.addEventListener('click', (e) => {
  alert('inner')
})
```

會發現我們點擊了灰色區塊時，會跳出兩個文字視窗，原因是當我們在執行冒泡階段時，冒泡事件會在每層反應，也就是說外層也會觸發點擊事件，解決方法是在 inner 的點擊事件監聽內加上 event.stopPropagation()：

```
const outer = document.querySelector('.outer')
const inner = document.querySelector('.inner')

outer.addEventListener('click', (e) => {
  alert('outer')
})
inner.addEventListener('click', (e) => {
  alert('inner')
  e.stopPropagation()
})
```


