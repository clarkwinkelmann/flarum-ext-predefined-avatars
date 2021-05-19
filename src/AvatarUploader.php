<?php

namespace ClarkWinkelmann\PredefinedAvatars;

use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Support\Str;
use Psr\Http\Message\UploadedFileInterface;

class AvatarUploader
{
    protected $uploadDir;

    public function __construct(Factory $filesystemFactory)
    {
        $this->uploadDir = $filesystemFactory->disk('flarum-avatars');
    }

    public function upload(UploadedFileInterface $file): string
    {
        $ext = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);

        $avatarPath = Str::random() . '.' . $ext;

        $this->uploadDir->put('predefined/' . $avatarPath, $file->getStream()->getContents());

        return $avatarPath;
    }

    public function remove(string $filename)
    {
        $fullFilename = 'predefined/' . $filename;

        if ($this->uploadDir->exists($fullFilename)) {
            $this->uploadDir->delete($fullFilename);
        }
    }
}
