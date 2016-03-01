<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
use Cocos\Utils\JsonFile;
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
       
        $layerName = $this->getArgvOrExp(0,'Missing Layer Name.');
        $layerName = ucfirst($layerName);
        
        $dirname = 'Layers';
        $storePath = $runningPath.DS.'src'.DS;
        if(!is_dir($storePath.$dirname)){
            throw new CocosException("Store path not found.");
        }
        $dirname = $this->getArgvOr(1,$dirname);
        $storePath .= $dirname;
        
        $fileName = $storePath.DS.$layerName.'Layer.js';
        $rewrite = $this->getArgv('rewrite');
        if(is_file($fileName) && !$rewrite ){
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
        
        
        /**
         *  Set the new scene as the first scene
         **/
        $setFirst = $this->getArgv('first');//firstScene
        if($setFirst === true){
             system("php ge first {$layerName}Scene");
        }

        system("php ge js");
        
        
    }
    
    
    
    
    
    
    
    
}


