<?php

namespace App\Controller\Api;

use App\Service\Locator\ResourceLocator;
use App\Service\Preparer\JsonResponsePreparer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    public function __construct(
        private readonly ResourceLocator $resourceLocator,
        private readonly JsonResponsePreparer $jsonResponsePreparer,
    ) {
    }

    #[Route('/endpoints', name: 'endpoints')]
    public function getEndpoints(): JsonResponse
    {
        return $this->jsonResponsePreparer->prepareFromJsonFile($this->resourceLocator->getEndpoints());
    }
}
