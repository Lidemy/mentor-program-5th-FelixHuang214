```
1. var a = 1
2. function fn(){
3.   console.log(a)
4.   var a = 5
5.   console.log(a)
6.   a++
7.   var a
8.   fn2()
9.   console.log(a)
10.  function fn2(){
11.     console.log(a)
12.     a = 20
13.     b = 100
14.   }
15. }
16. fn()
17. console.log(a)
18. a = 10
19. console.log(a)
20. console.log(b)
```

初始化 `global` 變數

```
#global
globalEC: {
  VO: {
    a: undefined,
    fn: func
  },    
  scopeChain: [globalEC.VO]  
}
fn.[[SCOPE]] = globalEC.scopeChain = [globalEC.VO]
```

執行第 1 行，`globalEC.VO.a = 1`

```
#global
globalEC: {
  VO: {
    a: 1,
    fn: func
  },    
  scopeChain: [globalEC.VO]  
}
fn.[[SCOPE]] = [globalEC.VO]
```

執行第 16 行，進入 `fn`，初始化 `fn` 變數

```
#fn
fnEC: {
  AO: {
    a: undefined,
    fn2: func
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[SCOPE]] = fnEC.scopeChain = [fnEC.AO, globalEC.VO]
```

執行第 3 行，檢查 `fnEC.AO` 是否有宣告 `a`，有，取 `a` 的值並印出 `undefined`

執行第 4 行，`fnEC.AO.a = 5`

```
#fn
fnEC: {
  AO: {
    a: 5,
    fn2: func
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[SCOPE]] = [fnEC.AO, globalEC.VO]
```

執行第 5 行，檢查 `fnEC.AO` 是否有宣告 `a`，有，取 `a` 的值並印出 5

執行第 6 行，`fnEC.AO.a = 6`

```
#fn
fnEC: {
  AO: {
    a: 6,
    fn2: func
  }
  scopeChain: [fnEC.AO, globalEC.VO]
}
fn2.[[SCOPE]] = [fnEC.AO, globalEC.VO]
```

執行第 7 行，判斷 `a`是否已宣告，有宣告則不做改動，未宣告則初始化成 `undefined`，這邊為有宣告

執行第 8 行，進入 `fn2`，初始化 `fn2` 變數

```
#fn2
fn2EC: {
  AO: {
  },
  scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}
```

執行第 11 行，先檢查 `fn2EC.AO` 是否有宣告 `a`，否，再檢查 `fnEC.AO` 是否有宣告 `a`，有，取 `a` 的值並印出 6

執行第 12 行，先檢查 `fn2EC.AO` 是否宣告 `a`，否，再檢查 `fnEC.AO` 是否有宣告 `a`，有，因此 `fnEC.AO.a = 20`

```
#fn
fnEC: {
  AO: {
    a: 20,
    fn2: func
  }
  scopeChain: [fnEC.AO, global.scopeChain]
}
fn2.[[SCOPE]] = [fnEC.AO, globalEC.VO]
```

執行第 13 行，先檢查 `fn2EC.AO` 是否宣告 `b`，否，再檢查 `fnEC.AO` 是否有宣告 `b`，否，再檢查 `globalEC.VO` 是否有宣告 `b`，否，因此會將 `b` 宣告為全域變數

```
#global
globalEC: {
  VO: {
    a: 1,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]  
}
fn.[[SCOPE]] = [globalEC.VO]
```

`fn2` 執行完畢，刪除 `#fn2`

執行第 9 行，檢查 `fnEC.AO` 是否有宣告 `a`，有，取 `a` 的值並印出 20

`fn` 執行完畢，刪除 `#fn`

執行第 17 行，檢查 `globalEC.VO` 是否有宣告 `a`，有，取 `a` 的值並印出 1

執行第 18 行，檢查 `globalEC.VO` 是否有宣告 `a`，有，因此 `globalEC.VO.a = 10`

```
#global
globalEC: {
  VO: {
    a: 10,
    fn: func,
    b: 100
  },
  scopeChain: [globalEC.VO]  
}
fn.[[SCOPE]] = [globalEC.VO]
```

執行第 19 行，檢查 `globalEC.VO` 是否有宣告 `a`，有，取 `a` 的值並印出 10

執行第 20 行，檢查 `globalEC.VO` 是否有宣告 `b`，有，取 `b` 的值並印出 100

>最後印出順序:
>
>```
>undefined
>5
>6
>20
>1
>10
>100
>```

