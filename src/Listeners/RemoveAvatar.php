<?php

namespace ClarkWinkelmann\PredefinedAvatars\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\AvatarDeleting;

class RemoveAvatar
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(AvatarDeleting $event)
    {
        if ($this->settings->get('predefinedAvatarsNoRemove')) {
            $event->actor->assertCan('setCustomAvatarAlways', $event->user);
        }
    }
}
