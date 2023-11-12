<?php

namespace App\Service\Preparer;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationPreparer
{
    public function __construct(private readonly UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function prepare(array $data, User $user): User
    {
        [
            'name'        => $name,
            'surname'     => $surname,
            'email'       => $email,
            'password'    => $password,
            'phoneNumber' => $phoneNumber,
            'city'        => $city,
            'gender'      => $gender,
        ] = $data;

        $user->setName($name['value']);
        $user->setSurname($surname['value']);
        $user->setEmail($email['value']);
        $user->setPassword($this->passwordHasher->hashPassword($user, $password['value']));
        $user->setPhoneNumber($phoneNumber['value']);
        $user->setCity($city['value']);
        $user->setGender($gender['value']);
        $user->setRoles(['ROLE_USER']);

        return $user;
    }
}
