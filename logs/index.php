<?php

$logFile = 'log-'.date('Y-m-d').'.log';
$fp =  fopen($logFile,'a+');
$message = isset($_GET['message'])? $_GET['message']:'Nothing';
$message = '['.date('Y-m-d H:i:s')."] $message".PHP_EOL;
fwrite($fp,$message);
fclose($fp);

