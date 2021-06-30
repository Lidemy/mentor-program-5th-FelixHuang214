<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $username = NULL;
  if ($_SESSION['username']) {
    $username = $_SESSION['username'];
    $current_status = $_SESSION['authority'];
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
      <div class=board__button-block>
          <div class="button-block__member-btn no-login">
            <button class="member-block__btn" type="button" onclick="location.href='logout.php'">登出</button>
            <button id="authority-page" class="member-block__btn" type="button" onclick="location.href='index.php'">首頁</button>
         </div>
      </div>
    </form>
    <h1 class="board__title">編輯留言</h1>
    <form method="POST" class="board__upload" id="data-update" action="upload.php"  enctype="multipart/form-data">
      <?php  if (getHeadShot($username)) { ?>
        <label class="headshot-bg">
          <?php echo '<img src="' . getHeadShot($username) . '" />'; ?>
        </label>
      <?php } ?>
      <h3>個人資料</h3>
      <?php 
        $sql = "SELECT * FROM eshau_users WHERE username=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        if (!$result) {
          die('Error:' . $conn->error);
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
      ?>
      <div>帳號: <span><?php echo escape($row['username']); ?></span></div>
      <div class="nickname">暱稱: 
        <span class="origin-nickname"><?php echo escape(getNickname($row['username']));?></span>
        <span><?php echo '<input type="text" class="hidden" name="update_nickname" value="' . escape(getNickname($row['username'])) . '" />'; ?></span>

      </div>
      <div>註冊日期: <span><?php echo $row['created_at']; ?></span></div>
    </form>
  </main>
  <section class="content-input">
    <form class="add-comments" method="POST" action="handle_update_comment.php">
      <?php
        $id = $_GET['id'];
        // admin 及文章作者可修改該文章
        if ($current_status === 'admin') {
          $sql = sprintf(
            "SELECT * FROM eshau_comments WHERE id=?"
          );
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('i', $id);
        } else {
          $sql = sprintf(
            "SELECT * FROM eshau_comments WHERE id=? AND username=? AND is_deleted IS NULL"
          );
          $stmt = $conn->prepare($sql);
          $stmt->bind_param('is', $id, $username);
        }

        $result = $stmt->execute();
        if(!$result) {
          die('Error:' . $conn->error);
        }
        // 沒有結果跳回首頁 ex: 文章已被刪除、無權限修改等
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
          header('Location: index.php');
          die();
        }
        $row = $result->fetch_assoc();
      ?>
      <textarea id="myTextarea" rows="3" name="content"><?php echo $row['content']; ?></textarea>
      <input type="hidden" name="id" value="<?php echo $id; ?>" />
        <?php if ($username) { ?>
          <div class="emoji emoji--hide"></div>
          <input type="submit" />
          <?php if($_GET['errCode']) { ?>
            <span><?php echo $msg; ?>
          <?php } ?>
        <?php } ?>
    </form>
  </section>
  <script type="module">
    import * as utils from './models/utils.js'
    const textarea = document.getElementById('myTextarea')
    const emoji = document.querySelector('.emoji')
    
    emoji.addEventListener('click', (e) => {
      if(e.target.nodeName.toLowerCase() === 'span') {
        textarea.value += e.target.innerText
      }
    })
    // 點擊 textarea 時顯示表情區
    textarea.addEventListener('focus', function() {
        emoji.classList.remove('emoji--hide')
      })
  
    function init() {
      emoji.innerHTML = utils.template.emoji
      // 點擊功能顯示按鈕
      const clickBtn = document.querySelector('.button-block__member-btn')
      clickBtn.addEventListener('click', function() {
        clickBtn.classList.toggle('member-btn--click')
      })
    }

    document.addEventListener('DOMContentLoaded', init)    
  </script>
</body>
</html>