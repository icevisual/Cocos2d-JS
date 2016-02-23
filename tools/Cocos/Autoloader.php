<?php


namespace Cocos;

class Autoloader
{
    /**
     * Register autoload() as an SPL autoloader.
     *
     * @see self::autoload
     */
    public static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }

    /**
     * Autoload Psy classes.
     *
     * @param string $class
     */
    public static function autoload($class)
    {
        if (0 !== strpos($class, 'Cocos')) {
            return;
        }
        
        $file = dirname(__DIR__) . '/' . strtr($class, '\\', '/') . '.php';
        if (is_file($file)) {
            require $file;
        }
    }
}
