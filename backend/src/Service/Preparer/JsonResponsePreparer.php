<?php

namespace App\Service\Preparer;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\JsonResponse;

class JsonResponsePreparer
{
    public function prepare(bool $isSuccessful, array $messages = []): JsonResponse
    {
        $status     = $isSuccessful ? 'success' : 'error';
        $statusCode = $isSuccessful ? Response::HTTP_OK : Response::HTTP_BAD_REQUEST;

        return new JsonResponse(["status" => $status, "messages" => $messages], $statusCode);
    }

    public function prepareFromObject(object $data): JsonResponse
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

        return new JsonResponse($arrayForm);
    }

    public function prepareFromJsonFile(string $pathToFile): JsonResponse
    {
        return new JsonResponse(json_decode(file_get_contents($pathToFile, FILE_IGNORE_NEW_LINES)));
    }
}
