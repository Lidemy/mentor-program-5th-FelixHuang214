<?php
  session_start();
  require_once('conn.php');
  print_r($_POST['content']);
  if (empty($_POST['content'])) {
    header("Location: index.php?errCode=1");
    die();
  }
  $content = htmlentities($_POST['content']);
  // 取得 nickname
  $username = $_SESSION['username'];
  $sql = sprintf(
    "SELECT * FROM users WHERE username='%s'",
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  // 將資料加入資料庫
  $sql = sprintf(
    "INSERT INTO comments(nickname, content)
      VALUES('%s', '%s')",
    $nickname,
    $content
  );
  $result = $conn->query($sql);
  if(!$result) {
    header("Location: index.php?errCode=3");
  } else {
    header("Location: index.php");
  }
?>