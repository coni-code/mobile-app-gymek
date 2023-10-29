<?php

namespace App\Service\Locator;

class ResourceLocator
{
    public function __construct(private readonly string $projectDir)
    {
    }

    public function getApiFolder(): string
    {
        return $this->projectDir . '/api';
    }

    public function getEndpoints(): string
    {
        return $this->getApiFolder() . '/endpoint.json';
    }
}
