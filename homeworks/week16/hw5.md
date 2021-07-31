## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

知道了變數是依照 Execution context(執行環境)，來判斷是取用哪裡的變數，或是會將變數宣告在哪，而當執行一個 function 時就會建立一個 execution context，並在 activation object 裡面放該 function 內宣告的變數，而在 scope chain 可以找到此 function 可以取用變數的「區域」，而這個「區域」就是上面所說的 activation object(全域為 variable object) ，在查找變數時會由下層至上層來判斷有無宣告某個變數，直到在 globalEC 的 variable object 找不到變數後才會拋出未宣告的錯誤，或是宣告成一個 global 變數。而 Hoisting 的狀況是，在建立 Execution context 後會先初始化變數，只要在該 scope 內有宣告變數， VO 或 AO 都會先給一個 undefined 的值，直到碰到賦值，才會改變 VO 或 AO 內變數的值。

利用 API 來達成 Javascript 非同步的操作，例如 setTimeout 或是 fetch 等都是 WebAPI 的一種，其實都不是 Javascript 原生提供的功能，而是去呼叫相關的 API，當我們呼叫該 API 後，API 會請求瀏覽器去做一些動作，跟 Javascript 程式碼執行的區塊 Call Stack 是不同的，因此互相不影響，瀏覽器執行完畢後會再將任務丟給 Callback Queue，等到 Call Stack 內的任務都清空後，event loop 就會將 Callback Queue 內的任務依序丟給 Call Stack 處理，這樣就可以達到非同步的操作。

用 new 建立新的物件後，物件可以利用 \_\_proto\_\_ 去搜尋父層 function 的 prototype，如此一來就可以共用 method 或一些參數，而目前最不能理解的點在 this 這塊，依照老師的影片及文章知道該如何判斷 this 會取用哪個 object 或是預設值，但就是只知道表層的狀況，很多文章都有提到「this 是依照函式如何被呼叫或調用來判斷 this 的值」，但看了很多文件還是不太理解 this 是怎麼去判斷是被誰呼叫或調用的，不像變數的判斷，可以知道是一層一層搜尋是否有宣告再去取用。

