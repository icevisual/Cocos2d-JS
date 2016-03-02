<?php

namespace Cocos\Utils;

use Cocos\Exceptions\CocosException;

class JsonFile {
    
    protected $fullname;
    
    protected $jsonData = [];
    
    public function __construct($fullname ){
        $this->fullname = $fullname;
        if(!is_file($this->fullname)){
            throw new CocosException("File [{$this->fullname}] Not Found.", 1);
        }
        $filename = $this->getFullname();
        $content = file_get_contents($filename);
        $this->jsonData = Common::jsonDecode($content);
    }

    public function getFullname(){
        return $this->fullname;
    }
    
    public function setData($key , $value){
        $this->jsonData[$key] = $value; 
    }
    
    public function getJsonData(){
        return $this->jsonData;
    }
    
    /**
     * Get Json Data , return null if not setted , as there might be values equal to false
     * @param unknown $key
     * @return NULL
     */
    public function getData($key ){
        return  isset($this->jsonData[$key]) ? $this->jsonData[$key] : null;
    }
    
    public function getDataOrDefault($key ,$default){
        $value = $this->getData($key);
        return  is_null($value) ? $default :$value ;
    }
    
    public function updateAndSave($key , $value ){
        return  $this->update($key, $value)->save();
    }
    
    public function update($key, $value){
        $this->setData($key,$value);
        return $this;
    }
    
    public function save(){
        $filename = $this->getFullname();
        $jsonStr = json_encode($this->getJsonData(), JSON_UNESCAPED_SLASHES);
        $jsonStr = Common::jsonIndent($jsonStr);
        return file_put_contents($filename, $jsonStr);
    }
    
}