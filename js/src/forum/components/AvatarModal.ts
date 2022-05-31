import app from 'flarum/forum/app';
import Modal, {IInternalModalAttrs} from 'flarum/common/components/Modal';
import User from 'flarum/common/models/User';

interface AvatarModalAttrs extends IInternalModalAttrs {
    user: User
}

export default class AvatarModal extends Modal<AvatarModalAttrs> {
    className() {
        return 'SetPredefinedAvatarModal';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-predefined-avatars.forum.modal.title');
    }

    content() {
        const avatars = app.forum.attribute('predefinedAvatars') as string[];

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
