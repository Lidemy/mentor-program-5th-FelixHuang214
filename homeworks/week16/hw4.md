this 會依照是誰調用或呼叫 function 來指定 this 選取的區域，因此 `obj.inner.hello()` 的 this 會是 `obj.inner`，因此會印出 2，而 `obj2.hello()` 的 this 會是 `obj2`，而 `obj2` 也是 `obj.inner`，因此也會印出 2，第三個 `hello()` 因為是直接呼叫 function，因此 this 會是預設值，而在瀏覽器的話會是 window，window.value 的值是 undefined，因此會印出 undefined。

