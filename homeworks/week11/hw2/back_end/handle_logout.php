<?php
  session_start();
  $_SESSION = array();
  if ($_COOKIE[session_name()]) {
    setcookie(session_name(), '', time() - 3600, '/');
  }
  session_destroy();
  header('Location: ../index.php');
?>