<?php
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['password']) ||
    empty($_POST['username'])
  ) {
    // 輸入內容為空
    header('Location: ../login.php?err_code=1');
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  // 在資料庫搜尋該帳戶
  $stmt = $conn->prepare(
    'SELECT password FROM eshau_users WHERE username=?'
  );
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  if ($result->row_nums === 0) {
    // 無此帳戶資料
    header('Location: ../login.php');
    die('Error:' . $conn->error);
  }
  $row = $result->fetch_assoc();
  // 密碼比對失敗
  if (!password_verify($password, $row['password'])) {
    header('Location: ../login.php?err_code=2');
    die();
  }
  // 密碼比對成功
  $_SESSION['username'] = $username;
  header('Location: ../index.php');

?>