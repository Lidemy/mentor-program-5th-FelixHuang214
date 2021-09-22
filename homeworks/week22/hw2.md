## 請列出 React 內建的所有 hook，並大概講解功能是什麼

#### useState

宣告在 component 內，useState() 會在 component 第一次 render 時執行，並把括號內的值當成預設值，之後便不會再次執行。

```js
function App() {
  const [state, setState] = useState(1)
}
```

useState 會給我們兩個參數，第一個是 state 的值，第二個是用來改變這個 state 的函式，當我們要在 component 內改變 state 時，就必須使用第二個參數 setState，使用它會讓 component 重新 render，利用這個特性，我們能夠讓網站的頁面顯示更新後的資料。

#### useEffect、useLayoutEffect

當瀏覽器畫面 render 完以後才會去執行 useEffect 內的程式碼，而執行與否會依照第二個參數是否有改變來做判斷。

```jsx
function App() {
  const [state, setState] = useState(1)
  useEffect(()=>{...}, [])
}
```

如果想要做到只在第一次 render component 時執行 useEffect，之後的 render 不希望重複執行 useEffect 內的程式碼的話，可以將第二個參數的值設成空陣列。

而 useLayoutEffect 則是在瀏覽器畫面 render 之前執行。

#### useContext

可以利用 useContext 讓下層的 component 使用上層 component 的常數、變數等參數。

```jsx
export const StateContext = createContext(null)

function App() {
  const [state, setState] = useState(1)
  return (
    <StateContext.Provider value={{ state }}>
      <MyPage />
    </StateContext.Provider>
  )
}
```

用 `<StateContext.Provider>` 包住 `<MyPage>` 可以讓它使用 value 內的 state。

```jsx
import { StateContext } from 'App'

function MyPage() {
  const { state } = useContext(StateContext)
}
```

#### useReducer

可以當作是 useState 的進階版，當我們想一次改變多個狀態時，例如向 server 請求資料時，我們在呼叫 server 前設置幾個狀態

* `isLoading = true`，代表正在等待 server 回應
* `isError = true`，代表 server 回傳了錯誤訊息
* `post = []`，取得 server 的資料

當接收到 server 的回應可能會有幾個狀況

* server 回傳成功訊息，成功取得資料
* server 回傳錯誤訊息
* server 沒有回應

依據不同狀況我們要對不同的狀態做變化，如果使用 useState 來操作這些狀態，我們可能沒辦法馬上知道為何要做這些改動，只能從上下的程式碼去做判斷，但如果使用 useReducer，就可以利用文字的形式告訴我們做這些改動是什麼原因。

```jsx
const dataFetchReducer = (state, action) => {
  console.log("dataFetchReducer", state, action)
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case "FETCH_SUCCESS":
      return action.payload
        {
          ...state,
          isLoading: false,
          isError: false,
          posts: action.payload,
        }
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      }
  }
const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    posts: [],
    errorMessage: ''
})
```

如此一來我們可以依照設定的訊息來控制狀態的改動，並將它們加在請求資料的前後。

```jsx
(async () => {
      dispatch({ type: "FETCH_INIT" })
      try {
        const data = await getPosts()
        dispatch({ type: "FETCH_SUCCESS", payload: data })
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: error })
      }
    })()
```

#### Memo

用來包住 component ，比對該元素的 props 與上一次的 props 是否相同，相同則不會重新 render。

#### useMemo

* 儲存 object、array 等

  原因是這些變數的比對是依照記憶體位置，因此當我們將 object 或 array 當成 props 給 component 時，react 就會判斷 props 有改動，因此會重新 render，為了解決這個狀況，可以使用 useMemo。

* 用來儲存複雜的運算，除非設定的參數改變才會再重新計算一次。

  ```jsx
  const value = useMemo(() => caculate(a, b), [a, b])
  ```


#### useCallback

用來包住 function，與 useEffect 相同需要設定第二個參數來判斷是否重新宣告一次。

```jsx
const func = useCallback(() => {
  test()
}, [])
```

#### useRef

* 用來儲存一些不想因為重新 render 而改變的變數
* 可以用來指定某個元素的動作

#### useImperativeHandle

可以把子層的 ref 傳至父層，我們可以在 useImperativeHandle 內設定當「某個動作」發生時，在執行其它的程式碼，並讓它可以在父層觸發。

```jsx
const ChildInput = forwardRef((props, ref) => {
  return <input type="text" placeholder="輸入" ref={ref} />
})

const App = () => {
  const inputRef = useRef(null)
    useEffect(() => {
      inputRef.current.focus()
    })
   return <ChildInput ref={inputRef} />
}
```

當畫面每次 render，input 都會自動 focus，但如果我們想要在 focus 後做些其它的事情時，就可以使用 useImperativeHandle。

```jsx
const ChildInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
      doSomething...
    }
  }))
  return <input type="text" placeholder="輸入" ref={ref} />
})

const App = () => {
  const inputRef = useRef(null)
    useEffect(() => {
      console.log(inputRef.current) // {focus: ƒ focus()}
      inputRef.current.focus() // 同樣可以讓底層的 focus
    })
   return <ChildInput ref={inputRef} />
}
```

#### useDebugValue

可以方便在 「react 開發者工具」找到自己定義的 hook 顯示的訊息。

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

分成三個階段 mount、update、unmount，每個階段有相對應的 hook 可以做操作，用來利用 props 來更新 state。

### mount

* #### constructor()

  首先執行 `constructor`，使用 `super` 繼承 `React.Component` 的方法及參數，並在此階段初始化想要設定的 state (ES6 之後)。

* #### static getDerivedStateFromProps(props, state)

  可以在瀏覽器 render 之前拿到新的 props 並將 state 更新。

* #### render()

  判斷我們的 component 是否有更新，並加入至 Virtual DOM。

* #### componentDidMount

  會將 Virtual DOM 加入至原生 DOM 讓瀏覽 render 出我們要的畫面。

### update

* #### static getDerivedStateFromProps(props, state)

  可以在瀏覽器 render 之前拿到新的 props 並將 state 更新。

* #### shouldComponentUpdate(nextProps, nextState)

  當我們使用 setState 來更新 state 的值時會被調用，這時我們可以再次判斷 state 是否真的有發生改變，進一步控制 component 是否重新 render。

* #### render()

  判斷我們的 component 是否有更新，並加入至 Virtual DOM。

* #### getSnapshotBeforeUpdate(prevProps, prevState)

  類似 useLayoutEffect，在畫面 render 之前我們可以再對舊的資料作處理，讓 DOM 在顯示之前就先變化。

* #### componentDidUpdate()

  類似 useEffect，當我們的畫面 render 完以後想做什麼事的話可以在這裡處理。

### unmount

* #### componentWillUnmount()

  當不需在重新 render 時就會調用

## 請問 class component 與 function component 的差別是什麼？

* **調用狀態的差別**：前者會使用 this 調用這個 componenet 本身的 state，而後者是利用 closure 的方式將 state 儲存在 function 內，差別在如果不做一些處理的話 this 每次都是調用最新的值，因此當我們使用非同步的方式，等到資料回傳後在使用 this.state 時，這時 state 可能已經發生了變化，也就沒辦法符合「在要資料的當下的狀態」，而 function component 就不會有這樣的問題，原因是我們要調用的狀態是存在 function 內的，我們只是去呼叫「在要資料的當下所要執行的 function」
* **傳遞參數的差別**：class component 是用繼承父元素的方式來取得 props，而 function component 比較像我們使用 function 時傳遞參數的方式。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

#### uncontrolled 

單純取得元素的值，不強調 Virtual DOM 與原生 DOM 的一致性。

```jsx
function App() {
  const inputRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputRef.current.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">送出</button>
    </form>
  )
}
```

這樣雖然可以在提交表單時取得 input 的值，但這個方式就像我們使用原生的 `Document.querySelector` 去找的 input 元素在把值拿來用相同。

但我們可以把它利用在單純的元素變化上，當我們點擊 CLICK 按鈕時，會讓 input 處於 focus 的狀態。

```jsx
function App() {
  const inputRef = useRef(null)
  const handleInputFocus = () => {
    inputRef.current.focus()
  }
  
  return (
    <>
      <input type="text" ref={inputRef} />
      <button type="button" onClick={handleInputFocus}>CLICK</button>
    </>
  )
}
```

#### controlled

一開始我們想用 useRef 取得 input 的值，但要如何讓顯示的資料與我們取得的資料隨時一致呢？我們可以利用 onChange(exchange) 在使用者輸入每一個文字時，都將改變的資料當成狀態儲存。

```jsx
function App() {
  const [value, setValue] = useState('')
  const handleChangeValue = (e) => {
    setValue(e.target.value)
  }
  
  return <input type="text" value={value} onChange={handleChangeValue}/>
}
```

當資料每次改變時都會重新 render，使得 Virtual DOM 能夠控制原生 DOM，這樣兩者的資料就會一致，因此我們可以立即對使用者輸入的資料作變化，並改變 input 的值或是做出錯誤提示。
