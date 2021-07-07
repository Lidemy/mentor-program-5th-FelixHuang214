<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $todo_id = intval($_GET['id']);
  $todo_data = $_POST['todo_data'];
  $stmt = $conn->prepare(
    'UPDATE eshau_todo SET todo_data=? WHERE id=?'
  );
  $stmt->bind_param('si', $todo_data, $todo_id);
  $result = $stmt->execute();
  if (!$result) {
    $obj = array(
      'connect' => false,
      'message' => 'server error'
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  if ($stmt->affected_rows === 0) {
    $obj = array(
      'connect' => false,
      'message' => 'content not change '
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  $obj = array(
      'connect' => true,
      'message' => 'SUCCESS!'
    );
  $response = json_encode($obj);
  echo $response;
?>