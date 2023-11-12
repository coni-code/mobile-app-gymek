<?php

namespace App\Validator;

use App\Repository\UserRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class RegistrationValidator extends ConstraintValidator
{
    public function __construct(private readonly UserRepository $userRepository)
    {
    }

    public function validate(mixed $value, Constraint $constraint): void
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

        if (empty($name) || preg_match('/\d/', $name)) {
            $this->context->buildViolation('Invalid name.')
                ->atPath('name')
                ->addViolation();
        }

        if (empty($surname) || preg_match('/\d/', $surname)) {
            $this->context->buildViolation('Invalid surname.')
                ->atPath('surname')
                ->addViolation();
        }

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->context->buildViolation('Invalid email address.')
                ->atPath('email')
                ->addViolation();
        }

        if ($this->userRepository->findOneBy(['email' => $email])) {
            $this->context->buildViolation('Account with this email is already taken.')
                ->atPath('email')
                ->addViolation();
        }

        if ($this->userRepository->findOneBy(['phoneNumber' => $phoneNumber])) {
            $this->context->buildViolation('Account with this phone number is already taken.')
                ->atPath('phoneNumber')
                ->addViolation();
        }

        if (empty($password) || strlen($password) < 6) {
            $this->context->buildViolation('Password must be at least 6 characters long.')
                ->atPath('password')
                ->addViolation();
        }

        if (!preg_match('/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-_!@#$%^&*()+]).*$/', $password)) {
            $this->context->buildViolation(
                'Password must include at least: 1 upper case letter, 1 lower case letter, 1 number, 1 special character.'
            )
                ->atPath('password')
                ->addViolation();
        }

        if (empty($city) || preg_match('/\d/', $city)) {
            $this->context->buildViolation('Invalid city.')
                ->atPath('city')
                ->addViolation();
        }

        if (empty($gender) || !in_array($gender, ['male', 'female', 'other'])) {
            $this->context->buildViolation('Invalid gender.')
                ->atPath('gender')
                ->addViolation();
        }
    }
}
