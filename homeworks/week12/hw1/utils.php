<?php
  require_once('conn.php');

  function countDiscussions() {
    global $conn;
    $result = $conn->query(
    'SELECT COUNT(id) as count FROM eshau_discussions'
    );
    $row = $result->fetch_assoc();
    $count = $row['count'];
    return $count;
  }
?>