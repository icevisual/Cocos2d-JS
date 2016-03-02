<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
use Cocos\Utils\JsonFile;
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
        if (version_compare(PHP_VERSION, '5.3.6', '>=')) {
            $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
        } else {
            $backtrace = debug_backtrace(false);
        }
        $end = end($backtrace);
        return dirname($end['file']);
    }

    public function updateProjectJson($key,$value = ''){
        $runningPath = $this->getRunningPath();
        $projectJsonFile =  $runningPath.DS.'project.json';
        $jsonfile = new JsonFile($projectJsonFile);
        $data = $key;
        if(!is_array($key)){
            $data = [$key => $value];
        }
        foreach ($data as $k => $v){
            if(!is_numeric($k)){
                $jsonfile->update($k,$v);
            }
        }
        return $jsonfile->save();
    }
    
    public function getProjectSetting($key,$default = null){
        static $_jsonfile = [];
        if(empty($_cache)){
            $runningPath = $this->getRunningPath();
            $projectJsonFile =  $runningPath.DS.'project.json';
            $_jsonfile = new JsonFile($projectJsonFile);
        }
        return $_jsonfile->getDataOrDefault($key,$default);
    }
    
    

}




