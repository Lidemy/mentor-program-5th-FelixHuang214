<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['todo_data'])) {
    $obj = array(
      'connect' => false,
      'message' => '資料傳輸錯誤'
     );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  $todo_data = $_POST['todo_data'];
  $stmt = $conn->prepare(
    'INSERT INTO eshau_todo(todo_data) VALUES(?)'
  );
  $stmt->bind_param('s', $todo_data);
  $result = $stmt->execute();
  if (!$result) {
    $obj = array(
      'connect' => false,
      'message' => '資料傳輸錯誤'
    );
    $response = json_encode($obj);
    echo $obj;
    die();
  }
  $id = $conn->insert_id;
  $obj = array(
    'connect' => true,
    'message' => 'SUCCESS!',
    'id' => $id

  );
  $response = json_encode($obj);
  echo $response;
?>