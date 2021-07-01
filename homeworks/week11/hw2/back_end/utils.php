<?php
  require_once('conn.php');

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

  function getNickname($username) {
    global $conn;
    $sql = 'SELECT nickname FROM eshau_users WHERE username=?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    $nickname = $result->fetch_assoc()['nickname'];
    return $nickname;
  }

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }
  
  // 設定權限，回傳 array
  function setAuthority($authority, $cb) {
    $normal = array(
      "normal" =>array("add"=> 1, "del"=> 1, "edit"=> 1)
    );
    $ban = array(
      "ban" =>array("add"=> 0, "del"=> 1, "edit"=> 1)
    );
    $admin = array(
      "admin" =>array("add"=> "all", "del"=> "all", "edit"=> "all")
    );
    switch ($authority) {
      case 'ban':
        $result = $ban;
        break;
      case 'admin':
        $result = $admin;
        break;
      default:
        $result = $normal;
    }
    if ($cb) {
      // 放入其他權限(待完成)
    }
    return $result;
  }

  function getAuthority($username) {
    global $conn;
    
    $stmt = $conn->prepare(
      'SELECT authority FROM eshau_users WHERE username=?'
    ); 
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      header('Location: ../index.php');
      die();
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $authority = json_decode($row['authority']);
    return key($authority);
  }

  function getAlert($errcode) {
    $result = "<script>alert('";
    switch ($errcode) {
      case '1':
        $result .= '輸入欄會不可為空！';
        break;
    }
    $result .= "')</script>";
    return $result;
  }
?>