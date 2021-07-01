<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 未登入
  if (empty($_SESSION['username'])) {
    header('Location: ../index.php');
    die();
  }
  if (
    empty($_POST['content']) ||
    empty($_POST['title']) ||
    empty($_POST['type'])
  ) {
    header('Location: ../add_article.php?err_code=1');
    die();
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $title = $_POST['title'];
  $type = $_POST['type'];
  $stmt = $conn->prepare(
    'INSERT INTO eshau_article(username, content, title, type) 
      VALUES(?, ?, ?, ?)'
  );
  $stmt->bind_param('ssss', $username, $content, $title, $type);
  $result = $stmt->execute();
  if (!$result) {
    // 未成功將資料匯入資料庫
    header('Location: ../add_article.php?err_code=5');
    die('Error: ' . $conn->error);
  }
  header('Location: ../index.php?');

?>