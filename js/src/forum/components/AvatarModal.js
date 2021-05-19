import Modal from 'flarum/common/components/Modal';

/* global app, m */

export default class AvatarModal extends Modal {
    className() {
        return 'SetPredefinedAvatarModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-predefined-avatars.forum.modal.title');
    }

    content() {
        const avatars = app.forum.attribute('predefinedAvatars');

        return m('.Modal-body', avatars.map(avatar => m('a.Avatar.Avatar--predefined', {
            onclick: () => {
                this.attrs.user.save({
                    predefinedAvatar: avatar,
                }).then(() => {
                    this.hide();
                });
            },
        }, m('img', {
            src: app.forum.attribute('predefinedAvatarsPrefix') + avatar,
            alt: app.translator.trans('clarkwinkelmann-predefined-avatars.forum.modal.imageAlt'),
        }))));
    }
}
