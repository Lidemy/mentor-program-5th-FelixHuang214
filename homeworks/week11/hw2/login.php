<?php
  session_start();
  require_once('./back_end/utils.php');
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $is_login = true;
  }
  if (!empty($_GET['err_code'])) {
    $msg = errCodeText($_GET['err_code']);
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="./css/normalize.css" />
  <link type="text/css" rel="stylesheet" href="./css/style.css" />
  <title>Blog-Login</title>
</head>
<body>
  <nav class="navbar">
    <a href="index.php">
      <div class="nvabar__site-name">Who's Blog</div>
    </a>
    <div class="navbar__info-block">
      <div class="navbar__article-info">
        <?php if ($is_login) { ?>
        <a>文章列表</a>
        <a>分類專區</a>
          <a>關於我</a>
        <?php } ?>
      </div>
      <div class="navbar__member-info">
        <?php if ($is_login) { ?>
          <a href="admin.php">管理後台</a>
          <a href="./back_end/handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="register.php">註冊</a>
        <?php } ?>
      </div>
    </div>
  </nav>
  <div class="wrapper">
    <form class="login-form" method="POST"  action="./back_end/handle_login.php">
      
      <div class="login-form__title">Log In</div>
      <p>USERNAME</p>
      <input class="login-form__username" type="text" name="username" />
      <p>PASSWORD</p>
      <input class="login-form__password" type="password" name="password" />
      <?php if ($is_login) { ?>
        <div class=login-form__desc-text>您好，<?php echo $username. ' '; ?>您已登入</div>
      <?php } else { ?>
        <input class="login-form__submit" type="submit" value="SIGN IN" name="submit" />
      <?php } ?>
    </form>
  </div>
  <?php if ($msg) { ?>
    <script>
      window.onload = function() { 
        window.alert('<?php echo $msg;  ?>')
        window.location = './login.php'
      }
    </script>
  <?php } ?>
</body>
</html>