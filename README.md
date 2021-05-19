# Predefined Avatars

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/clarkwinkelmann/flarum-ext-predefined-avatars.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-predefined-avatars) [![Total Downloads](https://img.shields.io/packagist/dt/clarkwinkelmann/flarum-ext-predefined-avatars.svg)](https://packagist.org/packages/clarkwinkelmann/flarum-ext-predefined-avatars) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/clarkwinkelmann)

Make your Flarum users choose their avatar from a list.

The extension can be configured in various ways to keep or disable custom avatar uploads or default "initials" avatars.

The avatar is still changed in the same way that Flarum does it by default: by clicking the avatar on the user profile.

The extension doesn't come with any image. You can upload your own from the admin.

Don't forget to update the "Choose an avatar from the predefined list" permission to include your users.
You can set the permission to "Everyone" to allow users to change to a custom avatar before validating their email.

## Installation

    composer require clarkwinkelmann/flarum-ext-predefined-avatars:*

## Avatar storage

The avatars are placed inside the `public/assets/avatars/predefined` folder.
There is a single instance of each image so if multiple users use the same predefined image the file will only be loaded once.

The extension attempts to clean up deleted images by removing them from disk and from any user who might still have that avatar.
However it's possible for some images to not be deleted if you upload them but never save the new settings.

If you prefer to name your images with a recognisable filename instead of the default random identifier, you can manually add them to the `predefined` folder and then edit the `predefinedAvatars` key in the `settings` table.
The `predefinedAvatars` settings is a JSON encoded array of the available filenames as string.

To manually set a predefined avatar to a user from the database (from phpMyAdmin for example), use the format `predefinedAvatar:<filename>` in the `avatar_url` column.
For example if a file is `avatars/predefined/abcdefg.png`, its value in the setting will be `abcdefg.png` and its value in the `avatar_url` column will be `predefinedAvatar:abcdefg.png`.

Do not use the actual path to the image in `avatar_url`, otherwise Flarum will attempt to delete the file when the user changes avatar!

## Known issues

- If a user connects with a social login that provides a default avatar, "Only allow predefined avatars" will be bypassed. However the "Default avatar" setting should override the social avatar.
- If you delete a predefined avatar, the users who used the avatar will be reverted to having no avatar even if "Prevent setting no avatar" is enabled.
- Existing users on the forum are not automatically updated to meet the constraints when you enable the extension for the first time.

## Support

This extension is under **minimal maintenance**.

It was developed for a client and released as open-source for the benefit of the community.
I might publish simple bugfixes or compatibility updates for free.

You can [contact me](https://clarkwinkelmann.com/flarum) to sponsor additional features or updates.

Support is offered on a "best effort" basis through the Flarum community thread.

## Links

- [GitHub](https://github.com/clarkwinkelmann/flarum-ext-predefined-avatars)
- [Packagist](https://packagist.org/packages/clarkwinkelmann/flarum-ext-predefined-avatars)
- [Discuss](https://discuss.flarum.org/d/27302)
