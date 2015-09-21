<?php
namespace Nectd;

use Bolt\Application as BoltApp;
use Nectd\Controller;
use Nectd\Provider\HandlerManagerProvider;

class Application
{
    protected $bolt;

    public function __construct(BoltApp $app)
    {
        $this->bolt = $app;
        $app['nectd'] = $this;
    }

    public function initialize()
    {
        $app = $this->bolt;

        $app->register(new Provider\HandlerManagerProvider());

        // Replacing the original frontend controller
        $app['controller.frontend'] = $app->share(function () {
            return new Controller\Frontend();
        });

        // Adding Nectd's template selector
        $app['nectd_templatechooser'] = $app->share(function ($app) {
            return new TemplateChooser($app);
        });

        $app['controller.mockup'] = $app->share(function () {
            return new Controller\Mockup();
        });
    }
}
