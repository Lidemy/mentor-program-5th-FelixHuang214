## 請以自己的話解釋 API 是什麼

我認為 API 其實就是個小網頁，不過它只夾帶了資訊，而這個資訊取決於官方提供的 API 網址，而當你要去連接這個網址時，勢必會發送 request 來請求它讓你存取該網址的資料，而這時你就必須依照官方提供的格式來提供 request 內需要夾帶什麼資訊， 例如:這週寫的 twitch API 就必須在 headers 夾帶 Client-ID，再來就是看這個 API 是給你什麼功能，例如它可能是一個可以讓你去變更它的資料功能，那麼你的 request 可能就會夾帶 POST、DELETE 或是 PATCH 方法。

而我們再 API 提供的網址內常常可以發現一些規律，例如:如果我們想要看所有書籍的資訊，那麼網址可能長這樣  `http://abc/.../books` 。假測我們可以修改網址裡面的書籍，那麼常常會發現那個書籍的書名或是編號可能會家在 books 的後面變成 `http://abc/.../books/The Book ` ，是不是跟某個在電腦常常會看到的東西很像?沒錯，就是電腦路徑，因此我推測當我們看似在修改網頁的資料時，其實是修改資料夾內的檔案，所以我們才必須將網址後面加上類似相對路徑的 `/`  符號，其實單純就是讓我們到它的資料夾內去做修改。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

#### 403 Forbidden

有可能的原因是伺服器認為你是個機器人，因為你可能短時間內一次存取太多資料，所以它拒絕你的的請求。另外也有可能是連線的用戶過多，無法處理過量的請求時便會返回此錯誤。

#### 304 not modified

當資源(例:請求條件)沒有更動時，伺服器會回傳 304，但不會把資料回傳，通常是等到到期或是有更動時才會再將資料回傳。

#### 205 Reset Content

類似 204，但與 204 不同的是當你將資料完成並傳給伺服器時，它會將你的當前的資料(例如:表單)重置，用意是讓你可以繼續書寫下一筆資料。

## 假設你現在是個餐廳平台，需要提供 API 給別人等串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

這邊使用 npm 的套件 : `request` 作為示範，可以使用 node.js 來執行，你也可以使用 `curl` 來串接 API。

##### 參數說明

Base URL: `https://best_restaurant.com`

|參數名稱|型態|描述| 使用方法 |
|:----: |:----:|:----:|:----:|
|`kind` |string|依照食物類型獲取資料| 分為 kindC(國家)、kindF(食物種類)，ex : kindC=TW(大寫)、kindF=rice。可參考 [國家地區代碼(ISO二位碼)](https://zh.wikipedia.org/wiki/國家地區代碼)。 |
|`location`|string| 依照地區獲取資料 | 可搜尋單個縣市，ex : location=NewTC(New Taipei City，前三碼+後方大寫)，      搜尋多個縣市，ex : location=NewTC+TaiC(Taipei City)。 可參考 [中華郵政-中文地址英譯 ](https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=207#result) |
|`limit`|integer| 預設為 10 筆資料，可設定 1 - 100 筆資料。 | 在網址最後接上 `?_limit=value`，value 為你想獲取的資料有幾筆。 |
|`id`|string| 搜尋特定餐廳 | Base URL/restaurant/id |

網址串接範例 : Base URL/restaurant/top?kindC=TW&locate=NewTC+TaiC		取得新北市或台北市的台灣食物(臭豆腐、牛肉麵....等)

​				 		 Base URL/restaurant/top?kindC=TW&kindF=noodle		取得麵類型的台灣食物

​				  		Base URL/restaurant/top?_limit=20		取得排名前 20 的餐廳

## 取得餐廳資料

##### 餐廳的資訊可依照 :

1. 排名(top) : 每個餐廳會有顧客評分及觀看人數，將作為排名的基準。

2. 種類(kind)  : 可依照國家(例如:日式、泰式等)、食物種類(例如:飯、麵或是點心)來獲得資訊。

3. 位置(location) : 依照你設定的位置來獲得資訊。


#### 範例為找新北市的日式餐廳

###### Example Request

```
const request = require('request')

const data = {
  url: 'https://best_restaurant.com/restaurant/top?kindC=JP&locate=NewTC',
  method: 'GET'
}


request(data, (error, response, body) => {
 console.log(JSON.parse(body))
}
)
```

###### Example Response

```
{
  total: 100,
  top: [
  {
    restaurant: {
      name: 'FLY to Japan',
      id: 123,
    },
    viewers: 1234567,
    score: 4.7
  },
  {
    restaurant: {
      name: 'OYSHI sushi',
      id: 444
    },
    viewers: 1000001,
    score: 4.3
  },
  ...
  ]
}
```

## 取得單一餐廳資料

將 data 內的 `url` 的值修改成 `https://best_restaurant.com/restaurant/` + `id`

###### Example Request

```
const request = require('request')

const data = {
  url: 'https://best_restaurant.com/restaurant/123',
  method: 'GET'
}


request(data, (error, response, body) => {
 console.log(JSON.parse(body))
}
)
```

###### Example Response

```
{
    restaurant: {
      name: 'FLY to Japan',
      id: 123
    },
    viewers: 1234567,
    score: 4.7
}
```


## 新增餐廳

1. 將 data 內的 `url` 的值改成 `https://best_restaurant.com/restaurant`
2. 將 data 內的 `method` 的值改成 `POST`
3. data 內新增一個 `form` 且要包含 `name: '餐廳名稱'`
4. 需要註冊成為會員取得 `Client-ID`，在 data 內新增一個 `headers` 並包含 `Client-ID`

>  你可以在 form 內加入其他資訊，例如 : 地址、電話或是價格等的資訊。

###### Example Request

```
const request = require('request');

const data = {
  url: 'https://best_restaurant.com/restaurant',
  method: 'POST',
  form: {
    name: 'New Restaurant'
  }
  headers: {
    'Client-ID': '123d4e567'
  }
}


request(data, (error, response, body) => {
 console.log(JSON.parse(body))
}
)
```

###### Example Response

```
{
    restaurant: {
      name: 'New Restaurant',
      id: 555
    },
    viewers: 0,
    score: 0
}
```
## 刪除餐廳

1. 將 data 內的 `url` 的值改成 `https://best_restaurant.com/restaurant/` + `id`
2. 將 data 內的 `method` 的值改成 `DELETE`
3. 同樣需要將 `Client-ID` 包在 `headers` 內
4. 你只能刪除由你新增的餐廳，無權刪除其他人的

###### Example Response

```
const request = require('request');

const data = {
  url: 'https://best_restaurant.com/restaurant/555',
  method: 'DELETE',
  headers: {
    'Client-ID': '123d4e567'
  }
}


request(data, (error, response, body) => {
 console.log(JSON.parse(body))		// 印出值 : {}
}
)
```

## 更改餐廳資訊

1. 將 data 內的 `url` 的值改成 `https://best_restaurant.com/restaurant/` + `id`
2. 將 data 內的 `method` 的值改成 `PATCH`
3. 將 `form` 內的 `name` 更改為你想變更的名稱
4. 同樣需要將 `Client-ID` 包在 `headers` 內
5. 你只能變更由你新增的餐廳，無權變更其他人的

> 你也可以更改 form 內其他的資訊，例如將 `price: 10000` 修改成 `price: 20000`

###### Example Request

```
const request = require('request');

const data = {
  url: 'https://best_restaurant.com/restaurant/555',
  method: 'PATCH',
  headers: {
    'Client-ID': '123d4e567'
  }
  form: {
    name: 'Update Restaurant'
  }
}


request(data, (error, response, body) => {
 console.log(JSON.parse(body))
}
)
```

###### Example Response

```
{
    restaurant: {
      name: 'Update Restaurant',
      id: 555
    },
    viewers: 0,
    score: 0
}
```