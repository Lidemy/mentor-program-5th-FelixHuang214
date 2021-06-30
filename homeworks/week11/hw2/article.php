<?php
  session_start();
  require_once('./back_end/conn.php');
  require_once('./back_end/utils.php');

  // 登入
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $is_login = true;
    $authority = getAuthority($username);
  }
  $id = $_GET['id'];
  $stmt = $conn->prepare(
    'SELECT '.
    'U.username as username, U.nickname as nickname, '.
    'A.created_at as created_at, A.title as title, '.
    'A.type as type, A.content as content '.
    'FROM eshau_article as A LEFT JOIN eshau_users as U '.
    'ON U.username = A.username '.
    'WHERE A.is_deleted IS NULL AND A.id=?'
  );
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="./css/normalize.css" />
  <link type="text/css" rel="stylesheet" href="./css/style.css" />
  <title>Blog-Article</title>
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
          <a href="add_article.php">新增文章</a>
          <a href="admin.php">管理後台</a>
          <a href="./back_end/handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="register.php">註冊</a>
          <a href="login.php">登入</a>
        <?php } ?>
      </div>
    </div>
  </nav>
  <header class="header">
    <p>存放技術之地</p>
    <?php 
      if ($is_login) { 
        echo '<p>Hello, '. $username .'!</p>';
      }
    ?>
    <p>Welcome to my blog</p>
  </header>
  <main class="article">
    <form class="article__form">
      <div class="article__content">
        <div class="article__title">
          <div>
            <div class="article__type"><?php echo $row['type']; ?></div>
            <p><?php echo escape($row['title']); ?></p>
          </div>
        </div>
        <div class="article__user-info">
          <div class="authortext">作者</div>
          <a class="article__user-nickname"><?php echo escape($row['nickname']); ?></a>
          <a class="article__user-username"><?php echo escape($row['username']); ?></a>
        </div>
        <div class="article__created-date"><?php echo $row['created_at']; ?></div>
        <div class="article__words"><?php echo escape($row['content']); ?></div>
      </div>
    </form>
  </main>
  <footer>
    <span>Copyright © 2020 Who's Blog All Rights Reserved.</span>
  </footer>
</body>
</html>