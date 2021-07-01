<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  if (
    empty($_POST['username']) ||
    empty($_POST['password']) ||
    empty($_POST['nickname'])
  ) {
    header('Location: ../register.php?err_code=1');
    die();
  }
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  print_r($password);
  $nickname = $_POST['nickname'];
  $authority = setAuthority('normal', $addAuthority = function($elseAuthority) {
    // 放入其他權限(待完成)
  });
  $authority = json_encode($authority);
  $stmt = $conn->prepare(
    'INSERT eshau_users(username, password, nickname, authority) VALUES(?, ?, ?, ?)'
  );
  $stmt->bind_param('ssss', $username, $password, $nickname, $authority);
  $result = $stmt->execute();
  if (!$result) {
    header('Location: ../register.php?err_code=3');
    die('Error: ' . $conn->error);
  }
  $_SESSION['username'] = $username;
  header('Location: ../index.php');
?>