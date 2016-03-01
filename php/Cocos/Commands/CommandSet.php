<?php
namespace Cocos\Commands;
        
use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;
        
class CommandSet extends Command
{
                    
    public function run($arguments)
    {
        // TODO : running handle
    }
                        
    public function runFirst($arguments)
    {
        $firstScene = $this->getArgv('s');
        if(!$firstScene){
            $firstScene = $this->getArgvOrExp(0);
        }else{
            $firstScene = ucfirst($firstScene).'Scene';
        }
        return $this->updateProjectJson('firstScene',$firstScene);
    }
                        
    public function runResource($arguments)
    {
        $dirname = $this->getArgvOrExp(0);
        return $this->updateProjectJson('resourceFolder',$dirname);
    }
                        
    public function runJssrc($arguments)
    {
        $dirname = $this->getArgvOrExp(0);
        return $this->updateProjectJson('jssrcFolder',$dirname);
    }
                    
}