<?php
  session_start();
  require_once('conn.php');
  print_r($_POST['content']);
  if (empty($_POST['content'])) {
    header("Location: index.php?errCode=1");
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
  $username = $row['username'];
  // 將文章內容加入資料庫
  $sql = "INSERT INTO eshau_comments(username, content)
      VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if(!$result) {
    header("Location: index.php?errCode=3");
    die($conn->error);
  } else {
    header("Location: index.php");
  }
?>