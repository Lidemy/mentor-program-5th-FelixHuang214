<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errCode&id=' . $_POST['id']);
    die('資料不齊全');
  }

  $id = $_POST['id'];
  $content = $_POST['content'];
  $sql = 'UPDATE eshau_comments SET content=? WHERE id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  header('Location: index.php');
?>