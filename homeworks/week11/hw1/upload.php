<?php
  session_start();
  require_once('utils.php');
  require_once('conn.php');
  $error = $_FILES['file']['error'];
  $nickname = $_POST['update_nickname'];
  if ($error !== 0 && empty($nickname)) {
    switch($error) {
      case '1':
        echo '超過了檔案大小，在php.ini檔案中設定';
        break;
      case '2':
        echo '超過了檔案的大小MAX_FILE_SIZE選項指定的值';
        break;
      case '3':
        echo '檔案只有部分被上傳';
        break;
      case '4':
        echo '沒有檔案被上傳';
        break;
      default:
        echo '上傳檔案大小為0';
    }
    header("Location: index.php?errCode=4");
  } else {
    $username = $_SESSION['username'];
    if ($nickname !== getNickname($username)) {
      $sql = "UPDATE eshau_users SET nickname=? WHERE username=?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('ss', $nickname, $username);
      $result = $stmt->execute();
      if (!$result) {
        die('Error:' . $conn->error);
      }
      header("Location: index.php");
      exit();
    }
    $type = $_FILES['file']['type'];
    $tmpname = $_FILES['file']['tmp_name'];
    // 判斷格式
    switch($type) {
      case 'image/jpeg':
        $safeType = true;
        $orgInfo = getimagesize($tmpname);
        $rsrOrg = imagecreatefromjpeg($tmpname);
        break;
      case 'image/gif':
        $safeType = true;
        $orgInfo = getimagesize($tmpname);
        $rsrOrg = imagecreatefromgif($tmpname);
        break;
      case 'image/png':
        $safeType = true;
        $orgInfo = getimagesize($tmpname);
        $rsrOrg = imagecreatefrompng($tmpname);
        break;
    }

    if ($safeType) {
      // 降低 byte
      $rsrScl = imagescale($rsrOrg, 680, 680, IMG_BICUBIC_FIXED);
      imagejpeg($rsrScl, $tmpname);
      imagedestroy($rsrOrg);
      imagedestroy($rsrScl);
      // print_r($tmpname);
      $file = fopen($tmpname, 'rb');
      $fileContent = fread($file, filesize($tmpname));
      // print_r(filesize($tmpname));
      // print_r($fileContent);
      fclose($file);
      $fileContent = base64_encode($fileContent);
      // 檢查資料庫是否已有圖片
      $check = $conn->query("SELECT eshau_headshot FROM image WHERE username='$username'");
      if ($check->num_rows === 1) {
        $sql = sprintf(
        "UPDATE eshau_headshot SET image='%s', type='%s' WHERE username='%s'",
        $fileContent,
        $type,
        $username
        );
      } else {
        $sql = sprintf(
        "INSERT INTO eshau_headshot(image, username, type)
          VALUES('%s', '%s', '%s')",
        $fileContent,
        $username,
        $type
        );
      }
      $result = $conn->query($sql);
      header("Location: index.php");
      //$check = move_uploaded_file($tmpname, 'upload/' . $username . $type);
    } else {
      header("Location: index.php?errCode=4");
    } 
  }
?>