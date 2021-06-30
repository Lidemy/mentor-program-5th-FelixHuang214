<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  $username = NULL;
  if ($_SESSION['username']) {
    $username = $_SESSION['username'];
    // 從資料庫判斷使用者的權限
    $sql = sprintf(
      "SELECT authority FROM eshau_users WHERE username='%s'",
      $username
    );
    $result = $conn->query($sql);
    if (!$result) {
      die('Error:' . $conn->error);
    }
    $authority = $result->fetch_assoc()['authority'];
    $authority = json_decode($authority, true);
    $current_status = key($authority);
    $_SESSION['authority'] = $current_status;
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
        <?php if ($username) { ?>
          <div class="button-block__member-btn no-login">
            <button class="member-block__btn" type="button" onclick="location.href='logout.php'">登出</button>
              <?php if ($current_status === 'admin') { ?>
                <button id="authority-page" class="member-block__btn" type="button" onclick="location.href='admin_page.php'">權限</button>
              <?php } ?>
         </div>
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
      <form method="POST" class="board__upload" id="data-update" action="upload.php"  enctype="multipart/form-data">
        <input type="file" id="file" class="nodisplay" name="file" />
        <?php  if (getHeadShot($username)) { ?>
          <label class="headshot-bg">
            <?php echo '<img src="' . getHeadShot($username) . '" />'; ?>
          </label>
          <label for="file" class="upload-body upload-body--hide">照片</label>
        <?php } else { ?>
          <label for="file" class="upload-body">照片</label>
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
          <span><?php echo '<input type="text" class="nodisplay" name="update_nickname" value="' . escape(getNickname($row['username'])) . '" />'; ?></span>

        </div>
        <div>註冊日期: <span><?php echo $row['created_at']; ?></span></div>
      </form>
    <?php } ?>
  </main>
  <section class="content-input">
      <?php if (!$username || $current_status === 'ban') { ?>
        <strong>
          <span>您無權使用留言功能</span>
        </strong>
      <?php } ?>
      <?php if ($username && $current_status !== 'ban') { ?>
        <form class="add-comments" method="POST" action="handle_add_comments.php">
          <textarea id="myTextarea" rows="3" name="content"></textarea>
          <?php if ($username) { ?>
            <div class="emoji cannotselect emoji--hide"></div>
            <input type="submit" />
              <?php if($_GET['errCode']) { ?>
                <span class="error-text"><?php echo $msg; ?>
              <?php } ?>
          <?php } ?>
        </form>
      <?php } ?>
  </section>
  <div class="comment-block">
    <?php
      $stmt = $conn->prepare(
        'SELECT count(id) as count FROM eshau_comments WHERE is_deleted IS NULL'
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $page = 1;
      if (!empty($_GET['page'])) {
        $page = intval($_GET['page']);
      }
      $items_per_pages = 10;
      // 跳過幾筆資料
      $offset = ($page - 1) * $items_per_pages;
      $total_pages = intval(ceil($count / $items_per_pages));
      $stmt = $conn->prepare(
       'SELECT '. 
       'C.id as id, C.content as content, '. 
       'C.created_at as created_at, U.nickname as nickname, '.
       'U.username as username FROM eshau_comments as C '.
       'LEFT JOIN eshau_users as U ON C.username = U.username '.
       'WHERE C.is_deleted IS NULL '.
       'ORDER BY C.id DESC '.
       'LIMIT ? OFFSET ?'
     );
      $stmt->bind_param('ii', $items_per_pages, $offset);
      $result = $stmt->execute();
      if (!$result) {
        die('Error:' . $conn->error);
      }
      $result = $stmt->get_result();

      while($row = $result->fetch_assoc()) {
        $haveHeadShot = getHeadShot($row['username']);
    ?>
    <div>
      <div class="comment-block__comment">
        <?php 
          if ($haveHeadShot) { 
            echo '<img class="comment__avatar" src="' . $haveHeadShot . '" />'; 
          } else { 
            echo '<div class="comment__avatar"></div>';
          }
        ?>
        <div class="comment__user-info">
          <span>
            <?php echo escape($row['nickname']); ?>
            (@<?php echo escape($row['username']); ?>) 
            </span>
          <span><?php echo $row['created_at']; ?></span>
          <?php if ($row['username'] === $username ||
                    $current_status === 'admin') { ?>
            <div class="comment-editor-btn">
              <a href="update_comment.php?id=<?php echo $row['id']; ?>">編輯</a>
              <a href="delete_comment.php?id=<?php echo $row['id']; ?>">刪除</a>
            </div>
          <?php } ?>
          <div class="user-info__talk"><?php echo escape($row['content']); ?></div>
        </div>
      </div>
    </div>
    <?php } ?>
    <div class="page-info">
      <span>總共有 <?php echo $count; ?> 筆留言，</span>
      <span>頁數：<?php echo $page . ' / ' . $total_pages; ?></sapn>
    </div>
    <div class="paginator">
      <a href="index.php?page=1">首頁</a>
      <?php if ($page !== 1) { ?>
        <a href="index.php?page=<?php echo $page - 1?>">上一頁</a>
      <?php } ?>
      <?php if ($page !== $total_pages) { ?>
        <a href="index.php?page=<?php echo $page + 1?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_pages ?>">最末頁</a>
      <?php } ?>
    </div>
  </div>

  <script type="module">
    import * as utils from './models/utils.js'
    const textarea = document.getElementById('myTextarea')
    const emoji = document.querySelector('.emoji')

    // 照片上傳及提交檔案
    document.getElementById('file').onchange = function(e) {
      document.getElementById('data-update').submit()
    }
    
    function init() {
      // 留言
      if (textarea) {
        emoji.innerHTML = utils.template.emoji
        emoji.addEventListener('click', (e) => {
          if(e.target.nodeName.toLowerCase() === 'span') {
            textarea.value += e.target.innerText
          }
        })

        textarea.addEventListener('focus', function() {
          emoji.classList.remove('emoji--hide')
        })
      }
      const originNickname = document.querySelector('.origin-nickname')
      const updateNickname = document.querySelector('input[name=update_nickname]')
      // 連點個人資料的 nickname 顯示輸入框
      originNickname.addEventListener('dblclick', function() {
          updateNickname.classList.remove('nodisplay')
        })
      // 點擊輸入框外將輸入框隱藏
      updateNickname.addEventListener('blur', function() {
          updateNickname.classList.add('nodisplay')
        })
      // 自動提交 nickname 表單
      updateNickname.addEventListener('change', function() {
        document.getElementById('data-update').submit()
        updateNickname.click()
      })

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