<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
use Cocos\Utils\JsonFile;
use Cocos\Exceptions\CocosException;

class CommandJsSrcJson extends Command
{

    /**
     * scanning path (relative)
     * 
     * @var unknown
     */
    protected $source = 'src';

    /**
     * output file name
     * 
     * @var unknown
     */
    protected $output = 'project.json';

    /**
     * Scan Extention Array
     * 
     * @var unknown
     */
    protected $scanExt = [
        'js'
    ];

    /**
     * Ignore Dir When Scanning
     * 
     * @var unknown
     */
    protected $ignoreDir = [
        '.',
        '..'
    ];
    
    
    public function __construct(){
        
        $this->source = $this->getProjectSetting('jssrcFolder','src');
    }
    
    /**
     *
     * @param unknown $source
     *            资源路径
     * @param unknown $destination
     *            输出文件路径
     * @return boolean
     */
    public function run($arguments)
    {
        $runPath = $this->getRunningPath();
        $basePath = $runPath . DS . $this->source;
        $jsList = [];
        foreach ($this->scandir_reverse($basePath,$this->source) as $k => $v){
            $jsList [] = str_replace('\\', '/', $v);
        }
        return $this->updateProjectJson('jsList',$jsList);
    }
    
}



