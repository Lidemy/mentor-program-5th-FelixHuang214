<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $username = NULL;
  if ($_SESSION['username']) {
    $username = $_SESSION['username'];
  }
  // 判斷其他網頁回傳的錯誤資訊
  if($_GET['errCode']) { 
    $msg = errCodeText($_GET['errCode']);
  } 
?>
<!DOCTYPE html>
<html>
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
      <form method="POST" class="board__upload" id="img-load" action="upload.php"  enctype="multipart/form-data">
        <input type="file" id="file" class="nodisplay" name="file" />
        <label for="file" class="upload-body">照片</label>
        <h3>個人資料</h3>
        <?php 
          $sql = sprintf("SELECT * FROM users WHERE username='%s'", $username);
          $result = $conn->query($sql);
          $row = $result->fetch_assoc();
        ?>
        <div>帳號: <span><?php echo $row['username']; ?></span></div>
        <div>暱稱: <span><?php echo $row['nickname']; ?></span></div>
        <div>註冊日期: <span><?php echo $row['created_at']; ?></span></div>
      </form>
    <?php } ?>
  </main>
  <section class="content-input">
    <form method="POST" action="handle_add_comments.php">
      <?php if (!$username) { ?>
        <strong>
          <span>加入會員才可以使用該功能</span>
        </strong>
      <?php } ?>
      <textarea id="myTextarea" rows="3" name="content"></textarea>
        <?php if ($username) { ?>
          <div class="emoji emoji--hide">
          </div>
          <?php if($_GET['errCode']) { ?>
            <span><?php echo $msg; ?>
          <?php } ?>
        <?php } ?>
    </form>
  </section>
  <div class="comment-block">
    <?php
      $result = $conn->query("SELECT * FROM comments ORDER BY id DESC");
      while($row = $result->fetch_assoc()) {
        $haveHeadShot = getHeadShot($row['nickname']);
        /* 上傳照片最初寫法
        $getUsername = $conn->query("SELECT username FROM users WHERE nickname='$nickname'");
        $username = $getUsername->fetch_assoc()['username'];
        $data = $conn->query("SELECT image FROM image WHERE username='$username'");
        if ($data->num_rows === 1) {
          $img = $data->fetch_assoc()['image'];
          $type = $data->fetch_assoc()['type'];
          $isHeadShot = true;
        } else {
          $isHeadShot = false;
        }
        */
    ?>
    <div>
      <div class="comment-block__comment">
        <?php 
          if ($haveHeadShot) { 
            echo '<img class="comment__avatar" src=' . $haveHeadShot . '" />'; 
          } else { 
            echo '<div class="comment__avatar"></div>';
          }
        ?>
        <div class="comment__user-info">
          <span><?php echo $row['nickname']; ?></span>
          <span><?php echo $row['created_at']; ?></span>
          <div class="user-info__talk"><?php echo $row['content']; ?></div>
        </div>
      </div>
    </div>
    <?php } ?>
  </div>
  <script>
    const textarea = document.getElementById('myTextarea')
    const emoji = document.querySelector('.emoji')
    const template = 
    {
      emoji: `
        <span>&#x1F601</span><span>&#x1F602</span><span>&#x1F609</span>
        <span>&#x1F622</span><span>&#x1F623</span><span>&#x1F647</span>
        <span>&#x1F64F</span><span>&#x2764</span><span>&#x2753</span>
        <span>&#x2757</span><span>&#x1F680</span><span>&#x26BD</span>
        <span>&#x26C4</span><span>&#x1F382</span><span>&#x1F3B5</span>
        <input type="submit" />
      `
    }

    emoji.addEventListener('click', (e) => {
      if(e.target.nodeName.toLowerCase() === 'span') {
        textarea.value += e.target.innerText
      }
    })
    // 點擊 textarea 時顯示表情區
    textarea.addEventListener('focus', function() {
        emoji.classList.remove('emoji--hide')
      })
    // 照片上傳及提交檔案
    
    document.getElementById('file').onchange = function(e) {
      document.getElementById('img-load').submit()
    }
    
    function init() {
      emoji.innerHTML = template.emoji
    }

    document.addEventListener('DOMContentLoaded', init)

    
  </script>
</body>
</html>