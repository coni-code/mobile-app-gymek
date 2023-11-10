<?php

namespace App\Service\Preparer;

use App\Entity\User;

class RegistrationPreparer
{
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

        $user->getName() !== $name['value'] && $user->setName($name['value']);
        $user->getSurname() !== $surname['value'] && $user->setSurname($surname['value']);
        $user->getEmail() !== $email['value'] && $user->setEmail($email['value']);
        $user->getPassword() !== $password['value'] && $user->setPassword($password['value']);
        $user->getPhoneNumber() !== $phoneNumber['value'] && $user->setPhoneNumber($phoneNumber['value']);
        $user->getCity() !== $city['value'] && $user->setCity($city['value']);
        $user->getGender() !== $gender['value'] && $user->setGender($gender['value']);

        return $user;
    }
}
