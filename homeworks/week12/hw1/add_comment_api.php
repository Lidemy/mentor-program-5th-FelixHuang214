<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (empty($_POST['content'])) {
    $obj = array(
      'connect' => false,
      'message' => 'Please input the nickname, content'
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  $nickname = empty($_POST['nickname']) ? 'anonymous' : $_POST['nickname'];
  $content = $_POST['content'];
  $site_key = $_POST['site_key'];
  $stmt = $conn->prepare(
    'INSERT INTO eshau_discussions(nickname, content, site_key)
      VALUES(?, ?, ?)'
  );
  $stmt->bind_param('sss', $nickname, $content, $site_key);
  $result = $stmt->execute();
  if (!$result) {
    $obj = array(
      'connect' => false,
      'message' => 'Server Not Responding'
    );
    $response = json_encode($obj);
    echo $response;
    die();
  }
  
  $discussions = array();
  array_push($discussions, array(
    'nickname' => $nickname,
    'content' => $content
  ));
  $obj = array(
    'connect' => true,
    'message' => 'success',
    'discussions' => $discussions
  );
  $response = json_encode($obj);
  echo $response;
?>