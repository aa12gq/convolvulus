/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
!function(){function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var t,r={},n=Object.prototype,o=n.hasOwnProperty,a=Object.defineProperty||function(e,t,r){e[t]=r.value},u="function"==typeof Symbol?Symbol:{},i=u.iterator||"@@iterator",c=u.asyncIterator||"@@asyncIterator",l=u.toStringTag||"@@toStringTag";function f(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{f({},"")}catch(t){f=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var o=t&&t.prototype instanceof g?t:g,u=Object.create(o.prototype),i=new O(n||[]);return a(u,"_invoke",{value:C(e,r,i)}),u}function p(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}r.wrap=s;var h="suspendedStart",d="suspendedYield",v="executing",m="completed",y={};function g(){}function V(){}function w(){}var b={};f(b,i,(function(){return this}));var x=Object.getPrototypeOf,N=x&&x(x(T([])));N&&N!==n&&o.call(N,i)&&(b=N);var k=w.prototype=g.prototype=Object.create(b);function E(e){["next","throw","return"].forEach((function(t){f(e,t,(function(e){return this._invoke(t,e)}))}))}function _(e,t){function r(n,a,u,i){var c=p(e[n],e,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==typeof f&&o.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,u,i)}),(function(e){r("throw",e,u,i)})):t.resolve(f).then((function(e){l.value=e,u(l)}),(function(e){return r("throw",e,u,i)}))}i(c.arg)}var n;a(this,"_invoke",{value:function(e,o){function a(){return new t((function(t,n){r(e,o,t,n)}))}return n=n?n.then(a,a):a()}})}function C(e,r,n){var o=h;return function(a,u){if(o===v)throw new Error("Generator is already running");if(o===m){if("throw"===a)throw u;return{value:t,done:!0}}for(n.method=a,n.arg=u;;){var i=n.delegate;if(i){var c=L(i,n);if(c){if(c===y)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=p(e,r,n);if("normal"===l.type){if(o=n.done?m:d,l.arg===y)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=m,n.method="throw",n.arg=l.arg)}}}function L(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,L(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var a=p(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,y;var u=a.arg;return u?u.done?(r[e.resultName]=u.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):u:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function r(){for(;++n<e.length;)if(o.call(e,n))return r.value=e[n],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(typeof e+" is not iterable")}return V.prototype=w,a(k,"constructor",{value:w,configurable:!0}),a(w,"constructor",{value:V,configurable:!0}),V.displayName=f(w,l,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===V||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,w):(e.__proto__=w,f(e,l,"GeneratorFunction")),e.prototype=Object.create(k),e},r.awrap=function(e){return{__await:e}},E(_.prototype),f(_.prototype,c,(function(){return this})),r.AsyncIterator=_,r.async=function(e,t,n,o,a){void 0===a&&(a=Promise);var u=new _(s(e,t,n,o),a);return r.isGeneratorFunction(t)?u:u.next().then((function(e){return e.done?e.value:u.next()}))},E(k),f(k,l,"Generator"),f(k,i,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},r.values=T,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(P),!e)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return i.type="throw",i.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var u=this.tryEntries[a],i=u.completion;if("root"===u.tryLoc)return n("end");if(u.tryLoc<=this.prev){var c=o.call(u,"catchLoc"),l=o.call(u,"finallyLoc");if(c&&l){if(this.prev<u.catchLoc)return n(u.catchLoc,!0);if(this.prev<u.finallyLoc)return n(u.finallyLoc)}else if(c){if(this.prev<u.catchLoc)return n(u.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return n(u.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var u=a?a.completion:{};return u.type=e,u.arg=t,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(u)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),y},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),P(r),y}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},r}function t(e,t,r,n,o,a,u){try{var i=e[a](u),c=i.value}catch(l){return void r(l)}i.done?t(c):Promise.resolve(c).then(n,o)}function r(e){return function(){var r=this,n=arguments;return new Promise((function(o,a){var u=e.apply(r,n);function i(e){t(u,o,a,i,c,"next",e)}function c(e){t(u,o,a,i,c,"throw",e)}i(void 0)}))}}System.register(["./autoCode-legacy-e545ad92.js","./warningBar-legacy-fcad599f.js","./doc-legacy-d4eaa869.js","./.pnpm-legacy-10f1d416.js","./index-legacy-65d10e67.js","vue"],(function(t,n){"use strict";var o,a,u,i,c,l;return{setters:[function(e){o=e.i,a=e.d,u=e.j},function(e){i=e.W},function(e){c=e.t},function(e){l=e.v},null,null],execute:function(){var n={class:"gva-table-box"},f={class:"gva-btn-list gap-3 flex items-center"},s={class:"dialog-footer"};t("default",Object.assign({name:"AutoPkg"},{__name:"autoPkg",setup:function(t){var p=Vue.ref({packageName:"",label:"",desc:""}),h=Vue.ref({packageName:[{required:!0,message:"请输入包名",trigger:"blur"},{validator:function(e,t,r){/^\d+$/.test(t[0])?r(new Error("不能够以数字开头")):r()},trigger:"blur"}]}),d=Vue.ref(!1),v=function(){d.value=!1,p.value={packageName:"",label:"",desc:""}},m=Vue.ref(null),y=function(){var t=r(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:m.value.validate(function(){var t=r(e().mark((function t(r){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return e.next=3,o(p.value);case 3:0===e.sent.code&&ElementPlus.ElMessage({type:"success",message:"添加成功",showClose:!0}),V(),v();case 7:case"end":return e.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),g=Vue.ref([]),V=function(){var t=r(e().mark((function t(){var r;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a();case 2:0===(r=e.sent).code&&(g.value=r.data.pkgs);case 4:case"end":return e.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),w=function(){var t=r(e().mark((function t(n){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:ElementPlus.ElMessageBox.confirm("此操作仅删除数据库中的pkg存储，后端相应目录结构请自行删除与数据库保持一致！","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(r(e().mark((function t(){return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(n);case 2:0===e.sent.code&&(ElementPlus.ElMessage({type:"success",message:"删除成功!"}),V());case 4:case"end":return e.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return V(),function(e,t){var r=Vue.resolveComponent("el-button"),o=Vue.resolveComponent("el-icon"),a=Vue.resolveComponent("el-table-column"),u=Vue.resolveComponent("el-table"),V=Vue.resolveComponent("el-input"),b=Vue.resolveComponent("el-form-item"),x=Vue.resolveComponent("el-form"),N=Vue.resolveComponent("el-dialog");return Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createVNode(i,{href:"https://www.bilibili.com/video/BV1kv4y1g7nT?p=3",title:"此功能为开发环境使用，不建议发布到生产，具体使用效果请看视频https://www.bilibili.com/video/BV1kv4y1g7nT?p=3"}),Vue.createElementVNode("div",n,[Vue.createElementVNode("div",f,[Vue.createVNode(r,{type:"primary",icon:"plus",onClick:t[0]||(t[0]=function(e){d.value=!0})},{default:Vue.withCtx((function(){return[Vue.createTextVNode("新增")]})),_:1}),Vue.createVNode(o,{class:"cursor-pointer",onClick:t[1]||(t[1]=function(e){return Vue.unref(c)("https://www.bilibili.com/video/BV1kv4y1g7nT?p=3&vd_source=f2640257c21e3b547a790461ed94875e")})},{default:Vue.withCtx((function(){return[Vue.createVNode(Vue.unref(l))]})),_:1})]),Vue.createVNode(u,{data:g.value},{default:Vue.withCtx((function(){return[Vue.createVNode(a,{align:"left",label:"id",width:"60",prop:"ID"}),Vue.createVNode(a,{align:"left",label:"包名",width:"150",prop:"packageName"}),Vue.createVNode(a,{align:"left",label:"展示名",width:"150",prop:"label"}),Vue.createVNode(a,{align:"left",label:"描述","min-width":"150",prop:"desc"}),Vue.createVNode(a,{align:"left",label:"操作",width:"200"},{default:Vue.withCtx((function(e){return[Vue.createVNode(r,{icon:"delete",type:"primary",link:"",onClick:function(t){return w(e.row)}},{default:Vue.withCtx((function(){return[Vue.createTextVNode("删除")]})),_:2},1032,["onClick"])]})),_:1})]})),_:1},8,["data"])]),Vue.createVNode(N,{modelValue:d.value,"onUpdate:modelValue":t[5]||(t[5]=function(e){return d.value=e}),"before-close":v,title:"创建Package"},{footer:Vue.withCtx((function(){return[Vue.createElementVNode("div",s,[Vue.createVNode(r,{onClick:v},{default:Vue.withCtx((function(){return[Vue.createTextVNode("取 消")]})),_:1}),Vue.createVNode(r,{type:"primary",onClick:y},{default:Vue.withCtx((function(){return[Vue.createTextVNode("确 定")]})),_:1})])]})),default:Vue.withCtx((function(){return[Vue.createVNode(i,{title:"新增Pkg用于自动化代码使用"}),Vue.createVNode(x,{ref_key:"pkgForm",ref:m,model:p.value,rules:h.value,"label-width":"80px"},{default:Vue.withCtx((function(){return[Vue.createVNode(b,{label:"包名",prop:"packageName"},{default:Vue.withCtx((function(){return[Vue.createVNode(V,{modelValue:p.value.packageName,"onUpdate:modelValue":t[2]||(t[2]=function(e){return p.value.packageName=e}),autocomplete:"off"},null,8,["modelValue"])]})),_:1}),Vue.createVNode(b,{label:"展示名",prop:"label"},{default:Vue.withCtx((function(){return[Vue.createVNode(V,{modelValue:p.value.label,"onUpdate:modelValue":t[3]||(t[3]=function(e){return p.value.label=e}),autocomplete:"off"},null,8,["modelValue"])]})),_:1}),Vue.createVNode(b,{label:"描述",prop:"desc"},{default:Vue.withCtx((function(){return[Vue.createVNode(V,{modelValue:p.value.desc,"onUpdate:modelValue":t[4]||(t[4]=function(e){return p.value.desc=e}),autocomplete:"off"},null,8,["modelValue"])]})),_:1})]})),_:1},8,["model","rules"])]})),_:1},8,["modelValue"])])}}}))}}}))}();
