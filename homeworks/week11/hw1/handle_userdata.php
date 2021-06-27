<?php
  session_start();
  require_once('utils.php');
  require_once('conn.php');
  
  $user_id = $_GET['id'];
  $user_authority = $_GET['choice'];
  // 修改權限
  $authority = getAuthority($user_authority, $addAuthority = function($elseAuthority) {
    // 放入其他權限(待完成)
  });
  $authority = json_encode($authority);
  $stmt = $conn->prepare(
    'UPDATE eshau_users SET authority=?  WHERE id=?'
  );
  $stmt->bind_param('si', $authority, $user_id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  header('Location: admin_page.php')
?>