<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  // 檢查使用者權限
  if ($_SESSION['authority'] !== 'admin') {
    header('Location: index.php');
    die();
  }

  $stmt = $conn->prepare(
    'SELECT '.
    'C.content as content, C.created_at as content_created_at, '.
    'C.is_deleted as content_deleted, C.id as content_id, '.
    'U.username as username, U.id as user_id, U.nickname as nickname, '.
    'U.created_at as user_created_at, U.authority as authority '.
    'FROM eshau_users as U LEFT JOIN eshau_comments as C '.
    'ON C.username = U.username '.
    'ORDER BY U.id ASC'
  );
  $result = $stmt->execute();
  $result = $stmt->get_result();
  // 用來控制重複的 user 資料
  $temp_username = '';
  $row = $result->fetch_assoc();
  
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
  <div class="button-block__member-btn admin-page no-login">
      <button class="member-block__btn" type="button" onclick="location.href='logout.php'">登出</button>
      <button class="member-block__btn" type="button" onclick="location.href='index.php'">首頁</button>
    </div>
  <main class="board-data">
    
    <table class="table">
      <tr>
        <th>UID</th>
        <th>使用者帳號</th>
        <th>使用者暱稱</th>
        <th>使用者權限</th>
        <th>創建日期</th>
      </tr>
      <?php 
        while($row = $result->fetch_assoc()) {
          $authority = json_decode($row['authority'], true);
          $authority = array_keys($authority)[0];
          // 換使用者才進行該區段
          if (!$temp_username ||
              $temp_username !== $row['username']) {
            $temp_username = $row['username'];
      ?>
      <form name="user-data" action="handle_userdata.php">
        <tr class="user-data">
          <td><?php echo $row['user_id']; ?></td>
          <td><?php echo $row['username']; ?></td>
          <td><?php echo $row['nickname']; ?></td>
          <td class="authority">
            <select class="authority-choice" onchange="this.form.submit()" name="choice">
              <?php
                echo AthorityChoice($authority);
                echo '<input class="nodisplay" name="id" value="' . $row['user_id'] . '" />';
              ?>
            </select>
          </td>
          <td><?php echo $row['user_created_at']; ?></td>
        </tr>
      </form>
        <tr class="comment-info nodisplay">
          <th>ID</th>
          <th class="words-title"colspan="2">留言內容</th>
          <th>刪除</th>
          <th>留言日期</th>
        </tr>
        <?php } ?>
        <tr class="comment-data nodisplay">
          <td><?php echo $row['content_id']; ?></td>
          <td class="words-area" colspan="2"><?php echo $row['content']; ?></td>
          <td>
            <?php
              if ($row['content_deleted'] === 1) {
                echo '刪除'; 
              } else {
                echo '未刪除';
              }
            ?>
          </td>
          <td><?php echo $row['content_created_at']; ?></td>
        </tr>
      <?php } ?>
    </table>
  </main>
  <script type='module'>
    
    import * as utils from './models/utils.js'
    // 計算留言內容的寬度
    const viewportWidth = window.innerWidth
    const contentWidth = viewportWidth * 0.8 * 0.4

    document.addEventListener('DOMContentLoaded', function() {
      // 對每個內容做檢查，超過即不換行與超出文字顯示「...」
      const wordsTitle = document.querySelector('.words-title')
      const wordsArea = document.querySelectorAll('.words-area')
      for (let elem of wordsArea) {
        let elemTextWidth = utils.displayTextWidth(elem.innerText, 'PingFang TC')
        if (elemTextWidth >= contentWidth) {
          elem.classList.add('words-hide')
        }
      }
      // 點擊顯示全文
      document.querySelector('.table')
        .addEventListener('click', function(e) {
        if (e.target.classList.contains('words-area')) {
          e.target.classList.toggle('words-hide')
        }
        // 對該使用者的文章內容做隱藏，點擊則顯示
        if (e.target.parentElement.classList.contains('user-data') && !e.target.classList.contains('authority')) {
          let targetUser = e.target.parentElement.nextElementSibling
          if (utils.isNextElementHide(targetUser, 'user-data')) {
          }
        }
      })
      const clickMemberBtn = document.querySelector('.button-block__member-btn')
      clickMemberBtn.addEventListener('click', function() {
        clickMemberBtn.classList.toggle('member-btn--click')
      })
    })
  </script>
</body>
</html>