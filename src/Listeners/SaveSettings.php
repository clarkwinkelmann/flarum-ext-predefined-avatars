<?php

namespace ClarkWinkelmann\PredefinedAvatars\Listeners;

use ClarkWinkelmann\PredefinedAvatars\AvatarUploader;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

class SaveSettings
{
    use DispatchEventsTrait;

    protected $settings;
    protected $uploader;

    static $previousFilenames;

    public function __construct(SettingsRepositoryInterface $settings, AvatarUploader $uploader, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->uploader = $uploader;
        $this->events = $events;
    }

    /**
     * @param Saving|Saved $event
     */
    public function handle($event)
    {
        // Only react when our own setting is saved
        if (!Arr::exists($event->settings, 'predefinedAvatars')) {
            return;
        }

        // Save a copy of the previous filenames before they get overridden in the database
        if ($event instanceof Saving) {
            self::$previousFilenames = json_decode($this->settings->get('predefinedAvatars'));
        }

        if ($event instanceof Saved && is_array(self::$previousFilenames)) {
            $deletedFilenames = array_diff(self::$previousFilenames, json_decode($event->settings['predefinedAvatars']));

            // Remove all old files from disk and user settings
            // TODO: if files were uploaded but never saved in the first place they will never be deleted
            foreach ($deletedFilenames as $filename) {
                $this->uploader->remove($filename);

                User::query()->where('avatar_url', 'predefinedAvatar:' . $filename)->each(function (User $user) {
                    $user->changeAvatarPath(null);
                    $user->save();

                    $this->dispatchEventsFor($user);
                });
            }
        }
    }
}
