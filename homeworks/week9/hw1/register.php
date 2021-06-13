<!DOCTYPE html>
<html lang="en">
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
      <div>
        <button class="member-block__btn" type="button" onclick="location.href='index.php'">首頁</button>
        <input class="member-block__btn" type="submit" value="確定"> 
      </div>
      <div class="board__input-block">
        <div>帳號：<input type="text" name="username" /></div>
        <div>密碼：<input type="password" name="password" /></div>
        <div>暱稱：<input type="text" name="nickname"/></div>
        <?php 
          if($_GET['errCode']) { 
            $code = $_GET['errCode'];
            $msg = '未知錯誤請洽網站管理員';
            if ($code === '1') {
              $msg = '輸入內容不可為空';
            }
            if ($code === '2') {
              $msg = '帳密及暱稱重複，請重新輸入';
            }
          }
        ?>
        <span><?php echo $msg; ?></span>
      </div>
    </form>
    <h1 class="board__title-register">會員註冊</h1>
    <span class="site-name">Comment</span>
  </main>

  
</body>
</html>