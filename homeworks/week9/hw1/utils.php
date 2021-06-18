<?php
  require_once('conn.php');

  function getHeadShot($nickname) {
    global $conn;
    $result = '';
    $getUsername = $conn->query("SELECT username FROM users WHERE nickname='$nickname'");
    $username = $getUsername->fetch_assoc()['username'];
    $getImageInfo = $conn->query("SELECT image FROM image WHERE username='$username'");
    if ($getImageInfo->num_rows === 1) {
      $img = $getImageInfo->fetch_assoc()['image'];
      $type = $getImageInfo->fetch_assoc()['type'];
      $result = '"data:' . $type . ';base64,' . $img;
    }
    return $result;
  }

  function errCodeText($code) {
    switch ($code) 
    {
    case '1':
      $msg = '輸入內容不可為空';
      break;
    case '2':
      $msg = '帳號或密碼錯誤';
      break;
    case '3':
      $msg = '帳號重複請重新輸入';
      break;
    case '4':
      $msg = '圖片上傳錯誤請重新上傳';
      break;
    default:
      $msg = '未知錯誤請洽網站管理員';    
    }
    
    return $msg;
  }

?>