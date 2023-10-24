<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Form\RegistrationType;
use App\Service\Preparer\JsonFormatPreparer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/registration', name: 'form_')]
class RegistrationController extends AbstractController
{
    public function __construct(private readonly JsonFormatPreparer $jsonFormatPreparer)
    {
    }

    #[Route('/form/get', name: 'get', methods: ['GET'])]
    public function getForm(): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationType::class, $user);

        return new JsonResponse($this->jsonFormatPreparer->prepareFromObject($form));
    }
}
