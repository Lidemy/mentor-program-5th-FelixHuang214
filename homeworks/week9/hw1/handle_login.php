<?php
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
    header("Location: index.php?errCode=1");
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
    "SELECT * FROM eshau_users WHERE username='%s' AND password='%s'",
    $username,
    $password
  );

  $result = $conn->query($sql);
  if (!$result->num_rows >= 1) {
    header("Location: index.php?errCode=2");
  } else {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  }


?>