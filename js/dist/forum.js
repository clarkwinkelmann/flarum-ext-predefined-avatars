module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=5)}([function(t,e){t.exports=flarum.core.compat["common/components/Button"]},function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e){t.exports=flarum.core.compat["forum/components/AvatarEditor"]},function(t,e){t.exports=flarum.core.compat["common/components/Modal"]},,function(t,e,r){"use strict";r.r(e);var n=r(1),a=r(2),o=r.n(a),u=r(0),i=r.n(u);function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var c=r(3),f=function(t){var e,r;function n(){return t.apply(this,arguments)||this}r=t,(e=n).prototype=Object.create(r.prototype),e.prototype.constructor=e,p(e,r);var a=n.prototype;return a.className=function(){return"SetPredefinedAvatarModal"},a.title=function(){return app.translator.trans("clarkwinkelmann-predefined-avatars.forum.modal.title")},a.content=function(){var t=this,e=app.forum.attribute("predefinedAvatars");return m(".Modal-body",e.map((function(e){return m("a.Avatar.Avatar--predefined",{onclick:function(){t.attrs.user.save({predefinedAvatar:e}).then((function(){t.hide()}))}},m("img",{src:app.forum.attribute("predefinedAvatarsPrefix")+e,alt:app.translator.trans("clarkwinkelmann-predefined-avatars.forum.modal.imageAlt")}))})))},n}(r.n(c).a);app.initializers.add("clarkwinkelmann-predefined-avatars",(function(){Object(n.extend)(o.a.prototype,"controlItems",(function(t){var e=this.attrs.user;e.avatarUrl()&&!app.forum.attribute("cannotRemoveAvatar")||!t.has("remove")||t.remove("remove"),app.forum.attribute("cannotSetCustomAvatar")&&t.has("upload")&&t.remove("upload"),app.forum.attribute("canSetPredefinedAvatar")&&t.add("predefined-avatars",i.a.component({icon:"fas fa-user-circle",onclick:function(){app.modal.show(f,{user:e})}},app.translator.trans("clarkwinkelmann-predefined-avatars.forum.editor.setPredefinedAvatar")))})),Object(n.override)(o.a.prototype,"quickUpload",(function(t,e){if(!app.forum.attribute("canSetPredefinedAvatar"))return t(e);var r=this.attrs.user;return!app.forum.attribute("cannotSetCustomAvatar")||r.avatarUrl()&&!app.forum.attribute("cannotRemoveAvatar")?void 0:(e.preventDefault(),e.stopPropagation(),void app.modal.show(f,{user:r}))}))}))}]);
//# sourceMappingURL=forum.js.map