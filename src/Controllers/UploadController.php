<?php

namespace ClarkWinkelmann\PredefinedAvatars\Controllers;

use ClarkWinkelmann\PredefinedAvatars\AvatarUploader;
use Flarum\User\AvatarValidator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;
use Psr\Http\Server\RequestHandlerInterface;

class UploadController implements RequestHandlerInterface
{
    protected $uploader;
    protected $validator;

    public function __construct(AvatarUploader $uploader, AvatarValidator $validator)
    {
        $this->uploader = $uploader;
        $this->validator = $validator;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $request->getAttribute('actor')->assertAdmin();

        /**
         * @var UploadedFileInterface $file
         */
        $file = Arr::get($request->getUploadedFiles(), 'avatar');

        $this->validator->assertValid([
            'avatar' => $file,
        ]);

        return new JsonResponse([
            'path' => $this->uploader->upload($file),
        ]);
    }
}
