/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{b as e}from"./.pnpm-8206d43d.js";const t={__name:"warningBar",props:{title:{type:String,default:""},href:{type:String,default:""}},setup(t){const r=t,n=()=>{r.href&&window.open(r.href)};return(r,o)=>{const a=Vue.resolveComponent("el-icon");return Vue.openBlock(),Vue.createElementBlock("div",{class:Vue.normalizeClass(["px-1.5 py-2 flex items-center bg-amber-50 rounded gap-2 mb-3 text-amber-500",t.href&&"cursor-pointer"]),onClick:n},[Vue.createVNode(a,{class:"text-xl"},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(e))])),_:1}),Vue.createElementVNode("span",null,Vue.toDisplayString(t.title),1)],2)}}};export{t as W};
