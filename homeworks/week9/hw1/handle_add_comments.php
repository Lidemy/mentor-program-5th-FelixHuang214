<?php
  session_start();
  require_once('conn.php');

  if (empty($_POST['content'])) {
    header('index.php?errCode=3');
    die();
  }

  $content = $_POST['content'];
  // 取得 nickname
  $username = $_SESSION['username'];
  $sql = sprintf(
    "SELECT * FROM eshau_users WHERE username='%s'",
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  // 將資料加入資料庫
  $sql = sprintf(
    "INSERT INTO eshau_comments(nickname, content)
      VALUES('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  header("Location: index.php")
?>