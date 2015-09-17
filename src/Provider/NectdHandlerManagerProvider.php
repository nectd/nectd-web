<?php

namespace Nectd\Provider;

use Nectd\Manager\HandlerManager;
use Silex;
use Silex\ServiceProviderInterface;

class NectdHandlerManagerProvider implements ServiceProviderInterface
{
    public function register(Silex\Application $app)
    {
        $app['nectd_handler'] = $app->share(
            function ($app) {
                $manager = new HandlerManager($app);

                return $manager;
            }
        );
    }

    public function boot(Silex\Application $app)
    {
    }
}
