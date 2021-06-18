<?php
  session_start();
  require_once('conn.php');
  $error = $_FILES['file']['error'];
  if ($error !== 0) {
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
    $type = $_FILES['file']['type'];
    $tmpname = $_FILES['file']['tmp_name'];
    $username = $_SESSION['username'];
    // 判斷格式
    switch($type) {
      case 'image/jpeg':
        $safeType = true;
        break;
      case 'image/gif':
        $safeType = true;
        break;
      case 'image/png':
        $safeType = true;
        break;
    }

    if ($safeType) {
      // 降低 byte
      // print_r($tmpname);
      $orgInfo = getimagesize($tmpname);
      $rsrOrg = imagecreatefromjpeg($tmpname);
      $rsrScl = imagescale($rsrOrg, 62, 62, IMG_BICUBIC_FIXED);
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
      $check = $conn->query("SELECT image FROM image WHERE username='$username'");
      if ($check->num_rows === 1) {
        $sql = sprintf(
        "UPDATE image SET image='%s', type='%s' WHERE username='%s'",
        $fileContent,
        $type,
        $username
        );

      } else {
        $sql = sprintf(
        "INSERT INTO image(image, username, type)
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