<?php
  session_start();
  require_once('./back_end/utils.php');
  // 未登入
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }
  if (!empty($_GET['err_code'])) {
    $msg = errCodeText($_GET['err_code']);
  }
  $username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="./css/normalize.css" />
  <link type="text/css" rel="stylesheet" href="./css/style.css" />
  <title>Blog-Release</title>
</head>
<body>
  <nav class="navbar">
    <a href="index.php">
      <div class="nvabar__site-name">Who's Blog</div>
    </a>
    <div class="navbar__info-block">
      <div class="navbar__article-info">
        <a>文章列表</a>
        <a>分類專區</a>
        <a>關於我</a>
      </div>
      <div class="navbar__member-info">
        <a href="admin.php">管理後台</a>
        <a href="./back_end/handle_logout.php">登出</a>
      </div>
    </div>
  </nav>
  <header class="header">
    <p>存放技術之地-新增文章</p>
    <?php 
      echo '<p>Hello, '. escape($username) .'!</p>';
    ?>
    <p>Welcome to my blog</p>
  </header>
  <main class="article">
      <form class="article__form" method="POST" action="./back_end/handle_add_article.php">
        <div class="article__release">
          <div class="article__release-title">發表文章：</div>
          <input class="article__input-title" type='text' placeholder="請輸入文章標題..." name="title"/>
          <select class="article__input-type" name="type">
            <option value="">請選擇文章分類</option>
            <option value="diary">生活雜記</option>
            <option value="tech">技術分享</option>
            <option value="else">其它</option>
          </select>
          <textarea class="article__input-content" placeholder="請輸入文章內容..."rows="15" name="content"></textarea>
          <div class="article__release-submit">
            <button type="submit" name="submit">送出文章</button>
          <div>
        </div>
      </form>
  </main>
  <footer>
    <span>Copyright © 2020 Who's Blog All Rights Reserved.</span>
  </footer>
</body>
<script>
  const select = document.querySelector('.article__input-type')
  
  select.addEventListener('click', (e) => {
    select.firstElementChild.disabled = true
  })
</script>
<?php if (@$msg) { ?>
  <script>
    window.onload = function() { 
      window.alert('<?php echo $msg;  ?>')
      window.location = './add_article.php'
    }
  </script>
<?php } ?>
</html>