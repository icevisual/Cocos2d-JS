<?php

namespace Cocos\Utils;

class Common {

    
    public static function jsonDecode($json){
        $result = json_decode($json,1);
        if(json_last_error() === JSON_ERROR_NONE){
            return $result;
        }else{
            throw new \Cocos\Exceptions\CocosException("Json Decode Error!");
        }
    }
    
    
    
    /**
     * Indent Json String
     * @param String $json
     * @return mixed
     */
    public static function jsonIndent($json)
    {
        $result = '';
        $pos = 0;
        $strLen = strlen($json);
        $indentStr = '    ';
        $newLine = "\r\n";
        $prevChar = '';
        $outOfQuotes = true;
        for ($i = 0; $i <= $strLen; $i ++) {
            // Grab the next character in the string.
            $char = substr($json, $i, 1);
            // Are we inside a quoted string?
            if ($char == '"' && $prevChar != '\\') {
                $outOfQuotes = ! $outOfQuotes;
                // If this character is the end of an element,
                // output a new line and indent the next line.
            } else
                if (($char == '}' || $char == ']') && $outOfQuotes) {
                    $result .= $newLine;
                    $pos --;
                    for ($j = 0; $j < $pos; $j ++) {
                        $result .= $indentStr;
                    }
                }
            // Add the character to the result string.
            $result .= $char;
            // If the last character was the beginning of an element,
            // output a new line and indent the next line.
            if (($char == ',' || $char == '{' || $char == '[') && $outOfQuotes) {
                $result .= $newLine;
                if ($char == '{' || $char == '[') {
                    $pos ++;
                }
                for ($j = 0; $j < $pos; $j ++) {
                    $result .= $indentStr;
                }
            }
            $prevChar = $char;
        }
        return str_replace(':', ' : ', $result);
    }
}