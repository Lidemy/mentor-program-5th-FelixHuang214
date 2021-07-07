<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $obj = array(
      'connect' => false,
      'message' => 'no id'
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  $todo_id = intval($_GET['id']);
  $stmt = $conn->prepare(
    'SELECT todo_data FROM eshau_todo WHERE id=?'
  );
  $stmt->bind_param('i', $todo_id);
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
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    $obj = array(
      'connect' => false,
      'message' => 'id error'
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  $row = $result->fetch_assoc();
  $todo_data = $row['todo_data'];

  $obj = array(
      'connect' => true,
      'message' => 'SUCCESS!',
      'todo_data' => $todo_data
    );
  $response = json_encode($obj);

  echo $response;
?>