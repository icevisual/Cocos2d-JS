<?php
namespace Cocos\Commands;

class Runner
{

    protected $commands = [
        'js' => 'JsSrcJson',
    ];
    
    /**
     * 分隔命令的动作 key:generate => [key , generate]
     * @param unknown $command
     * @return multitype:
     */
    public function separateCommand($command){
        $segments = explode(':', $command);
        count($segments) == 1 && $segments[] = '';
        return $segments;
    }
    
    public function getCommandClassName($command){
        return "Cocos\\Commands\\Command{$command}";
    }
    
    public  function hasCommand($command){
        $command = $this->separateCommand($command)[0];
        if(!isset($this->commands[$command])){
            $className = $this->getCommandClassName($command);
            if(class_exists ($className)){
                $this->commands[$command] = $command;
                return true;
            }
            return false;
        }
        return true;
    }
    public  function getCommandCallback($command,$func = ''){
        $alias = $this->commands[$command];
            
        $class = $this->getCommandClassName($alias);
        
        $method = 'run'.ucfirst($func);
        
        if(!method_exists($class, $method)){
            throw new \Cocos\Exceptions\CocosException("{$command} Can't Process {$func}");
        }
        return [
            new $class,$method
        ];
    }

    public  function runCommands($arguments)
    {
        array_shift($arguments);
        $queue = [];
        
        if(empty($arguments)){
            throw new \Cocos\Exceptions\CocosException('Missing Command!');
        }
        $command = array_shift($arguments);
        if($this->hasCommand($command)){
            list($cmd,$act) = $this->separateCommand($command);
            $callback = $this->getCommandCallback($cmd,$act);
        } else {
            throw new \Cocos\Exceptions\CocosException("Command $v Not Found");
        }
        call_user_func($callback,$arguments);
        return true;
    }
}