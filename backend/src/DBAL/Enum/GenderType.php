<?php

namespace App\DBAL\Enum;

class GenderType
{
    const GENDER_MALE   = 'male';
    const GENDER_FEMALE = 'female';
    const GENDER_OTHER  = 'other';

    const GENDERS = [
        self::GENDER_MALE   => self::GENDER_MALE,
        self::GENDER_FEMALE => self::GENDER_FEMALE,
        self::GENDER_OTHER  => self::GENDER_OTHER
    ];
}
