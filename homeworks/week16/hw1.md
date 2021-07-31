```
1. console.log(1)
2. setTimeout(() => {
3.   console.log(2)
4. }, 0)
5. console.log(3)
6. setTimeout(() => {
7.   console.log(4)
8. }, 0)
9. console.log(5)
```

執行第 1 行 -> 將 `console.log(1)` 堆疊至 Call Stack -> 印出 1

執行第 2 行 -> 將 `setTimeout(...)` 堆疊至 Call Stack -> 呼叫 `setTimeout` 的 API -> API 請求瀏覽器設定一個計時器 -> function 結束

> 此時 API 會叫瀏覽器執行定時器的任務，讀取完秒數後，會將`() => { console.log(2) }` 這個任務丟至 Callback Queue(或稱 Task queue)，而在瀏覽器執行的任務不會干擾到 Call Stack 的執行，因此上個 function 結束後會繼續執行下方的任務

執行第 5 行 -> 將 `console.log(3)` 堆疊至 Call Stack -> 印出 3

執行第 6 行 -> 將 `setTimeout(...)` 堆疊至 Call Stack -> 呼叫 `setTimeout` 的 API -> API 請求瀏覽器設定一個計時器 -> function 結束

> 此時第一個 `setTimeout()` 應該已經執行完畢，因此 Callback Queue 會有 `() => { console.log(2) }`，而第二個 `setTimeout()` 也會先在瀏覽器內執行完畢才會將 `() => console.log(4)` 放至 Callback Queue。

執行第 9 行 -> 將 `console.log(5)` 堆疊至 Call Stack -> 印出 5

> 這時 Call Stack 任務已經清空了，因此 event loop 會依照順序把 Callback Queue 內的任務丟至 Call Stack 執行

執行 `console.log(2)` -> 印出 2

執行 `console.log(4)` -> 印出 4

> 最後印出順序
>
> ```
> 1
> 3
> 5
> 2
> 4
> ```