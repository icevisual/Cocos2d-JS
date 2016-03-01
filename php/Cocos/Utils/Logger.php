<?php

namespace Cocos\Utils;

class Logger {
    
    public static function log(){
        
        echo __CLASS__.PHP_EOL;
        
    }
    
    public static function run($dir, $message = NULL){
        $dir = trim($dir,'/');
        $logFile = $dir.'/log-' . date('Y-m-d') . '.log';
        $fp = fopen($logFile, 'a+');
        $message || $message = 'Nothing';
        $message = '[' . date('Y-m-d H:i:s') . "] $message" . PHP_EOL;
        fwrite($fp, $message);
        fclose($fp);
    }
    
}