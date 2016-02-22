<?php


call_user_func(function(){
    $basePath = __DIR__.'/HD';
    $dirName = basename( $basePath);
    $dir = scandir($basePath);
    $imgExt = ['png','jpg','gif'];
    foreach ($dir as $key => $file) {
        $pathinfo = pathinfo($file);
        if(in_array($pathinfo['extension'],$imgExt)){
            // echo $file.PHP_EOL;
            // var_dump( $pathinfo );
            $keyName = str_replace('.', '_', $file);
            // var_dump($new);
            echo "{$keyName} : \"$dirName/$file\",".PHP_EOL;
            //item_2 : "res/choose_btn_nor.png",
        }
    }
});