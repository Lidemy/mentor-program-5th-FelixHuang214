<?php
  session_start();
  require_once('./back_end/conn.php');
  require_once('./back_end/utils.php');

  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $is_login = true;
    $authority = getAuthority($username);
  }
  // 計算未刪文章數量
  $result = $conn->query(
    'SELECT COUNT(id) as count FROM eshau_article WHERE is_deleted IS NULL'
  );
  $row = $result->fetch_assoc();
  $count = $row['count'];
  $page = 1;
  
  // 登入才能瀏覽第二頁
  if (!empty($_GET['page']) && $is_login) {
    $page = intval($_GET['page']);
  }
  // 控制文章一頁數量
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;
  $final_page = intval(ceil($count / $items_per_page));
  // 控制頁數移動
  $page_move = $final_page;
  $stmt = $conn->prepare(
    'SELECT '.
    'U.username as username, U.nickname as nickname, '.
    'A.created_at as created_at, A.title as title, '.
    'A.type as type, A.content as content, A.id as id '.
    'FROM eshau_article as A LEFT JOIN eshau_users as U '.
    'ON U.username = A.username '.
    'WHERE A.is_deleted IS NULL '.
    'ORDER BY A.id DESC '.
    'LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error: ' . $conn->error);
  }
  $result = $stmt->get_result();
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link type="text/css" rel="stylesheet" href="./css/normalize.css" />
  <link type="text/css" rel="stylesheet" href="./css/style.css" />
  <title>Blog-Home</title>
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
        echo '<p>Hello, '. escape($username) .'!</p>';
      }
    ?>
    <p>Welcome to my blog</p>
  </header>
  <main class="article">
    <form class="article__form">
      <?php if ($is_login) { ?>
        <div class="article__page">
          <a class="prev" href="?page=<?php if ($page !== 1) {
            echo $page - 1; } else { echo $page; } ?>">
          </a>
          <div class="page-btn">
          <?php 
            while ($page_move > 0) {
              if ($page_move === $page) {
                echo '<a class="pagenow">'. $page_move .'</a>';
              } else {
                echo '<a href="?page='. $page_move. '">'. $page_move .'</a>';
              }
              $page_move--;
            }
            $page_move = $final_page;
          ?>
          </div>
          <a class="next" href="?page=<?php if($page !== $final_page) {
            echo $page + 1; } else { echo $final_page; } ?>">
          </a>
        </div>
      <?php } else { ?>
        <strong>
          <p class="desc-text">登入後才可檢視其它頁面</p>
        </strong>
      <?php } ?>
      <?php while($rows = $result->fetch_assoc()) { 
        ?>
        <div class="article__content">
          <div class="article__title">
            <div>
              <div class="article__type"><?php echo $rows['type']; ?></div>
              <p><?php echo escape($rows['title']); ?></p>
            </div>
            <?php if ($is_login) { ?>
              <div class="article__btn">
                <?php if ($authority === 'admin' || $username === $rows['username']) { ?>
                  <a class="article__edit-btn" href="edit.php?id=<?php echo $rows['id']; ?>">編輯</a>
                <?php } ?>
              </div>
            <?php } ?>
          </div>
          <div class="article__user-info">
              <div class="authortext">作者</div>
              <a class="article__user-nickname"><?php echo escape($rows['nickname']); ?></a>
              <a class="article__user-username"><?php echo escape($rows['username']); ?></a>
          </div>
          <div class="article__created-date"><?php echo $rows['created_at']; ?></div>
          <div class="article__words ellipsis"><?php echo escape($rows['content']); ?></div>
          <a href="article.php?id=<?php echo $rows['id']; ?>">
            <div class="article__readmore-btn">READ MORE</div>
          </a>
        </div>
      <?php } ?>
      <?php if ($is_login) { ?>
        <div class="article__page">
          <a class="prev" href="?page=<?php if ($page !== 1) {
            echo $page - 1; } else { echo $page; } ?>">
          </a>
          <div class="page-btn">
          <?php 
            while ($page_move > 0) {
              if ($page_move === $page) {
                echo '<a class="pagenow">'. $page_move .'</a>';
              } else {
                echo '<a href="?page='. $page_move. '">'. $page_move .'</a>';
              }
              $page_move--;
            }
          ?>
          </div>
          <a class="next" href="?page=<?php if($page !== $final_page) {
            echo $page + 1; } else { echo $final_page; } ?>">
          </a>
        </div>
      <?php } else { ?>
        <strong>
          <p class="desc-text">登入後才可檢視其它頁面</p>
        </strong>
      <?php } ?>
    </form>
  </main>
  <footer>
    <span>Copyright © 2020 Who's Blog All Rights Reserved.</span>
  </footer>
</body>
</html>