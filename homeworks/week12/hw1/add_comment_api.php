<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  
  if (empty($_POST['content'])) {
    $json = array(
      'connect' => false,
      'message' => 'Please input the nickname, content'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $nickname = empty($_POST['nickname']) ? 'anonymous' : $_POST['nickname'];
  //$nickname = $_POST['nickname'];
  $content = $_POST['content'];
  $site_key = $_POST['site_key'];
  $stmt = $conn->prepare(
    'INSERT INTO discussions(nickname, content, site_key)
      VALUES(?, ?, ?)'
  );
  $stmt->bind_param('sss', $nickname, $content, $site_key);
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      'connect' => false,
      'message' => 'Server Not Responding'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $discussions = array();
  array_push($discussions, array(
    'nickname' => $nickname,
    'content' => $content
  ));
  $json = array(
    'connect' => true,
    'message' => 'success',
    'discussions' => $discussions
  );
  $response = json_encode($json);
  echo $response;
?>