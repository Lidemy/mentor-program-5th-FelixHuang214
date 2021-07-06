<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');

  if (empty($_GET['id'])) {
    $json = array(
      'connect' => false,
      'message' => 'no id'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $todo_id = $_GET['id'];
  $stmt = $conn->prepare(
    'SELECT todo_data FROM eshau_todo WHERE id=?'
  );
  $stmt->bind_param('s', $todo_id);
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
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    $json = array(
      'connect' => false,
      'message' => 'id error'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $row = $result->fetch_assoc();
  $todo_data = $row['todo_data'];

  $json = array(
      'connect' => true,
      'message' => 'SUCCESS!',
      'todo_data' => $todo_data
    );
  $response = json_encode($json);

  echo $response;
?>