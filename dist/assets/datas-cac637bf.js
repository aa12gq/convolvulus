/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{s as e}from"./authority-268926bd.js";import{W as t}from"./warningBar-4e9b9d77.js";import"./index-e8818864.js";import"./.pnpm-8206d43d.js";import"vue";const a={class:"sticky top-0.5 z-10 bg-white my-4"},o={class:"clear-both pt-4"},u=Object.assign({name:"Datas"},{__name:"datas",props:{row:{default:function(){return{}},type:Object},authority:{default:function(){return[]},type:Array}},emits:["changeRow"],setup(u,{expose:r,emit:l}){const i=u,n=Vue.ref([]),c=Vue.ref(!1),d=e=>{e&&e.forEach((e=>{const t={};t.authorityId=e.authorityId,t.authorityName=e.authorityName,n.value.push(t),e.children&&e.children.length&&d(e.children)}))},s=Vue.ref([]);d(i.authority),i.row.dataAuthorityId&&i.row.dataAuthorityId.forEach((e=>{const t=n.value&&n.value.filter((t=>t.authorityId===e.authorityId))&&n.value.filter((t=>t.authorityId===e.authorityId))[0];s.value.push(t)}));const h=()=>{s.value=[...n.value],l("changeRow","dataAuthorityId",s.value),c.value=!0},V=()=>{s.value=n.value.filter((e=>e.authorityId===i.row.authorityId)),l("changeRow","dataAuthorityId",s.value),c.value=!0},y=()=>{const e=[];p(i.row,e),s.value=n.value.filter((t=>e.indexOf(t.authorityId)>-1)),l("changeRow","dataAuthorityId",s.value),c.value=!0},p=(e,t)=>{t.push(e.authorityId),e.children&&e.children.forEach((e=>{p(e,t)}))},m=async()=>{0===(await e(i.row)).code&&ElementPlus.ElMessage({type:"success",message:"资源设置成功"})},f=()=>{l("changeRow","dataAuthorityId",s.value),c.value=!0};return r({enterAndNext:()=>{m()},needConfirm:c}),(e,u)=>{const r=Vue.resolveComponent("el-button"),l=Vue.resolveComponent("el-checkbox"),i=Vue.resolveComponent("el-checkbox-group");return Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createVNode(t,{title:"此功能仅用于创建角色和角色的many2many关系表，具体使用还须自己结合表实现业务，详情参考示例代码（客户示例）。此功能不建议使用，建议使用插件市场【组织管理功能（点击前往）】来管理资源权限。",href:"https://plugin.gin-vue-admin.com/#/layout/newPluginInfo?id=36"}),Vue.createElementVNode("div",a,[Vue.createVNode(r,{class:"float-left",type:"primary",onClick:h},{default:Vue.withCtx((()=>[Vue.createTextVNode("全选")])),_:1}),Vue.createVNode(r,{class:"float-left",type:"primary",onClick:V},{default:Vue.withCtx((()=>[Vue.createTextVNode("本角色")])),_:1}),Vue.createVNode(r,{class:"float-left",type:"primary",onClick:y},{default:Vue.withCtx((()=>[Vue.createTextVNode("本角色及子角色")])),_:1}),Vue.createVNode(r,{class:"float-right",type:"primary",onClick:m},{default:Vue.withCtx((()=>[Vue.createTextVNode("确 定")])),_:1})]),Vue.createElementVNode("div",o,[Vue.createVNode(i,{modelValue:s.value,"onUpdate:modelValue":u[0]||(u[0]=e=>s.value=e),onChange:f},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(n.value,((e,t)=>(Vue.openBlock(),Vue.createBlock(l,{key:t,label:e},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(e.authorityName),1)])),_:2},1032,["label"])))),128))])),_:1},8,["modelValue"])])])}}});export{u as default};
