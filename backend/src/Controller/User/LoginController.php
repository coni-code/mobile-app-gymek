<?php

namespace App\Controller\User;

use App\Form\LoginType;
use App\Service\Preparer\JsonResponsePreparer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/login', name: 'login_')]
class LoginController extends AbstractController
{
    public function __construct(private readonly JsonResponsePreparer $jsonResponsePreparer)
    {
    }

    #[Route('/form', name: 'form', methods: ['GET'])]
    public function getForm(): JsonResponse
    {
        $form = $this->createForm(LoginType::class);

        return $this->jsonResponsePreparer->prepareFromObject($form);
    }
}
