import app from 'flarum/forum/app';
import Modal from 'flarum/common/components/Modal';
import User from 'flarum/common/models/User';

interface AvatarModalAttrs {
    user: User
}

// @ts-ignore TODO missing Modal.view typings
export default class AvatarModal extends Modal {
    attrs!: AvatarModalAttrs

    className() {
        return 'SetPredefinedAvatarModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-predefined-avatars.forum.modal.title');
    }

    content() {
        const avatars = app.forum.attribute('predefinedAvatars');

        return m('.Modal-body', avatars.map((avatar: string) => m('a.Avatar.Avatar--predefined', {
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
