<?php
  session_start();
  require_once('./back_end/conn.php');
  require_once('./back_end/utils.php');

  // 重置導向頁面網址
  $_SESSION['res_url'] = '';
  // 確認是否登入
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }
  $_SESSION['res_url'] = $_SERVER['HTTP_REFERER'];
  $username = $_SESSION['username'];
  $authority = getAuthority($username);
  $id = intval($_GET['id']);
  // admin 可以編輯所有文章，其他使用者只能編輯自己的文章
  if ($authority === 'admin') {
    $stmt = $conn->prepare(
      'SELECT title, type, content FROM eshau_article WHERE id=?'
    );
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare(
      'SELECT title, type, content FROM eshau_article WHERE id=? AND username=?'
    );
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    header('Location: index.php');
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();
  // 沒有編輯此文章的權限
  $row = $result->fetch_assoc();
  if ($result->num_rows === 0) {
    header('Location: index.php');
    die();
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="./css/normalize.css" />
  <link type="text/css" rel="stylesheet" href="./css/style.css" />
  <title>Blog-Edit</title>
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
        <?php if($_SESSION['username']) { ?>
          <a href="./back_end/handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="./login.php">登入</a>
        <?php } ?>
      </div>
    </div>
  </nav>
  <header class="header">
    <p>存放技術之地-修改文章</p>
    <?php 
      if ($is_login) { 
        echo '<p>Hello, '. $username .'!</p>';
      }
    ?>
    <p>Welcome to my blog</p>
  </header>
  <main class="article">
    <form class="article__form" method="POST" action="./back_end/handle_edit_article.php?id=<?php echo $id;?>">
      <div class="article__release">
        <div class="article__release-title">編輯文章：</div>
        <input class="article__input-title" type='text' placeholder="請輸入文章標題..." name="title"/>
        <select class="article__input-type" name="type">
          <option value="">請選擇文章分類</option>
          <option value="diary">生活雜記</option>
          <option value="tech">技術分享</option>
          <option value="else">其它</option>
        </select>
        <textarea class="article__input-content" placeholder="請輸入文章內容..."rows="15" name="content"><?php echo escape($row['content']); ?></textarea>
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
  const selectType = '<?php echo $row['type']; ?>'
  const title = '<?php echo $row['title']; ?>'

  window.onload = function() {
    document.querySelector(`option[value=${selectType}]`).selected = true
    document.querySelector('input[name=title]').value = title
  }
</script>
</html>