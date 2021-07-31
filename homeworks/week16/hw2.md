

```
1. for(var i=0; i<5; i++) {
2.   console.log('i: ' + i)
3.   setTimeout(() => {
4.     console.log(i)
5.   }, i * 1000)
6. }
```

初始化變數

```
globalEC: {
  VO: {
    i: undefined
  }
}
```

執行第 1 行 -> 宣告 `i = 0` -> 判斷 i 是否小於 5 -> true 進入第一個迴圈

> 因為 `var` 宣告的變數是個 function scope，而 `for` 並不是一個 function，因此 `i` 會是一個 global variabl

```
setTimeoutEC: {
  AO:{}
}
globalEC: {
  VO: {
    i: 0
  }
}
```

執行第 2 行 -> 將 `console.log('i: ' + i)` 堆疊至 Call Stack -> 印出 `i: 0`

執行第 3 行 -> 將 `setTimeout(...)` 堆疊至 Call Stack -> 呼叫 `setTimeout` 的 API -> API 請求瀏覽器設定一個計時器 -> function 結束

> 此時 `setTimeout()` 設定的秒數是 0 * 1000 = 0 ms，瀏覽器讀完秒數後，Callback Queue 內會有一個 `console.log(i)` 任務

執行第 1 行 -> i++ -> 判斷 i 是否小於 5 -> true 進入第二個迴圈

```
setTimeoutEC: {
  AO:{}
}

globalEC: {
  VO: {
    i: 1
  }
}
```

執行第 2 行 -> 將 `console.log('i: ' + i)` 堆疊至 Call Stack -> 印出 `i: 1`

執行第 3 行 -> 將 `setTimeout(...)` 堆疊至 Call Stack ->呼叫 `setTimeout` 的 API -> API 請求瀏覽器設定一個計時器 -> function 結束

> 此時 `setTimeout()` 設定的秒數是 1 * 1000 = 1000 ms，瀏覽器讀完秒數後，Callback Queue 內會有第二個 `console.log(i)` 任務

執行第 1 行 -> i++ -> 判斷 i 是否小於 5 -> true 進入第三個迴圈

接下來的迴圈都會進行相同的任務，直至第六個迴圈，此時 `i = 5` 判斷 i 是否小於 5，false 因此不會進入迴圈，而這時已經印出

```
i: 0
i: 1
i: 2
i: 3
i: 4
```

for 迴圈執行完後 Call Stack 已經沒有任務在進行，因此 event loop 會將 Callback Queue 內的任務依序丟入 Call Stack 執行，這時 `globalEC.VO` 的 `i` 為 5，而也因為 for 迴圈很快就執行完成了，因此會依照  `setTimeot()` 設定的秒數印出 5

```
5 // 0 秒
5 // 1 秒
5 // 2 秒
5 // 3 秒
5 // 4 秒
```

> 最後印出順序
> ```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5