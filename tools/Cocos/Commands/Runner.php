<?php
namespace Cocos\Commands;

class Runner
{

    protected $commands = [
        'js' => 'JsSrcJson'
    ];
    
    public  function hasCommand($command){
        return isset($this->commands[$command]);
    }
    public  function getCommandCallback($command){
        $alias = $this->commands[$command];
            
        $class = "Cocos\\Commands\\Command{$alias}";
        
        return [
            new $class,'run'
        ];
    }

    public  function runCommands($arguments,$path)
    {
        array_shift($arguments);
        $param = [
            'run_path' => $path,
        ];
        $queue = [];
        foreach ($arguments as $key => $v) {
            if ($this->hasCommand($v)) {
                $queue[] = $this->getCommandCallback($v);
            } else {
                throw new \Cocos\Exceptions\CocosException("Command $v Not Found");
            }
        }
        foreach ($queue as $key => $value) {
            call_user_func($value,$param);
        }
        return true;
    }
}