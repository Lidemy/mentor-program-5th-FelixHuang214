<?php
  session_start();
  require_once('./back_end/conn.php');
  require_once('./back_end/utils.php');

  // 重置導向頁面網址
  $_SESSION['res_url'] = '';
  // 未登入
  if (empty($_SESSION['username'])) {
    header('Location: index.php');
    die();
  }
  // admin 可以管理所有文章，其他使用者只能管理自己的文章
  $username = $_SESSION['username'];
  $is_login = true;
  $authority = getAuthority($username);
  if ($authority === 'admin') {
    $result = $conn->query(
    'SELECT COUNT(id) as count FROM eshau_article WHERE is_deleted IS NULL'
    );
  } else {
    $sql = sprintf(
      "SELECT COUNT(id) as count FROM eshau_article WHERE is_deleted IS NULL AND username='%s'",
      $username
    );
    $result = $conn->query($sql);
  }
  $row = $result->fetch_assoc();
  $count = $row['count'];
  $page = 1;
  if ($_GET['page']) {
    $page = intval($_GET['page']);
  }
  // 頁面可顯示 20 篇文章
  $items_per_page = 20;  
  $offset = ($page - 1) * $items_per_page;
  $final_page = intval(ceil($count / $items_per_page));
  $page_move = $final_page;
  if ($authority === 'admin') {
    $stmt = $conn->prepare(
      'SELECT '.
      'A.created_at as created_at, A.title as title, A.id as id '.
      'FROM eshau_article as A LEFT JOIN eshau_users as U '.
      'ON A.username = U.username '.
      'WHERE A.is_deleted IS NULL '.
      'ORDER BY A.id DESC '.
      'LIMIT ? OFFSET ?'
    );
    $stmt->bind_param('ii', $items_per_page, $offset);
  } else {
    $stmt = $conn->prepare(
      'SELECT '.
      'A.created_at as created_at, A.title as title, A.id as id '.
      'FROM eshau_article as A LEFT JOIN eshau_users as U '.
      'ON A.username = U.username '.
      'WHERE A.is_deleted IS NULL AND A.username=? '.
      'ORDER BY A.id DESC '.
      'LIMIT ? OFFSET ?'
    );
    $stmt->bind_param('sii', $username, $items_per_page, $offset);
  }
  $result = $stmt->execute();
  if (!$result) {
    header('Location: index.php');
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
  <title>Blog-admin</title>
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
        <a href="add_article.php">新增文章</a>
        <a href="./back_end/handle_logout.php">登出</a>
      </div>
    </div>
  </nav>
  <header class="header">
    <p>存放技術之地-後台</p>
    <?php 
      if ($is_login) { 
        echo '<p>Hello, '. escape($username) .'!</p>';
      }
    ?>
    <p>Welcome to my blog</p>
  </header>
  <main class="article">
    <form class="article__form">
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
      <?php while ($rows = $result->fetch_assoc()) { ?>
        <div class="atricle__content admin__content">
          <div class="article__title">
            <p><?php echo escape($rows['title']); ?></p>
            <div class="article__btn">
              <div class="article__created-date admin__created-date"><?php echo $rows['created_at']; ?></div>
              <a href="edit.php?id=<?php echo $rows['id']; ?>">編輯</a>
              <a href="./back_end/handle_delete.php?id=<?php echo $rows['id']; ?>">刪除</a>
            </div>
          </div>
        </div>
      <?php } ?>
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
    </form>
  </main>
  <footer>
    <span>Copyright © 2020 Who's Blog All Rights Reserved.</span>
  </footer>
</body>
</html>