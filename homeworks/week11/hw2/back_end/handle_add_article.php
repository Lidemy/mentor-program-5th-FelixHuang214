<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_SESSION['username'])) {
    // 未登入
    header('Location: ../index.php');
    die();
  }
  if (
    empty($_POST['content']) ||
    empty($_POST['title']) ||
    empty($_POST['type'])
  ) {
    header('Location: ../add_article.php');
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
    //header('Location: ../add_article.php');
    die('Error: ' . $conn->error);
  }
  header('Location: ../index.php');

?>