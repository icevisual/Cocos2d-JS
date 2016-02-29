<?php
namespace Cocos\Commands;
        
use Cocos\Utils\JsonFile;
use Cocos\Exceptions\CocosException;
        
class CommandFirst extends Command
{
                    
    public function run($arguments)
    {
    	$runningPath =  $this->getRunningPath();
    	$firstScene = $this->getArgv('s');
    	if(!$firstScene){
            $firstScene = $this->getArgvOrExp(0);
    	}else{
    	    $firstScene = ucfirst($firstScene).'Scene';
    	}

        $projectJsonFile =  $runningPath.DS.'project.json';
        $jsonfile = new JsonFile($projectJsonFile);
        $jsonfile->updateByKey('firstScene',$firstScene);
        return true;
    }
                    
}