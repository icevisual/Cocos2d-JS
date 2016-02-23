<?php
namespace Cocos\Commands;

use Cocos\Utils\Common;

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

    protected function scandir_reverse($dir)
    {
        $files = scandir($dir);
        $result = [];
        foreach ($files as $key => $file) {
            $pathinfo = pathinfo($file);
            if (is_dir($file) && in_array($file, $ignoreDir)) {}
            
            if (isset($pathinfo['extension']) && in_array($pathinfo['extension'], $this->scanExt)) {
                $result[] = $file;
            }
        }
    }

    /**
     *
     * @param unknown $source
     *            资源路径
     * @param unknown $destination
     *            输出文件路径
     * @return boolean
     */
    public function run($env)
    {
        $runPath = $env['run_path'];
        $jsonFile = $runPath . DIRECTORY_SEPARATOR . $this->output;
        if (! is_file($jsonFile)) {
            throw new \Cocos\Excetion\CocosExcetion('invalid output file.');
        }
        $content = file_get_contents($jsonFile);
        $jsonData = Common::jsonDecode($content);
        
        $basePath = $runPath . DIRECTORY_SEPARATOR . $this->source;
        $jsList = [];
        foreach ($this->scandir_reverse($basePath) as $k => $v) {
            $jsList[] = $this->source . DIRECTORY_SEPARATOR . $v;
        }
        $jsonData['jsList'] = $jsList;
        $jsonStr = json_encode($jsonData, JSON_UNESCAPED_SLASHES);
        $jsonStr = Common::jsonIndent($jsonStr);
        file_put_contents($jsonFile, $jsonStr);
        return true;
    }
}



