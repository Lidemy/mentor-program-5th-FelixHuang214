<?php
  require_once('conn.php');
  require_once('utils.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['site_key'])) {
    $obj = array(
      'connect' => false,
      'message' => 'Please input site_key'
    );

    $response = json_encode($obj);
    echo $response;
    die();
  }
  $count = countDiscussions();
  if (!empty($_GET['offset'])) {
    $offset = intval($_GET['offset']);
  }
  $site_key = $_GET['site_key'];
  $stmt = $conn->prepare(
    'SELECT nickname, content, created_at FROM eshau_discussions
      WHERE site_key=? ORDER BY id DESC LIMIT 5 OFFSET ?'
  );
  $stmt->bind_param('si', $site_key, $offset);
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
  $result = $stmt->get_result();
  $discussions = array();
  while ($rows = $result->fetch_assoc()) {
    array_push($discussions, array(
      'nickname' => $rows['nickname'],
      'content' => $rows['content'],
      'created_at' => $rows['created_at']
    ));
  }
  $obj = array(
    'connect' => true,
    'message' => 'success',
    'discussions' => $discussions
  );
  // 判斷是否可以繼續加載資料
  if ($offset + 5 >= $count){
    $obj['content'] = 'all';
  }
  $response = json_encode($obj);
  echo $response;
?>