import app from 'flarum/forum/app';
import {extend, override} from 'flarum/common/extend';
import AvatarEditor from 'flarum/forum/components/AvatarEditor';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';
import AvatarModal from './components/AvatarModal';

app.initializers.add('clarkwinkelmann-predefined-avatars', () => {
    extend(AvatarEditor.prototype, 'controlItems', function (this: AvatarEditor, items: ItemList) {
        // @ts-ignore TODO missing AvatarEditor.attrs.user typings
        const {user} = this.attrs;

        // Hide the "remove" button when we open the dropdown despite being no avatar
        if ((!user.avatarUrl() || app.forum.attribute('cannotRemoveAvatar')) && items.has('remove')) {
            items.remove('remove');
        }

        if (app.forum.attribute('cannotSetCustomAvatar') && items.has('upload')) {
            items.remove('upload');
        }

        if (app.forum.attribute('canSetPredefinedAvatar')) {
            items.add('predefined-avatars', Button.component({
                icon: 'fas fa-user-circle',
                onclick: () => {
                    app.modal.show(AvatarModal, {
                        user,
                    });
                },
            }, app.translator.trans('clarkwinkelmann-predefined-avatars.forum.editor.setPredefinedAvatar')));
        }
    });

    override(AvatarEditor.prototype, 'quickUpload', function (this: AvatarEditor, original: any, event: Event) {
        if (!app.forum.attribute('canSetPredefinedAvatar')) {
            return original(event);
        }

        // @ts-ignore TODO missing AvatarEditor.attrs.user typings
        const {user} = this.attrs;

        // If user can use predefined but not custom, open predefined modal right away
        if (
            app.forum.attribute('cannotSetCustomAvatar') &&
            (!user.avatarUrl() || app.forum.attribute('cannotRemoveAvatar'))) {
            // Do not open dropdown
            event.preventDefault();
            event.stopPropagation();

            app.modal.show(AvatarModal, {
                user,
            });

            return;
        }

        // Do nothing. This will always open the dropdown
    });
});
