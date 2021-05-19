import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';
import Sortable from './components/Sortable';

/* global app, m */

app.initializers.add('clarkwinkelmann-predefined-avatars', () => {
    let uploading = false;

    app.extensionData
        .for('clarkwinkelmann-predefined-avatars')
        .registerSetting({
            setting: 'predefinedAvatarsOnly',
            type: 'switch',
            label: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsOnly'),
            help: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsOnlyHelp'),
        })
        .registerSetting({
            setting: 'predefinedAvatarsNoRemove',
            type: 'switch',
            label: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsNoRemove'),
            help: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsNoRemoveHelp'),
        })
        .registerSetting({
            setting: 'predefinedAvatarsDefault',
            type: 'select',
            options: {
                none: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.defaultOptions.none'),
                first: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.defaultOptions.first'),
                random: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.defaultOptions.random'),
            },
            default: 'none',
            label: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsDefault'),
            help: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsDefaultHelp'),
        })
        .registerSetting(function () {
            const rawAvatars = this.setting('predefinedAvatars')();

            let avatars;

            try {
                avatars = JSON.parse(rawAvatars);
            } catch (error) {
                console.error('Invalid JSON for predefinedAvatars settings');
                // ignore JSON parsing errors
            }

            if (!Array.isArray(avatars)) {
                avatars = [];
            }

            return m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatars')),
                m('.helpText', app.translator.trans('clarkwinkelmann-predefined-avatars.admin.settings.predefinedAvatarsHelp')),
                m(Sortable, {
                    containerTag: 'ul.PredefinedAvatars',
                    placeholderTag: 'li.Avatar.Avatar--predefined.Avatar--placeholder',
                    direction: 'horizontal',
                    onsort: (origin, destination) => {
                        // Because the "add" button is inside of the Sortable component
                        // it's possible to drop an avatar after the last place, which wouldn't work
                        if (destination >= avatars.length) {
                            destination = avatars.length - 1;
                        }

                        avatars.splice(destination, 0, ...avatars.splice(origin, 1));
                        this.setting('predefinedAvatars')(JSON.stringify(avatars));
                    },
                }, [
                    ...avatars.map((avatar, index) => m('li', {
                        key: avatar,
                    }, [
                        m('.Avatar.Avatar--predefined.js-handle', {
                            draggable: true,
                        }, m('img', {
                            src: app.forum.attribute('predefinedAvatarsPrefix') + avatar,
                            alt: avatar,
                            draggable: false, // The img becomes the target of the dragstart event if it doesn't have this
                        })),
                        Button.component({
                            className: 'Button Button--icon Button--delete',
                            icon: 'fas fa-times',
                            onclick: () => {
                                avatars.splice(index, 1);
                                this.setting('predefinedAvatars')(JSON.stringify(avatars));
                            },
                        }),
                    ])),
                    m('li', {
                        key: 'add',
                    }, m('a.Avatar.Avatar--predefined.UploadButton', {
                        href: '#',
                        onclick: event => {
                            event.preventDefault();

                            const $input = $('<input type="file">');

                            $input
                                .appendTo('body')
                                .hide()
                                .click()
                                .on('change', event => {
                                    const body = new FormData();
                                    body.append('avatar', event.target.files[0]);

                                    uploading = true;
                                    m.redraw();

                                    app
                                        .request({
                                            method: 'POST',
                                            url: app.forum.attribute('apiUrl') + '/predefined-avatar-upload',
                                            serialize: (raw) => raw,
                                            body,
                                        })
                                        .then(response => {
                                            avatars.push(response.path);
                                            this.setting('predefinedAvatars')(JSON.stringify(avatars));
                                            uploading = false;
                                            m.redraw();
                                        }, error => {
                                            uploading = false;
                                            m.redraw();

                                            throw error;
                                        });
                                });
                        },
                        disabled: uploading,
                    }, icon(uploading ? 'fas fa-spinner fa-pulse' : 'fas fa-plus'))),
                ]),
            ]);
        })
        .registerPermission({
            icon: 'fas fa-user-circle',
            label: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.permissions.setPredefinedAvatar'),
            permission: 'user.setPredefinedAvatar',
            allowGuest: true, // We allow "guest" so you can give this permission to suspended/non-activated users
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-user-circle',
            label: app.translator.trans('clarkwinkelmann-predefined-avatars.admin.permissions.setCustomAvatarAlways'),
            permission: 'user.setCustomAvatarAlways',
        }, 'moderate');
});
