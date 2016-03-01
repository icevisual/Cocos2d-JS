<?php

include 'AutoLoader.php';


defined('DS') or define('DS', DIRECTORY_SEPARATOR);

function dump($expression){
    return var_dump($expression);
}

function edump($expression){
    dump($expression);exit;
}


Cocos\Autoloader::register();

Cocos\Exceptions\ExceptionHandle::register();
