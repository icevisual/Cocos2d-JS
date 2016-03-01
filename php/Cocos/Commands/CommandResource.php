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
    

    /**
     * 递归返回文件夹下的所有文件
     * @param unknown $dir
     * @param string $prefix
     * @return Ambigous <multitype:string , multitype:>
     */
    protected function scandir_reverse($dir,$prefix = '')
    {
        $files = scandir($dir);
        $basename = basename($dir);
        $result = [];
        foreach ($files as $key => $file) {
            $pathinfo = pathinfo($file);
            if (is_dir($dir.DS.$file) && !in_array($file, $this->ignoreDir)) {
                $result = array_merge($result,$this->scandir_reverse($dir.DS.$file,$prefix.DS.$file));
            }else if (isset($pathinfo['extension']) && in_array($pathinfo['extension'], $this->scanExt)) {
                $result[] = $prefix.DS.$file;
            }
        }
        return $result;
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