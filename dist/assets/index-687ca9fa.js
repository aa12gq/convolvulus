/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{s as e}from"./.pnpm-8206d43d.js";/* empty css                                                              */import{_ as n}from"./_plugin-vue_export-helper-1b428a4d.js";import"vue";const l={key:0,class:"gvaIcon gvaIcon-fullscreen-expand"},o={key:1,class:"gvaIcon gvaIcon-fullscreen-shrink"},t=n(Object.assign({name:"Screenfull"},{__name:"index",props:{width:{type:Number,default:22},height:{type:Number,default:22},fill:{type:String,default:"#48576a"}},setup(n){Vue.onMounted((()=>{e.isEnabled&&e.on("change",u)})),Vue.onUnmounted((()=>{e.off("change")}));const t=()=>{e.isEnabled&&e.toggle()},a=Vue.ref(!0),u=()=>{a.value=!e.isFullscreen};return(e,n)=>(Vue.openBlock(),Vue.createElementBlock("div",{onClick:t},[a.value?(Vue.openBlock(),Vue.createElementBlock("div",l)):(Vue.openBlock(),Vue.createElementBlock("div",o))]))}}),[["__scopeId","data-v-7e2ba8c6"]]);export{t as default};
