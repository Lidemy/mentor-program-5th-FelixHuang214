<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  // 未登入
  if (empty($_SESSION['username'])) {
    header('Location: ../index.php');
    die();
  }

  $username = $_SESSION['username'];
  $authority = getAuthority($username);
  $id = intval($_GET['id']);
  if ($authority === 'admin') {
    $stmt = $conn->prepare(
      'UPDATE eshau_article SET is_deleted=1 WHERE id=?'
    );
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare(
      'UPDATE eshau_article SET is_deleted=1 WHERE id=? AND username=?'
    );
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    header('Location: admin.php');
    die();
  }
  header('Location: ../admin.php');
?>