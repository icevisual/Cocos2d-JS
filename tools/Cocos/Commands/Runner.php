<?php
namespace Cocos\Commands;

class Runner
{

    protected $commands = [
        'js' => 'JsSrcJson',
        'res' => 'Resource',
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
            throw new \Cocos\Exceptions\CocosException("Command $command Not Found");
        }
        $arguments = $this->parseArguments($arguments);
        $callback[0]->setArguments($arguments);
        call_user_func($callback,$arguments);
        return true;
    }


    public function parseArguments($inputs){
        $arguments = [];
        for($i = 0 ; $i < count($inputs) ; $i ++){
            $value = $inputs[$i];
            if($value{0} == '-' ){
                if(isset($value[1])){
                    $key = ltrim($value,'-');
                    if($value{1} == '-'){
                        if(strpos($key, '=') === false){
                            $arguments[$key] = true;
                        }else{
                            $segments = explode('=', $key,2);
                            $arguments[$segments[0]] = $segments[1];
                        }
                    }else{
                        if(isset($inputs[$i + 1])){
                            $arguments[$key] = $inputs[$i + 1];
                            $i ++;
                        }else{
                            $arguments[$key] = '';
                        }
                    }
                }else{
                    throw new CocosException("Argument Syntax Error", 1);
                }
            }else{
                if(strpos($value, '=') === false){
                    $arguments[] = $value;
                }else{
                    $segments = explode('=', $value,2);
                    $arguments[$segments[0]] = $segments[1];
                }
            }
        }
        return $arguments;
        // -u root
        // --default-set
        // --default=12
        // def=ddd
    }

}