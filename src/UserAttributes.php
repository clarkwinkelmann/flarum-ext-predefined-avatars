<?php

namespace ClarkWinkelmann\PredefinedAvatars;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;
use Illuminate\Support\Str;

class UserAttributes
{
    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    public function __invoke(BasicUserSerializer $serializer, User $user): array
    {
        $path = $user->getRawOriginal('avatar_url');

        if (Str::startsWith($path, 'predefinedAvatar:')) {
            return [
                'avatarUrl' => $this->url->to('forum')->path('assets/avatars/' . str_replace('predefinedAvatar:', 'predefined/', $path)),
            ];
        }

        return [];
    }
}
