<?php
  session_start();
  require_once('conn.php');

  $username = NULL;
  if ($_SESSION['username']) {
    $username = $_SESSION['username'];
  }
  // 判斷其他網頁回傳的錯誤資訊
  if($_GET['errCode']) { 
    $code = $_GET['errCode'];
    $msg = '未知錯誤請洽網站管理員';

    switch ($code) 
    {
    case '1':
      $msg = '輸入內容不可為空';
      break;
    case '2':
     $msg = '帳密及密碼錯誤';
     break;
    }
  }

  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css" />
  <title>留言板</title>
</head>
<body>
  <header>
    <strong>
      注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </strong>
  </header>
  <main class="board">
    <form class="board__member-block" method="POST" action="handle_login.php">
      <div>
        <?php if ($username) { ?>
          <button class="member-block__btn" type="button" onclick="location.href='logout.php'">登出</button>
        <?php } ?>
        <?php if (!$username) { ?>
          <input class="member-block__btn" type="submit" value="登入" />
          <button class="member-block__btn" type="button" onclick="location.href='register.php'">註冊</button>
        <?php } ?>
      </div>
      <div class="board__input-block">
        <?php if (!$username) { ?>
          <div>帳號：<input type="text" name="username" /></div>
          <div>密碼：<input type="password" name="password" /></div>
          <span><?php echo $msg; ?></span>
        <?php } ?>      
      </div>
    </form>
    <h1 class="board__title">Comments</h1>
    <?php?>
    <?php if ($username) { ?>
      <form class="board__upload" method="POST" action="upload.php" enctype="multipart/form-data">
        <!-- 上傳照片(未完成)
        <input type="file" id="file" class="nodisplay" />
        <label for="file" class="upload-body">照片</label>
        <input type="submit" />
        -->
        <h3>個人資料</h3>
        <?php 
          $sql = sprintf("SELECT * FROM eshau_users WHERE username='%s'", $username);
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
        ?>
        <div>帳號: <span><?php echo $row['username']; ?></span></div>
        <div>暱稱: <span><?php echo $row['nickname']; ?></span></div>
        <div>註冊日期: <span><?php echo $row['created_at']; ?></span></div>
      </form>
    <?php } ?>
  </main>
  <div class="comment-block">
    <!-- 抓取資料庫的 comments 資料-->
    <?php
      $result = $conn->query("SELECT * FROM eshau_comments");
      while($row = $result->fetch_assoc()) { 
    ?>
    <div>
      <div class="comment-block__comment">
        <div class="comment__avatar"></div>
        <div class="comment__user-info">
          <span><?php echo $row['nickname']; ?></span>
          <span><?php echo $row['created_at']; ?></span>
          <div class="user-info__talk"><?php echo $row['content']; ?></div>
        </div>
      </div>
    </div>
    <?php } ?>
  </div>
  <section class="content-input">
    <form method="POST" action="handle_add_comments.php">
      <?php if (!$username) { ?>
        <strong>
          <span>加入會員才可以使用該功能</span>
        </strong>
      <?php } ?>
      <textarea rows="1" name="content"></textarea>
        <?php if (!$username) { ?>
          <input type="button" value="提交" />
        <?php } ?>
        <?php if ($username) { ?>
          <input type="submit" />
        <?php } ?>
    </form>
  </section>

  
</body>
</html>