<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class RegistrationValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint)
    {
        if (null === $value || '' === $value) {
            return;
        }

        [
            'name'        => $name,
            'surname'     => $surname,
            'email'       => $email,
            'password'    => $password,
            'phoneNumber' => $phoneNumber,
            'city'        => $city,
            'gender'      => $gender,
        ] = $value;

        $name        = $name['value'];
        $surname     = $surname['value'];
        $email       = $email['value'];
        $password    = $password['value'];
        $phoneNumber = $phoneNumber['value'];
        $city        = $city['value'];
        $gender      = $gender['value'];

        if (empty($name) || !ctype_alpha($name)) {
            $this->context->buildViolation('Invalid name.')
                ->atPath('name')
                ->addViolation();
        }

        if (empty($surname) || !ctype_alpha($surname)) {
            $this->context->buildViolation('Invalid surname.')
                ->atPath('surname')
                ->addViolation();
        }

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->context->buildViolation('Invalid email address.')
                ->atPath('email')
                ->addViolation();
        }

        if (empty($password) || strlen($password) < 6) {
            $this->context->buildViolation('Password must be at least 6 characters long.')
                ->atPath('password')
                ->addViolation();
        }

        if (empty($phoneNumber) || !ctype_digit($phoneNumber)) {
            $this->context->buildViolation('Invalid phone number.')
                ->atPath('phoneNumber')
                ->addViolation();
        }

        if (empty($city)) {
            $this->context->buildViolation('City cannot be empty.')
                ->atPath('city')
                ->addViolation();
        }

        if (empty($gender) || !in_array($gender, ['male', 'female'])) {
            $this->context->buildViolation('Invalid gender.')
                ->atPath('gender')
                ->addViolation();
        }
    }
}
