<?php

namespace ClarkWinkelmann\PredefinedAvatars;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;
    protected $url;

    public function __construct(SettingsRepositoryInterface $settings, UrlGenerator $url)
    {
        $this->settings = $settings;
        $this->url = $url;
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        $attributes = [
            'cannotSetCustomAvatar' => $this->settings->get('predefinedAvatarsOnly') && !$serializer->getActor()->hasPermission('user.setCustomAvatarAlways'),
            'cannotRemoveAvatar' => $this->settings->get('predefinedAvatarsNoRemove') && !$serializer->getActor()->hasPermission('user.setCustomAvatarAlways'),
        ];

        if ($serializer->getActor()->hasPermission('user.setPredefinedAvatar')) {
            $attributes += [
                'canSetPredefinedAvatar' => true,
                'predefinedAvatarsPrefix' => $this->url->to('forum')->path('assets/avatars/predefined/'),
            ];
        }

        return $attributes;
    }
}
