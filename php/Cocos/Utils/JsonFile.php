<?php

namespace Cocos\Utils;

use Cocos\Exceptions\CocosException;

class JsonFile {
    
    protected $fullname;

    public function getFullname(){
        return $this->fullname;
    }

    public function __construct($fullname ){
        $this->fullname = $fullname;
        if(!is_file($this->fullname)){
            throw new CocosException("File [{$this->fullname}] Not Found.", 1);
        }
    }
    
    public function updateByKey($key, $value){
        $filename = $this->getFullname();
        $content = file_get_contents($filename);
        $jsonData = Common::jsonDecode($content);
        $jsonData[$key] = $value;
        $jsonStr = json_encode($jsonData, JSON_UNESCAPED_SLASHES);
        $jsonStr = Common::jsonIndent($jsonStr);
        file_put_contents($filename, $jsonStr);
    }
    
}