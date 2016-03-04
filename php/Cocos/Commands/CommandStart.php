<?php
namespace Cocos\Commands;
        
use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;
        
class CommandStart extends Command
{
                    
    public function run($arguments)
    {
        system('php ge js');
        system('php ge res');
//         system('php ge set...');
        // TODO : running handle
        system('start chrome www.baidu.com');
    }
                    
}