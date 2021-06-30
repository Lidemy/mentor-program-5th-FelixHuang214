<?php
  require_once('utils.php');

  if($_GET['errCode']) { 
    $msg = errCodeText($_GET['errCode']);
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css" />
  <title>留言板</title>
</head>
<body>
  <header>
    <strong>
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </strong>
  </header>
  <main class="board-regiser">
    <form class="board__member-block" method="POST" action="handle_register.php">
      <div class="board__button-block">
        <button class="member-block__btn" type="button" onclick="location.href='index.php'">首頁</button>
        <input class="member-block__btn" type="submit" value="確定"> 
      </div>
      <div class="board__input-block">
        <div>帳號：<input type="text" name="username" /></div>
        <div>密碼：<input type="password" name="password" /></div>
        <div>暱稱：<input type="text" name="nickname"/></div>
        <span><?php echo $msg; ?></span>
      </div>
    </form>
    <h1 class="board__title-register">會員註冊</h1>
    <span class="site-name">Comment</span>
  </main>
</body>
</html>