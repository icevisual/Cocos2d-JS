<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;
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
        $jsonFile = $runPath . DS . $this->output;
        if (! is_file($jsonFile)) {
            throw new CocosException('invalid output file['.$jsonFile.'].');
        }
        $content = file_get_contents($jsonFile);
        $jsonData = Common::jsonDecode($content);
        $basePath = $runPath . DS . $this->source;
        $jsonData['jsList'] = [];
        foreach ($this->scandir_reverse($basePath,$this->source) as $k => $v){
            $jsonData['jsList'] [] = str_replace('\\', '/', $v);
        }
        $jsonStr = json_encode($jsonData, JSON_UNESCAPED_SLASHES);
        $jsonStr = Common::jsonIndent($jsonStr);
        file_put_contents($jsonFile, $jsonStr);
        return true;
    }
    
    
    
}



