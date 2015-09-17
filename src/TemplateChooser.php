<?php

namespace Bolt;

/**
 * A class for choosing whichever template should be used.
 */
class TemplateChooser
{
    /** @var Application */
    private $app;

    /**
     * Constructor.
     *
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }


    /**
     * HH START
     * MaxArt continues
     */

    /**
     * Fallback template request
     */
    public function __call($name, $arguments)
    {
        return $this->getTemplate($name);
    }

    /**
     * HH
     * Template for Handler page
     *
     * @return string
     */
    public function nctd_handler()
    {
        return $this->getTemplate('nctd_handler', 'nctd_handler');
    }


    /**
     * Choose a template for the homepage.
     *
     * @return string
     */
    public function homepage()
    {
        return $this->getTemplate('homepage', 'index');
    }

    /**
     * Choose a template for the blog.
     *
     * @param \Bolt\Legacy\Content|\Bolt\Legacy\Content[] $content
     *
     * @return string
     */
    public function blog($content)
    {
        $template = $this->getTemplate('blog', empty($content) ? 'blog' : null);

        // Fallback with content: use record() or listing() to choose template
        if (empty($template)) {
            if (is_array($content)) {
                $first = current($content);
                return $this->listing($first->contenttype);
            } else {
                return $this->record($content);
            }
        } else {
            return $template;
        }
    }

    /**
     * HH END
     */

    /**
     * Choose a template for a single record page, e.g.:
     * - '/page/about'
     * - '/entry/lorum-ipsum'
     *
     * Refactor note: Using a FQCN for the hint here as a `use` statement causes
     * a fatal in the unit tests… 'cause PHP and class_alias() versus namespaces.
     *
     * @param \Bolt\Legacy\Content $record
     *
     * @return string
     */
    public function record(\Bolt\Legacy\Content $record)
    {
        // First candidate: global config.yml
        $template = $this->app['config']->get('general/record_template');

        // Second candidate: Theme-specific config.yml file.
        if ($this->app['config']->get('theme/record_template')) {
            $template = $this->app['config']->get('theme/record_template');
        }

        // Third candidate: a template with the same filename as the name of
        // the contenttype.
        $templatefile = $this->app['resources']->getPath('templatespath/' . $record->contenttype['singular_slug'] . '.twig');
        if (is_readable($templatefile)) {
            $template = $record->contenttype['singular_slug'] . '.twig';
        }

        // Fourth candidate: defined specificaly in the contenttype.
        if (isset($record->contenttype['record_template'])) {
            $templatefile = $this->app['resources']->getPath('templatespath/' . $record->contenttype['record_template']);
            if (file_exists($templatefile)) {
                $template = $record->contenttype['record_template'];
            }
        }

        // Fifth candidate: The record has a templateselect field, and it's set.
        foreach ($record->contenttype['fields'] as $name => $field) {
            if ($field['type'] == 'templateselect' && !empty($record->values[$name])) {
                $template = $record->values[$name];
            }
        }

        return $template;
    }

    /**
     * Select a template for listing pages.
     *
     * @param array $contenttype
     *
     * @return string
     */
    public function listing($contenttype)
    {
        // First candidate: Global config.yml
        $template = $this->app['config']->get('general/listing_template');

        // Second candidate: Theme-specific config.yml file.
        if ($this->app['config']->get('theme/listing_template')) {
            $template = $this->app['config']->get('theme/listing_template');
        }

        // Third candidate: a template with the same filename as the name of
        // the contenttype.
        $filename = $this->app['resources']->getPath('templatespath/' . $contenttype['slug'] . '.twig');
        if (file_exists($filename) && is_readable($filename)) {
            $template = $contenttype['slug'] . '.twig';
        }

        // Fourth candidate: defined specificaly in the contenttype.
        if (!empty($contenttype['listing_template'])) {
            $template = $contenttype['listing_template'];
        }

        return $template;
    }

    /**
     * Select a template for taxonomy.
     *
     * @param string $taxonomyslug
     *
     * @return string
     */
    public function taxonomy($taxonomyslug)
    {
        return $this->app['config']->get("taxonomy/$taxonomyslug/listing_template", $this->getTemplate('listing'));
    }

    /**
     * Select a search template.
     *
     * @return string
     */
    public function search()
    {
        return $this->getTemplate('search_results', $this->app['config']->get('general/listing_template'));
    }

    /**
     * Select a template to use for the "maintenance" page.
     *
     * @return string
     */
    public function maintenance()
    {
        return $this->getTemplate('maintenance');
    }

    /**
     * Return a template with a given name, checking the current theme, then the general settings.
     *
     * @param string $name
     *
     * @param string $default = null
     *
     * @return string
     */
    protected function getTemplate($name, $default = null)
    {
        $template = $this->app['config']->get("theme/{$name}_template");
        if (empty($template)) {
            // First fallback: global config.yml
            $template = $this->app['config']->get("general/{$name}_template");
        }
        if (empty($template) && $default) {
            // Second fallback
            $template = $default;
        }
        return $template;
    }
}
