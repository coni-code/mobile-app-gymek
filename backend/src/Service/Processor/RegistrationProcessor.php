<?php

namespace App\Service\Processor;

use App\Entity\User;
use App\Service\Preparer\RegistrationPreparer;
use Doctrine\Persistence\ManagerRegistry;

class RegistrationProcessor
{
    public function __construct(
        private readonly RegistrationPreparer $preparer,
        private readonly ManagerRegistry $doctrine,
    ) {
    }

    public function process(array $data, User $user): void
    {
        $user = $this->preparer->prepare($data, $user);
        $this->saveUser($user);
    }

    private function saveUser(User $user): void
    {
        $em = $this->doctrine->getManager();

        $em->persist($user);
        $em->flush();
    }
}
