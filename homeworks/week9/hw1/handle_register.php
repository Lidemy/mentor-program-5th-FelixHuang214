<?php
  require_once('conn.php');

  // 判斷輸入值是否為空
  if (
    empty($_POST['username']) ||
    empty($_POST['password']) ||
    empty($_POST['nickname'])
  ) {
    header("Location: register.php?errCode=1");
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  // 將會員資料加入資料庫
  $sql = sprintf(
    "INSERT INTO users(username, password, nickname)
      VALUES('%s', '%s', '%s')",
    $username,
    $password,
    $nickname
  );
  $result = $conn->query($sql);

  // 判斷輸入的值是否符合資料庫條件
  if (!$result) {
    header("Location: register.php?errCode=3");
  } else {
    header("Location: index.php");
  }



?>