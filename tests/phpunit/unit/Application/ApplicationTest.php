<?php
namespace Bolt\Tests;

use Bolt\Application;

class ApplicationTest extends \PHPUnit_Framework_TestCase
{
    public function testConstructorSetBoltVersion()
    {
        $app = new Application(['rootpath' => TEST_ROOT]);

        $this->arrayHasKey($app, 'bolt_version');
        $this->arrayHasKey($app, 'bolt_name');
    }
}
