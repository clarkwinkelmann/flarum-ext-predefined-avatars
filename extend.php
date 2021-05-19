<?php

namespace ClarkWinkelmann\PredefinedAvatars;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\Event\Saving;
use Flarum\User\Event\AvatarDeleting;
use Flarum\User\Event\AvatarSaving;
use Flarum\User\Event\Saving as SavingUser;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->post('/predefined-avatar-upload', 'predefined-avatars.upload', Controllers\UploadController::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\ApiSerializer(BasicUserSerializer::class))
        ->attributes(UserAttributes::class),

    (new Extend\Settings())
        ->serializeToForum('predefinedAvatars', 'predefinedAvatars', function ($raw) {
            $avatars = json_decode($raw);

            return is_array($avatars) ? $avatars : [];
        }),

    (new Extend\Event())
        ->listen(AvatarDeleting::class, Listeners\RemoveAvatar::class)
        ->listen(AvatarSaving::class, Listeners\SaveAvatar::class)
        // It's normal to have two events bound to that same listener
        ->listen(Saving::class, Listeners\SaveSettings::class)
        ->listen(Saved::class, Listeners\SaveSettings::class)
        ->listen(SavingUser::class, Listeners\SaveUser::class),
];
