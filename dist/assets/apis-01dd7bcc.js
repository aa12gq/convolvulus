/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{e}from"./api-ac1f37dc.js";import{s as t}from"./index-e8818864.js";import"./.pnpm-8206d43d.js";import"vue";const a={class:"sticky top-0.5 z-10 bg-white"},o={class:"tree-content"},r=Object.assign({name:"Apis"},{__name:"apis",props:{row:{default:function(){return{}},type:Object}},setup(r,{expose:s}){const n=r,u=Vue.ref({children:"children",label:"description"}),l=Vue.ref(""),c=Vue.ref([]),p=Vue.ref([]),d=Vue.ref("");(async()=>{const a=(await e()).data.apis;c.value=m(a);const o=await(r={authorityId:n.row.authorityId},t({url:"/casbin/getPolicyPathByAuthorityId",method:"post",data:r}));var r;d.value=n.row.authorityId,p.value=[],o.data.paths&&o.data.paths.forEach((e=>{p.value.push("p:"+e.path+"m:"+e.method)}))})();const i=Vue.ref(!1),h=()=>{i.value=!0},m=e=>{const t={};e&&e.forEach((e=>{e.onlyId="p:"+e.path+"m:"+e.method,Object.prototype.hasOwnProperty.call(t,e.apiGroup)?t[e.apiGroup].push(e):Object.assign(t,{[e.apiGroup]:[e]})}));const a=[];for(const o in t){const e={ID:o,description:o+"组",children:t[o]};a.push(e)}return a},V=Vue.ref(null),f=async()=>{const e=V.value.getCheckedNodes(!0);var a=[];e&&e.forEach((e=>{var t={path:e.path,method:e.method};a.push(t)}));var o;0===(await(o={authorityId:d.value,casbinInfos:a},t({url:"/casbin/updateCasbin",method:"post",data:o}))).code&&ElementPlus.ElMessage({type:"success",message:"api设置成功"})};s({needConfirm:i,enterAndNext:()=>{f()}});const v=(e,t)=>!e||-1!==t.description.indexOf(e);return Vue.watch(l,(e=>{V.value.filter(e)})),(e,t)=>{const r=Vue.resolveComponent("el-input"),s=Vue.resolveComponent("el-button"),n=Vue.resolveComponent("el-tree");return Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createElementVNode("div",a,[Vue.createVNode(r,{modelValue:l.value,"onUpdate:modelValue":t[0]||(t[0]=e=>l.value=e),class:"w-3/5",placeholder:"筛选"},null,8,["modelValue"]),Vue.createVNode(s,{class:"float-right",type:"primary",onClick:f},{default:Vue.withCtx((()=>[Vue.createTextVNode("确 定")])),_:1})]),Vue.createElementVNode("div",o,[Vue.createVNode(n,{ref_key:"apiTree",ref:V,data:c.value,"default-checked-keys":p.value,props:u.value,"default-expand-all":"","highlight-current":"","node-key":"onlyId","show-checkbox":"","filter-node-method":v,onCheck:h},null,8,["data","default-checked-keys","props"])])])}}});export{r as default};
