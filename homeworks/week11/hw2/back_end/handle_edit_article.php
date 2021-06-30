<?php 
  session_start();
  require_once('conn.php');

  if (
    empty($_POST['content']) ||
    empty($_POST['title']) ||
    empty($_POST['type'])
  ) {
    header('Location: ../edit.php');
    die();
  }

  $res_url = $_SESSION['res_url'];
  $id = $_GET['id'];
  $content = $_POST['content'];
  $title = $_POST['title'];
  $type = $_POST['type'];
  $stmt = $conn->prepare(
    'UPDATE eshau_article SET content=?, title=?, type=? WHERE id=? AND is_deleted IS NULL'
  );
  $stmt->bind_param('sssi', $content, $title, $type, $id);
  $result = $stmt->execute();
  if (!$result) {
    header("Location: inex.php");
    die();
  }
  header("Location: $res_url");
?>