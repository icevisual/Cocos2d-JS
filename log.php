<?php

include 'tools/Cocos/core.php';

$message = isset($_GET['message']) ? $_GET['message'] : '';

Cocos\Utils\Logger::run(__DIR__.'/logs',$message);