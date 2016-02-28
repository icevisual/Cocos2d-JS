<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;

abstract  class Command {

	protected $arguments = [];

	public function setArguments($arguments){
		$this->arguments = $arguments;		
	}

	public function getArguments(){
		return $this->arguments;
	}

	public function getArgv($key){
		return isset($this->arguments[$key]) ? $this->arguments[$key] : null;
	}

	public function getArgvOrExp($key,$format = 'Missing ArgumentError %s.'){
		$result = $this->getArgv($key);
		if(!$result){
			throw new CocosException(sprintf($format,$key), 1);
		}
		return $result;
	}

	public function getArgvOr($key, $default){
		$result = $this->getArgv($key);
		if(!$result){
			return $default;
		}
		return $result;
	}

    
    /**
     * Get Ge Running Path
     */
    public function getRunningPath(){
        
        $backtrace = debug_backtrace(false,4);
        
        return dirname($backtrace[3]['file']);
    }
    

}