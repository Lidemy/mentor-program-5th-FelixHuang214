<?php 
  session_start();
  require_once('conn.php');

  // 未登入
  if (empty($_SESSION['username'])) {
    header('Location: ../index.php');
    die();
  }
  $id = $_GET['id'];
  if (
    empty($_POST['content']) ||
    empty($_POST['title']) ||
    empty($_POST['type'])
  ) {
    header("Location: ../edit.php?id=$id&err_code=1");
    die();
  }
  $res_url = $_SESSION['res_url'];
  if (empty($res_url)) {
    $res_url = '../index.php';
  }
  $content = $_POST['content'];
  $title = $_POST['title'];
  $type = $_POST['type'];
  $stmt = $conn->prepare(
    'UPDATE eshau_article SET content=?, title=?, type=? WHERE id=? AND is_deleted IS NULL'
  );
  $stmt->bind_param('sssi', $content, $title, $type, $id);
  $result = $stmt->execute();
  if (!$result) {
    header("Location: ../edit.php?id=$id&err_code=5");
    die();
  }
  header("Location: $res_url");
?>