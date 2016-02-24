<?php
namespace Cocos\Commands;

abstract  class Command {
    
    /**
     * Get Ge Running Path
     */
    public function getRunningPath(){
        
        $backtrace = debug_backtrace(false,4);
        
        return dirname($backtrace[3]['file']);
    }
    
}