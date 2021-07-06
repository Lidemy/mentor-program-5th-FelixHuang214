<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');

  $todo_id = $_GET['id'];
  $todo_data = $_POST['todo_data'];
  $stmt = $conn->prepare(
    'UPDATE eshau_todo SET todo_data=? WHERE id=?'
  );
  $stmt->bind_param('ss', $todo_data, $todo_id);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      'connect' => false,
      'message' => 'server error'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  if ($stmt->affected_rows === 0) {
    $json = array(
      'connect' => false,
      'message' => 'id error'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $json = array(
      'connect' => true,
      'message' => 'SUCCESS!'
    );
  $response = json_encode($json);
  echo $response;
?>