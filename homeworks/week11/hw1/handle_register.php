<?php
  require_once('conn.php');
  require_once('utils.php');
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
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $nickname = $_POST['nickname'];
  $authority = getAuthority('normal', $addAuthority = function($elseAuthority) {
    // 放入其他權限(待完成)
  });
  $authority = json_encode($authority);
  // 將會員資料加入資料庫
  $sql = "INSERT INTO eshau_users(username, password, nickname, authority)
    VALUES(?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssss', $username, $password, $nickname, $authority);
  $result = $stmt->execute();

  // 判斷輸入的值是否符合資料庫條件
  if (!$result) {
    header("Location: register.php?errCode=3");
  } else {
    header("Location: index.php");
  }

?>