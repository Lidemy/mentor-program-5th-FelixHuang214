<?php
  session_start(); 
  require_once('conn.php');

  $username = $_SESSION['username'];
  $current_status = $_SESSION['authority'];
  $id = $_GET['id'];
  // admin 及文章作者可刪除該文章
  if ($current_status === 'admin') {
    $sql = 'UPDATE eshau_comments SET is_deleted=1 WHERE id=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'UPDATE eshau_comments SET is_deleted=1 WHERE id=? AND username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  header('Location: index.php');
?>