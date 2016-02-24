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
}