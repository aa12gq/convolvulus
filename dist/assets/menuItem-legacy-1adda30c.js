/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
System.register(["./_plugin-vue_export-helper-legacy-61c4c9d1.js"],(function(e,t){"use strict";var n;return{setters:[function(e){n=e._}],execute:function(){var t=document.createElement("style");t.textContent=".gva-menu-item[data-v-e47ed229]{width:100%;flex:1;height:44px;display:flex;justify-content:flex-start;align-items:center;padding-left:4px}.gva-menu-item .gva-menu-item-title[data-v-e47ed229]{flex:1}.el-menu--collapse .el-menu-item.is-active[data-v-e47ed229]{color:var(--1e568b1c)}.el-menu-item[data-v-e47ed229]{color:var(--ec2b2a08)}.el-menu-item.is-active .gva-menu-item[data-v-e47ed229]{background:var(--1e568b1c)!important;border-radius:4px;box-shadow:0 0 2px 1px var(--1e568b1c)!important}.el-menu-item.is-active .gva-menu-item i[data-v-e47ed229],.el-menu-item.is-active .gva-menu-item span[data-v-e47ed229]{color:var(--4e97059b)}.el-menu-item:hover .gva-menu-item[data-v-e47ed229]{background:var(--5e46677c);border-radius:4px;box-shadow:0 0 2px 1px var(--5e46677c);color:var(--22d2c97e)}\n",document.head.appendChild(t);var a={key:1,class:"gva-menu-item"},o={class:"gva-menu-item-title"},u=Object.assign({name:"MenuItem"},{__name:"menuItem",props:{routerInfo:{default:function(){return null},type:Object},isCollapse:{default:function(){return!1},type:Boolean},theme:{default:function(){return{}},type:Object}},setup:function(e){var t=e;Vue.useCssVars((function(e){return{"1e568b1c":n.value,ec2b2a08:r.value,"4e97059b":u.value,"5e46677c":c.value,"22d2c97e":l.value}}));var n=Vue.ref(t.theme.activeBackground),u=Vue.ref(t.theme.activeText),r=Vue.ref(t.theme.normalText),c=Vue.ref(t.theme.hoverBackground),l=Vue.ref(t.theme.hoverText);return Vue.watch((function(){return t.theme}),(function(){n.value=t.theme.activeBackground,u.value=t.theme.activeText,r.value=t.theme.normalText,c.value=t.theme.hoverBackground,l.value=t.theme.hoverText})),function(t,n){var u=Vue.resolveComponent("el-icon"),r=Vue.resolveComponent("el-tooltip"),c=Vue.resolveComponent("el-menu-item");return Vue.openBlock(),Vue.createBlock(c,{index:e.routerInfo.name},{default:Vue.withCtx((function(){return[e.isCollapse?(Vue.openBlock(),Vue.createBlock(r,{key:0,class:"box-item",effect:"light",content:e.routerInfo.meta.title,placement:"right"},{default:Vue.withCtx((function(){return[e.routerInfo.meta.icon?(Vue.openBlock(),Vue.createBlock(u,{key:0},{default:Vue.withCtx((function(){return[(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(e.routerInfo.meta.icon)))]})),_:1})):Vue.createCommentVNode("",!0)]})),_:1},8,["content"])):(Vue.openBlock(),Vue.createElementBlock("div",a,[e.routerInfo.meta.icon?(Vue.openBlock(),Vue.createBlock(u,{key:0},{default:Vue.withCtx((function(){return[(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(e.routerInfo.meta.icon)))]})),_:1})):Vue.createCommentVNode("",!0),Vue.createElementVNode("span",o,Vue.toDisplayString(e.routerInfo.meta.title),1)]))]})),_:1},8,["index"])}}});e("default",n(u,[["__scopeId","data-v-e47ed229"]]))}}}));