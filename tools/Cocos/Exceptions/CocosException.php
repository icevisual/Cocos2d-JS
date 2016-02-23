<?php
namespace Cocos\Exceptions;

class CocosException extends \Exception
{

    public function __construct($message = null, $code = null, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}