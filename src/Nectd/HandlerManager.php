<?php
namespace Nectd\Manager;

use Silex\Application;

class HandlerManager
{
    private $data;

    public function __construct(Application $app)
    {
        $json = null;

        $file = $app['resources']->getPath('app/resources/data/handlers.json');
        if (file_exists($file)) {
            $json = json_decode(file_get_contents($file), true);
        }

        $this->data = $json ? $json : array();
    }

    public function resolve($handler)
    {
        $info = $handler;
        while (is_string($info)) {
            $handler = $info;
            $info = array_key_exists($info, $this->data) ? $this->data[$info] : null;
        }
        $info['realHandler'] = $handler;

        return $info;
    }
}
