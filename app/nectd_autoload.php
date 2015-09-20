<?php
return call_user_func(function () {
    $includeRoot = __DIR__ . '/../src/Nectd/';
    spl_autoload_register(function($class) use ($includeRoot) {
        if (strpos($class, 'Nectd\\') === 0) {
            $file = $includeRoot . substr($class, 6) . '.php';
            if (file_exists($file)) {
                include $file;
            }
        }
    });
});
