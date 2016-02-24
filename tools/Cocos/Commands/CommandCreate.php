<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;

class CommandCreate extends Command
{

    /**
     * 
     * @param array $arguments
     *  $arguments[0] command name
     *  $arguments[1 ~ n ] command actions
     */
    public function runCommand($arguments)
    {
        $dirname = dirname(debug_backtrace(false,2)[1]['file']);
        
        if(empty($arguments)){
            throw new CocosException("Command name must be specified.");
        }
        $commandName = array_shift($arguments);
        $commandName = 'Command'.ucfirst($commandName);
        $fileName = $dirname.DS.$commandName.'.php';
        
        if(is_file($fileName)){
            throw new CocosException("Command File Exsits.");
        }
        
        $str =<<<EOL
<?php
namespace Cocos\Commands;
        
use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;
        
class $commandName extends Command
{
        
EOL;
        array_unshift($arguments, '');
        foreach ($arguments as $k => $v){
            $v = ucfirst($v);
            $str .=<<<EOL
            
    public function run$v(\$arguments)
    {
        // TODO : running handle
    }
            
EOL;
        }
        $str.=<<<EOL
        
}
EOL;
        file_put_contents($fileName, $str);
    }
    
    
    
    public function runLayer($arguments){
        
        $runningPath =  $this->getRunningPath();
        
        $storePath = $runningPath.DS.'src'.DS.'Layers';
        
        if(!is_dir($storePath)){
            throw new CocosException("Store path not found.");
        }
        $layerName = array_shift($arguments);
        $layerName = ucfirst($layerName);
        $fileName = $storePath.DS.$layerName.'Layer.js';
        if(is_file($fileName)){
            throw new CocosException("Layer File Exsits.");
        }
        
        $str =<<<EOL


var {$layerName}Layer = cc.Layer.extend({
    
    ctor:function(){

        this._super();

        return true;
    }
 
});


var {$layerName}Scene = cc.Scene.extend({
    onEnter : function (){
        this._super();
        var layer = new {$layerName}Layer();
        this.addChild(layer,1);
    }
});

            
EOL;
        file_put_contents($fileName, $str);
        
    }
    
    
    
    
    
    
    
    
}


