<?php
  require_once('conn.php');
  // 取得圖片 src 後的字串(baseURL)，資料庫內有資料則回傳該字串；反之則回傳空字串
  function getHeadShot($username) {
    global $conn;
    $result = '';
    $sql = sprintf(
      "SELECT image FROM eshau_headshot WHERE username='%s'",
      $username
    );
    $getImageInfo = $conn->query($sql);

    if ($getImageInfo->num_rows === 1) {
      $img = $getImageInfo->fetch_assoc()['image'];
      $type = $getImageInfo->fetch_assoc()['type'];
      $result = 'data:' . $type . ';base64,' . $img;
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

  function getNickname($username) {
    global $conn;
    $sql = "SELECT nickname FROM eshau_users WHERE username=?";
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

  // 控制 admin_page 選擇權限的夏拉清單
  function AthorityChoice($authority) {
    $inputArray = array(
      'normal'=> '<option value="normal">normal</option>',
      'ban'=> '<option value="ban">ban</option>',
      'admin'=> '<option value="admin">admin</option>'
    );
    $result = '<option value="' . $authority . '" selected>' .
      $authority . '</option>';
    foreach ($inputArray as $key => $value) {
      if ($key !== $authority) {
        $result = $result . $value;
      }
    }
    return $result;
  }
  
  // 設定權限，回傳 array
  function getAuthority($authority, $cb) {
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
?>