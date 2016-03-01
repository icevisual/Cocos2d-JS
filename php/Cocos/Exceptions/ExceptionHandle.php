<?php

namespace Cocos\Exceptions;


class ExceptionHandle {
    
    
    public static function handle(callable $callable){
        // TODO : Exception Handle 
        try{
            $callable();
        }catch(\Cocos\Exceptions\CocosException $e){
            echo PHP_EOL."\r  [ Exception ] message: ".$e->getMessage().PHP_EOL;
        }
    }
    
}