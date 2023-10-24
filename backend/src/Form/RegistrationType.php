<?php

namespace App\Form;

use App\DBAL\Enum\GenderType;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('surname', TextType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('email', EmailType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('password', PasswordType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('phoneNumber', TextType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('city', TextType::class, [
                'attr'     => [
                    'maxLength' => 45,
                    'minLength' => 2,
                ],
                'required' => true,
            ])
            ->add('gender', ChoiceType::class, [
                'choices' => GenderType::GENDERS,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
