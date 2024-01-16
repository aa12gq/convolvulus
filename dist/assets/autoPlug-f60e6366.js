/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{b as e}from"./stringFun-647a78e9.js";import{p as l,g as o,v as a}from"./.pnpm-8206d43d.js";import{k as u}from"./autoCode-c4ad6525.js";import{t}from"./doc-46160848.js";import{_ as V}from"./_plugin-vue_export-helper-1b428a4d.js";import"vue";import"./index-e8818864.js";const n={class:"gva-table-box"},r=V({__name:"autoPlug",setup(V){const r=Vue.reactive({plugName:"",routerGroup:"",hasGlobal:!0,hasRequest:!0,hasResponse:!0,global:[{key:"",type:"",desc:""}],request:[{key:"",type:"",desc:""}],response:[{key:"",type:"",desc:""}]}),d=()=>{r.plugName=e(r.plugName)},c=async()=>{if(!r.plugName||!r.routerGroup)return void ElementPlus.ElMessage.error("插件名称和插件路由组为必填项");if(r.hasGlobal){if(r.global.some((e=>{if(!e.key||!e.type)return!0})))return void ElementPlus.ElMessage.error("全局属性的key和type为必填项")}if(r.hasRequest){if(r.request.some((e=>{if(!e.key||!e.type)return!0})))return void ElementPlus.ElMessage.error("请求属性的key和type为必填项")}if(r.hasResponse){if(r.response.some((e=>{if(!e.key||!e.type)return!0})))return void ElementPlus.ElMessage.error("响应属性的key和type为必填项")}0===(await u(r)).code&&ElementPlus.ElMessageBox("创建成功，插件已自动写入后端plugin目录下，请按照自己的逻辑进行创造")},s=e=>{e.push({key:"",value:""})},p=(e,l)=>{1!==e.length?e.splice(l,1):ElementPlus.ElMessage.warning("至少有一个全局属性")};return(e,u)=>{const V=Vue.resolveComponent("el-input"),m=Vue.resolveComponent("el-form-item"),i=Vue.resolveComponent("el-checkbox"),N=Vue.resolveComponent("el-option"),k=Vue.resolveComponent("el-select"),f=Vue.resolveComponent("el-button"),b=Vue.resolveComponent("el-icon"),h=Vue.resolveComponent("el-form");return Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createElementVNode("div",n,[Vue.createVNode(h,{"label-width":"140px",class:"w-[680px]"},{default:Vue.withCtx((()=>[Vue.createVNode(m,{label:"插件名"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:r.plugName,"onUpdate:modelValue":u[0]||(u[0]=e=>r.plugName=e),placeholder:"必填（英文大写字母开头）",onBlur:d},null,8,["modelValue"])])),_:1}),Vue.createVNode(m,{label:"路由组"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{modelValue:r.routerGroup,"onUpdate:modelValue":u[1]||(u[1]=e=>r.routerGroup=e),placeholder:"将会作为插件路由组使用"},null,8,["modelValue"])])),_:1}),Vue.createVNode(m,{label:"使用全局属性"},{default:Vue.withCtx((()=>[Vue.createVNode(i,{modelValue:r.hasGlobal,"onUpdate:modelValue":u[2]||(u[2]=e=>r.hasGlobal=e)},null,8,["modelValue"])])),_:1}),r.hasGlobal?(Vue.openBlock(),Vue.createBlock(m,{key:0,label:"全局属性"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(r.global,((e,a)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:a,class:"plug-row"},[Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.key,"onUpdate:modelValue":l=>e.key=l,placeholder:"key 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(k,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l,placeholder:"type 必填"},{default:Vue.withCtx((()=>[Vue.createVNode(N,{label:"string",value:"string"}),Vue.createVNode(N,{label:"int",value:"int"}),Vue.createVNode(N,{label:"float32",value:"float32"}),Vue.createVNode(N,{label:"float64",value:"float64"}),Vue.createVNode(N,{label:"bool",value:"bool"})])),_:2},1032,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.desc,"onUpdate:modelValue":l=>e.desc=l,placeholder:"备注 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(l),circle:"",onClick:u[3]||(u[3]=e=>s(r.global))},null,8,["icon"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(o),circle:"",onClick:e=>p(r.global,a)},null,8,["icon","onClick"])])])))),128))])),_:1})):Vue.createCommentVNode("",!0),Vue.createVNode(m,{label:"使用Request"},{default:Vue.withCtx((()=>[Vue.createVNode(i,{modelValue:r.hasRequest,"onUpdate:modelValue":u[4]||(u[4]=e=>r.hasRequest=e)},null,8,["modelValue"])])),_:1}),r.hasRequest?(Vue.openBlock(),Vue.createBlock(m,{key:1,label:"Request"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(r.request,((e,a)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:a,class:"plug-row"},[Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.key,"onUpdate:modelValue":l=>e.key=l,placeholder:"key 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(k,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l,placeholder:"type 必填"},{default:Vue.withCtx((()=>[Vue.createVNode(N,{label:"string",value:"string"}),Vue.createVNode(N,{label:"int",value:"int"}),Vue.createVNode(N,{label:"float32",value:"float32"}),Vue.createVNode(N,{label:"float64",value:"float64"}),Vue.createVNode(N,{label:"bool",value:"bool"})])),_:2},1032,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.desc,"onUpdate:modelValue":l=>e.desc=l,placeholder:"备注 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(l),circle:"",onClick:u[5]||(u[5]=e=>s(r.request))},null,8,["icon"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(o),circle:"",onClick:e=>p(r.request,a)},null,8,["icon","onClick"])])])))),128))])),_:1})):Vue.createCommentVNode("",!0),Vue.createVNode(m,{label:"使用Response"},{default:Vue.withCtx((()=>[Vue.createVNode(i,{modelValue:r.hasResponse,"onUpdate:modelValue":u[6]||(u[6]=e=>r.hasResponse=e)},null,8,["modelValue"])])),_:1}),r.hasResponse?(Vue.openBlock(),Vue.createBlock(m,{key:2,label:"Response"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(r.response,((e,a)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:a,class:"plug-row"},[Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.key,"onUpdate:modelValue":l=>e.key=l,placeholder:"key 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(k,{modelValue:e.type,"onUpdate:modelValue":l=>e.type=l,placeholder:"type 必填"},{default:Vue.withCtx((()=>[Vue.createVNode(N,{label:"string",value:"string"}),Vue.createVNode(N,{label:"int",value:"int"}),Vue.createVNode(N,{label:"float32",value:"float32"}),Vue.createVNode(N,{label:"float64",value:"float64"}),Vue.createVNode(N,{label:"bool",value:"bool"})])),_:2},1032,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(V,{modelValue:e.desc,"onUpdate:modelValue":l=>e.desc=l,placeholder:"备注 必填"},null,8,["modelValue","onUpdate:modelValue"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(l),circle:"",onClick:u[7]||(u[7]=e=>s(r.response))},null,8,["icon"])]),Vue.createElementVNode("span",null,[Vue.createVNode(f,{icon:Vue.unref(o),circle:"",onClick:e=>p(r.response,a)},null,8,["icon","onClick"])])])))),128))])),_:1})):Vue.createCommentVNode("",!0),Vue.createVNode(m,null,{default:Vue.withCtx((()=>[Vue.createVNode(f,{type:"primary",onClick:c},{default:Vue.withCtx((()=>[Vue.createTextVNode("创建")])),_:1}),Vue.createVNode(b,{class:"cursor-pointer ml-3",onClick:u[8]||(u[8]=e=>Vue.unref(t)("https://www.bilibili.com/video/BV1kv4y1g7nT?p=13&vd_source=f2640257c21e3b547a790461ed94875e"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(a))])),_:1})])),_:1})])),_:1})])])}}},[["__scopeId","data-v-012edc43"]]);export{r as default};