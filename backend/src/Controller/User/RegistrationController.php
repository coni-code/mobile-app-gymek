<?php

namespace App\Controller\User;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Form\RegistrationType;
use App\Service\Preparer\JsonResponsePreparer;
use App\Service\Processor\RegistrationProcessor;
use App\Validator\Registration;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/registration', name: 'user_')]
class RegistrationController extends AbstractController
{
    public function __construct(
        private readonly JsonResponsePreparer $jsonResponsePreparer,
        private readonly RegistrationProcessor $registrationProcessor,
        private readonly ValidatorInterface $validator,
    ) {
    }

    #[Route('/form', name: 'registration_form', methods: ['GET', 'POST'])]
    public function getForm(): JsonResponse
    {
        $form = $this->createForm(RegistrationType::class);

        return $this->jsonResponsePreparer->prepareFromObject($form);
    }

    #[Route('/register', name: 'register', methods: ['GET', 'POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        $json = '{"name":{"type":"text","value":"Rutek"},"surname":{"type":"text","value":"Rutkowski"},"email":{"type":"email","value":"krolik@doswiadczalny.pl"},"password":{"type":"password","value":"lubiepilke123"},"phoneNumber":{"type":"text","value":"575595921"},"city":{"type":"text","value":"Olszówka"},"gender":{"type":"choice","value":"male"}}';
        $data = json_decode($json, true);

        $violations = $this->validator->validate($data, [new Registration()]);

        if (count($violations) > 0) {
            $errorMessages = [];
            foreach ($violations as $violation) {
                $errorMessages[] = $violation->getMessage();
            }

            //zwróć errory -> $errorMessages
        }

        $user = new User();

        $this->registrationProcessor->process($data, $user);

        return new JsonResponse();
    }
}
