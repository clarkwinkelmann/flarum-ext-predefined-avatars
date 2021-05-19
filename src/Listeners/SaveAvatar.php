<?php

namespace ClarkWinkelmann\PredefinedAvatars\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\AvatarSaving;

class SaveAvatar
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(AvatarSaving $event)
    {
        if ($this->settings->get('predefinedAvatarsOnly')) {
            $event->actor->assertCan('setCustomAvatarAlways', $event->user);
        }
    }
}
