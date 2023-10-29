<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Form\RegistrationType;
use App\Service\Preparer\JsonResponsePreparer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/registration', name: 'form_')]
class RegistrationController extends AbstractController
{
    public function __construct(private readonly JsonResponsePreparer $jsonResponsePreparer)
    {
    }

    #[Route('/form/get', name: 'get', methods: ['GET'])]
    public function getForm(): JsonResponse
    {
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);

        return $this->jsonResponsePreparer->prepareFromObject($form);
    }
}
