<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');

  if (empty($_POST['todo_data'])) {
    $json = array(
      'connect' => false,
      'message' => '資料傳輸錯誤'
     );
    $response = json_encode($json);
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
    $json = array(
      'connect' => false,
      'message' => '資料傳輸錯誤'
    );
    $response = json_encode($json);
    echo $json;
    die();
  }
  $id = $conn->insert_id;
  $json = array(
    'connect' => true,
    'message' => 'SUCCESS!',
    'id' => $id

  );
  $response = json_encode($json);
  echo $response;
?>