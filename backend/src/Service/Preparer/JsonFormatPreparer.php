<?php

namespace App\Service\Preparer;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class JsonFormatPreparer
{
    public function prepareFromObject(object $data): array
    {
        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder]);
        $arrayForm  = $serializer->normalize($data);

        foreach($arrayForm as $key => $value) {
            $element     = $data->get($key);
            $elementType = $element->getConfig()->getType()->getBlockPrefix();

            $value = [
                'type'  => $elementType,
                'value' => '',
            ];

            if ($elementType == 'choice') {
                $choices = $element->getConfig()->getOption('choices');
                $value['choices'] = $choices;
            }

            $arrayForm[$key] = $value;
        }

        return $arrayForm;
    }
}
