<?php

namespace ClarkWinkelmann\PredefinedAvatars\Listeners;

use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveUser
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(Saving $event)
    {
        $avatar = Arr::get($event->data, 'attributes.predefinedAvatar');

        if ($avatar) {
            $event->actor->assertCan('setPredefinedAvatar', $event->user);

            $avatars = $this->getAvailableAvatars();

            if (!in_array($avatar, $avatars)) {
                throw new ValidationException([
                    // Not translated on purpose.
                    // This error would not happen unless the admin removes avatars while users are picking new ones.
                    // And if it happens it would be difficult to explain to the user what happened anyway.
                    'predefinedAvatar' => 'Invalid avatar',
                ]);
            }

            // Use a custom prefix instead of the actual path
            // otherwise Flarum will try to delete the file when the user changes avatar
            $event->user->changeAvatarPath('predefinedAvatar:' . $avatar);
        }

        if (!$event->user->exists) {
            $defaultMode = $this->settings->get('predefinedAvatarsDefault');

            if ($defaultMode === 'first' || $defaultMode === 'random') {
                $avatars = $this->getAvailableAvatars();

                $index = $defaultMode === 'first' ? 0 : rand(0, count($avatars) - 1);

                $event->user->changeAvatarPath('predefinedAvatar:' . $avatars[$index]);
            }
        }
    }

    protected function getAvailableAvatars(): array
    {
        return json_decode($this->settings->get('predefinedAvatars'));
    }
}
