<?php
namespace Cocos\Commands;
        
use Cocos\Utils\JsonFile;
use Cocos\Exceptions\CocosException;
        
class CommandFirst extends Command
{
                    
    public function run($arguments)
    {
    	$runningPath =  $this->getRunningPath();
        $firstScene = $this->getArgvOrExp(0);

        $projectJsonFile =  $runningPath.DS.'project.json';
        $jsonfile = new JsonFile($projectJsonFile);
        $jsonfile->updateByKey('firstScene',$firstScene);
        return true;
    }
                    
}