module.exports=function(t){var r={};function e(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=t,e.c=r,e.d=function(t,r,a){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var n in t)e.d(a,n,function(r){return t[r]}.bind(null,n));return a},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=7)}([,function(t,r){t.exports=flarum.core.compat["forum/app"]},function(t,r){t.exports=flarum.core.compat["common/components/Button"]},function(t,r){t.exports=flarum.core.compat["common/extend"]},function(t,r){t.exports=flarum.core.compat["forum/components/AvatarEditor"]},function(t,r){t.exports=flarum.core.compat["common/components/Modal"]},,function(t,r,e){"use strict";e.r(r);var a=e(1),n=e.n(a),o=e(3),u=e(4),i=e.n(u),c=e(2),f=e.n(c);function l(t,r){return(l=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}var d=e(5),s=function(t){var r,e;function a(){for(var r,e=arguments.length,a=new Array(e),n=0;n<e;n++)a[n]=arguments[n];return(r=t.call.apply(t,[this].concat(a))||this).attrs=void 0,r}e=t,(r=a).prototype=Object.create(e.prototype),r.prototype.constructor=r,l(r,e);var o=a.prototype;return o.className=function(){return"SetPredefinedAvatarModal"},o.title=function(){return n.a.translator.trans("clarkwinkelmann-predefined-avatars.forum.modal.title")},o.content=function(){var t=this,r=n.a.forum.attribute("predefinedAvatars");return m(".Modal-body",r.map((function(r){return m("a.Avatar.Avatar--predefined",{onclick:function(){t.attrs.user.save({predefinedAvatar:r}).then((function(){t.hide()}))}},m("img",{src:n.a.forum.attribute("predefinedAvatarsPrefix")+r,alt:n.a.translator.trans("clarkwinkelmann-predefined-avatars.forum.modal.imageAlt")}))})))},a}(e.n(d).a);n.a.initializers.add("clarkwinkelmann-predefined-avatars",(function(){Object(o.extend)(i.a.prototype,"controlItems",(function(t){var r=this.attrs.user;r.avatarUrl()&&!n.a.forum.attribute("cannotRemoveAvatar")||!t.has("remove")||t.remove("remove"),n.a.forum.attribute("cannotSetCustomAvatar")&&t.has("upload")&&t.remove("upload"),n.a.forum.attribute("canSetPredefinedAvatar")&&t.add("predefined-avatars",f.a.component({icon:"fas fa-user-circle",onclick:function(){n.a.modal.show(s,{user:r})}},n.a.translator.trans("clarkwinkelmann-predefined-avatars.forum.editor.setPredefinedAvatar")))})),Object(o.override)(i.a.prototype,"quickUpload",(function(t,r){if(!n.a.forum.attribute("canSetPredefinedAvatar"))return t(r);var e=this.attrs.user;return!n.a.forum.attribute("cannotSetCustomAvatar")||e.avatarUrl()&&!n.a.forum.attribute("cannotRemoveAvatar")?void 0:(r.preventDefault(),r.stopPropagation(),void n.a.modal.show(s,{user:e}))}))}))}]);
//# sourceMappingURL=forum.js.map