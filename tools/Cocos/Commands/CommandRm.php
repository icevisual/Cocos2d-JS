<?php
namespace Cocos\Commands;
        
use Cocos\Utils\Common;
use Cocos\Exceptions\CocosException;
        
class CommandRm extends Command
{
                    
    public function runLayer($arguments)
    {
        // TODO : running handle
        $basePath =  $this->getRunningPath();
        $basePath = $basePath.DS.'src';
        $layerName = $this->getArgvOrExp(0);
        $layerName = ucfirst($layerName);
        $dirName = $this->getArgvOr(1,'Layers');
        if($dirName){
        	$basePath = $basePath.DS.$dirName;
        }
        $layerFile = $basePath.DS.$layerName.'Layer.js';
        if(!is_file($layerFile)){
			$layerFile = $basePath.DS.$layerName.'.js';
        	if(!is_file($layerFile)){
        		throw new CocosException("File [$layerFile] Not Found", 1);
        	}
        }
        unlink($layerFile);
        system('ge js');
        return true;
    }
                    
}