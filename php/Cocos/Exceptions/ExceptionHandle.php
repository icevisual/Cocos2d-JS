<?php

namespace Cocos\Exceptions;


class ExceptionHandle {
    
    
    public static function handle($exception){
        if($exception instanceof  \Cocos\Exceptions\CocosException){
            echo PHP_EOL."\r  [ Exception ] message: ".$exception->getMessage().PHP_EOL;
        }else{
            throw $exception;
        }
        return true;
    }
    
    
    public static function register(){
        set_exception_handler(array(__CLASS__, 'handle'));
    }
    
}