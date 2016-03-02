<?php
namespace Cocos\Commands;
        
use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;
        
class CommandResource extends Command
{
                    
/**
     * scanning path (relative)
     * 
     * @var unknown
     */
    protected $source = 'res';

    
    
    protected $resourceFileName = 'resource.js';
    
    /**
     * output file name
     * 
     * @var unknown
     */
    protected $output = 'src'.DS.'resource.js';

    /**
     * Scan Extention Array
     * 
     * @var unknown
     */
    protected $scanExt = [
        'png','mp3','jpg','plist','ExportJson','tmx','fnt'
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
        $this->getProjectSetting('resourceFolder');
        $this->output = $this->getProjectSetting('jssrcFolder','src').DS.$this->resourceFileName;
        $this->source = $this->getProjectSetting('resourceFolder','res');
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
        $outputFile = $runPath . DS . $this->output;
        $basePath = $runPath . DS . $this->source;
        
        if(!is_dir($basePath)){
            throw new CocosException("Can Not Find Path [{$basePath}]");
        }

        $res = [];
        foreach ($this->scandir_reverse($basePath,$this->source) as $k => $v){
            $res [] = "\t".$this->getResKey($v) .' : "'. str_replace(DS, '/', $v).'",';
        }
        $resStr = implode(PHP_EOL, $res);
        $str =<<<EOL
        
var res = {
$resStr
};
        
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
EOL;
        
        file_put_contents($outputFile, $str);
        return true;
    }
    
    
    public function getResKey($filename){
        $filename = preg_replace('/^'.$this->source.preg_quote(DS).'/', '', $filename);
        return str_replace([DS,'.'], '_', $filename);
    }
    
                    
}