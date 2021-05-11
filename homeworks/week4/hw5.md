## 請以自己的話解釋 API 是什麼

API 是用來交換特定資訊的，而這個資訊取決於官方想提供你什麼資訊，並依照這個資訊提供你一個網址，當你去連接這個網址時，會發送 request 來請求它讓你存取該網址的資料，而這時你就必須依照官方給的格式來提供 request 內需要夾帶的資訊， 例如 : 這週寫的 twitch API 就必須在 headers 夾帶 Client-ID。再來就是看這個 API 是給你什麼功能，例如它可能是一個可以讓你去變更它的資料功能，那麼你的 request 可能就會夾帶 POST、DELETE 或是 PATCH 方法。

而我們再 API 提供的網址內常常可以發現一些規律，例如:如果我們想要看所有書籍的資訊，那麼網址可能長這樣  `http://abc/.../books` 。假測我們可以修改網址裡面的書籍，那麼常常會發現那個書籍的書名或是編號可能會家在 books 的後面變成 `http://abc/.../books/The Book ` ，是不是跟某個在電腦常常會看到的東西很像?沒錯，就是電腦路徑，因此我推測當我們看似在修改網頁的資料時，其實是修改資料夾內的檔案，所以我們才必須將網址後面加上類似相對路徑的 `/`  符號，其實單純就是讓我們到它的資料夾內去做修改。備註 : 但有可能不會真的對應到一個資料夾。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

#### 403 Forbidden

有可能的原因是伺服器認為你是個機器人，因為你可能短時間內一次存取太多資料，所以它拒絕你的的請求。另外也有可能是連線的用戶過多，無法處理過量的請求時便會返回此錯誤。

#### 304 not modified

當資源(例:請求條件)沒有更動時，伺服器會回傳 304，但不會把資料回傳，通常是等到到期或是有更動時才會再將資料回傳。

#### 205 Reset Content

類似 204，但與 204 不同的是當你將資料完成並傳給伺服器時，它會將你的當前的資料(例如:表單)重置，用意是讓你可以繼續書寫下一筆資料。

## 假設你現在是個餐廳平台，需要提供 API 給別人等串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

##### 餐廳的資訊可依照

1. 排名 : 每個餐廳會有顧客評分及觀看人數，將作為排名的基準。(為預設不可更改)

2. 種類  : 可依照國家(例如:日式、泰式等)、食物種類(例如:飯、麵或是點心)來獲得資訊。

3. 位置 : 依照你設定的位置來獲得資訊。

##### 參數說明

Base URL : `https://best_restaurant.com`

|paramete|description| path | Example |
|:----:|:----:|:----:|:----:|
|`top`|依照排名獲取資料，預設為 10 筆資料，可設定 1 - 100 筆資料| /restaurant/top | /restaurant/top?limit=20 |
|`country`|依照國類型獲取餐廳資料| /restaurant/top?country=國家名稱 | /restaurant/top?country=TW ，使用 [國家地區代碼(依照ISO二位碼)](https://zh.wikipedia.org/wiki/國家地區代碼)。 |
|`food`|依照食物類型獲取餐廳資料| /restaurant/top?food=食物種類 | /restaurant/top?food=noodle |
|`region`|依照地區獲取餐廳資料 | /restaurant/top?region=區域名稱 | /restaurant/top?region=NewTC(New Taipei City，前三碼+後方大寫)， 搜尋多個縣市 : /restaurant/top?location=NewTC+TaiC(Taipei City)，使用 [中華郵政-中文地址英譯 ](https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=207#result) |
|`id`|搜尋特定餐廳|/restaurant/:id|/restaurant/15|

網址串接範例 : /restaurant/top?country=TW&region=NewTC+TaiC		取得在新北市及台北市所有的台灣式餐廳

​				 		 /restaurant/top?country=FR&food=noodle		取得法式麵食的餐廳

備註 : 只會獲取串接的參數皆符合的餐廳

## 取得餐廳資料

1. 使用 `GET` 方法
2. `url` : `https://best_restaurant.com/restaurant/top?......`

###### Example Request

```
const request = require('request')

const option = {
  url: 'https://best_restaurant.com/restaurant/top?country=JP&region=NewTC',
  method: 'GET'
}

request(option, (error, response, body) => {
 console.log(JSON.parse(body))
})
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

1. 使用 `GET` 方法

2. `url` : `https://best_restaurant.com/restaurant/:id`

###### Example Request

```
const request = require('request')

const option = {
  url: 'https://best_restaurant.com/restaurant/123',
  method: 'GET'
}

request(option, (error, response, body) => {
  console.log(JSON.parse(body))
})
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

1. 使用 `POST` 方法
2.  `url` : `https://best_restaurant.com/restaurant`
3. 需要註冊成為會員取得 `Client-ID`。新增一個 `headers` 並包含 `Client-ID` 
4. 新增 `form`，並輸入餐廳資訊。

######  餐廳可包含的資訊

   ```
   form: {
     name: '餐廳名稱',
     address: '餐廳位址',
     phone: '餐廳電話',
     website: 'FB或網站網址',
     menu: {
     	'菜名' : 價格
     }
   }
   ```

###### Example Request

```
const request = require('request');

const option = {
  url: 'https://best_restaurant.com/restaurant',
  method: 'POST',
  form: {
    name: 'New Restaurant'
  }
  headers: {
    'Client-ID': '123d4e567'
  }
}


request(option, (error, response, body) => {
  console.log(JSON.parse(body))
})
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

1. 使用 `DELETE` 方法
2. `url` : `https://best_restaurant.com/restaurant/:id`
3. 同樣需要將 `Client-ID` 包在 `headers` 內
4. 你只能刪除由你新增的餐廳，無權刪除其他人的

###### Example Response

```
const request = require('request');

const option = {
  url: 'https://best_restaurant.com/restaurant/555',
  method: 'DELETE',
  headers: {
    'Client-ID': '123d4e567'
  }
}

request(option, (error, response, body) => {
  console.log(JSON.parse(body))		// 印出值 : {}
})
```

## 更改餐廳資訊

1. 使用 `PATCH` 方法
2. `url` : `https://best_restaurant.com/restaurant/:id`
3. 修改 `form` 內的資訊
4. 同樣需要將 `Client-ID` 包在 `headers` 內
5. 你只能變更由你新增的餐廳，無權變更其他人的

###### Example Request

```
const request = require('request');

const option = {
  url: 'https://best_restaurant.com/restaurant/555',
  method: 'PATCH',
  headers: {
    'Client-ID': '123d4e567'
  }
  form: {
    name: 'Update Restaurant'
  }
}


request(option, (error, response, body) => {
  console.log(JSON.parse(body))
})
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