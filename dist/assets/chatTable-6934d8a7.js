/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{W as e}from"./warningBar-4e9b9d77.js";import{s as t}from"./index-e8818864.js";import{g as a}from"./autoCode-c4ad6525.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import"./.pnpm-8206d43d.js";import"vue";const o={class:"gva-table-box"},u={key:0},r={class:"secret"},V={key:1},d=(e=>(Vue.pushScopeId("data-v-87148612"),e=e(),Vue.popScopeId(),e))((()=>Vue.createElementVNode("p",null,"确定要删除并返回吗？",-1))),c={style:{"text-align":"right","margin-top":"8px"}},n={class:"tables"},p={key:1,class:"text"},s=l({__name:"chatTable",setup(l){const s=Vue.ref(null),i=Vue.reactive({sk:""}),m=Vue.ref(""),v=async()=>{const e=await t({url:"/chatGpt/getSK",method:"get"});s.value=e.data.ok};v(),(async()=>{const e=await a();0===e.code&&(x.value=e.data.dbs)})();const h=async()=>{var e;0===(await(e=i,t({url:"/chatGpt/createSK",method:"post",data:e}))).code&&await v()},k=async()=>{0===(await t({url:"/chatGpt/deleteSK",method:"delete"})).code&&await v()},w=Vue.ref({dbname:"",chat:""}),x=Vue.ref([]),f=Vue.ref([]),b=async()=>{const e=await(a=w.value,t({url:"/chatGpt/getTable",method:"post",data:a}));var a;0===e.code&&(f.value=e.data.results||[]),m.value=e.data.sql};return(t,a)=>{const l=Vue.resolveComponent("el-input"),v=Vue.resolveComponent("el-button"),C=Vue.resolveComponent("el-empty"),y=Vue.resolveComponent("el-popover"),N=Vue.resolveComponent("el-form-item"),B=Vue.resolveComponent("el-option"),_=Vue.resolveComponent("el-select"),g=Vue.resolveComponent("el-form"),E=Vue.resolveComponent("el-table-column"),T=Vue.resolveComponent("el-table");return Vue.openBlock(),Vue.createElementBlock("div",o,[Vue.createVNode(e,{title:"使用GPT-3.5模型，存在一定不稳定性，成功率为50%左右，使用GPT-4可以极大提升成功率，但是费用较高。"}),s.value?(Vue.openBlock(),Vue.createElementBlock("div",V,[Vue.createVNode(g,{model:w.value,"label-width":"120px"},{default:Vue.withCtx((()=>[Vue.createVNode(N,{label:"删除当前sk："},{default:Vue.withCtx((()=>[Vue.createVNode(y,{placement:"top",width:"160"},{reference:Vue.withCtx((()=>[Vue.createVNode(v,{type:"primary",link:"",icon:"delete"},{default:Vue.withCtx((()=>[Vue.createTextVNode("删除")])),_:1})])),default:Vue.withCtx((()=>[d,Vue.createElementVNode("div",c,[Vue.createVNode(v,{type:"primary",onClick:k},{default:Vue.withCtx((()=>[Vue.createTextVNode("确定")])),_:1})])])),_:1})])),_:1}),Vue.createVNode(N,{label:"查询db名称："},{default:Vue.withCtx((()=>[Vue.createVNode(_,{modelValue:w.value.dbname,"onUpdate:modelValue":a[1]||(a[1]=e=>w.value.dbname=e),placeholder:"请选择库",style:{width:"115px"}},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(x.value,((e,t)=>(Vue.openBlock(),Vue.createBlock(B,{key:t,label:e.database,value:e.database},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(N,{label:"查询db描述："},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:w.value.chat,"onUpdate:modelValue":a[2]||(a[2]=e=>w.value.chat=e),autosize:{minRows:2,maxRows:4},type:"textarea",clearable:"",placeholder:"请输入对话"},null,8,["modelValue"])])),_:1}),Vue.createVNode(N,{label:"GPT生成SQL:"},{default:Vue.withCtx((()=>[Vue.createVNode(l,{modelValue:m.value,"onUpdate:modelValue":a[3]||(a[3]=e=>m.value=e),autosize:{minRows:2,maxRows:4},type:"textarea",disabled:"",placeholder:"此处展示自动生成的sql"},null,8,["modelValue"])])),_:1}),Vue.createVNode(v,{type:"primary",onClick:b},{default:Vue.withCtx((()=>[Vue.createTextVNode("查询")])),_:1})])),_:1},8,["model"]),Vue.createElementVNode("div",n,[f.value.length?(Vue.openBlock(),Vue.createBlock(T,{key:0,ref:"multipleTable",data:f.value,style:{width:"100%"},"tooltip-effect":"dark",height:"400px"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(f.value[0],((e,t)=>(Vue.openBlock(),Vue.createBlock(E,{key:t,prop:t,label:t,"min-width":"200","show-overflow-tooltip":""},null,8,["prop","label"])))),128))])),_:1},8,["data"])):(Vue.openBlock(),Vue.createElementBlock("p",p,"请在对话框输入你需要AI帮你查询的内容：）"))])])):(Vue.openBlock(),Vue.createElementBlock("div",u,[Vue.createVNode(l,{modelValue:i.sk,"onUpdate:modelValue":a[0]||(a[0]=e=>i.sk=e),class:"query-ipt",placeholder:"请输入您的ChatGpt SK",clearable:""},null,8,["modelValue"]),Vue.createVNode(v,{type:"primary",onClick:h},{default:Vue.withCtx((()=>[Vue.createTextVNode("保存")])),_:1}),Vue.createElementVNode("div",r,[Vue.createVNode(C,{description:"请到gpt网站获取您的sk：https://platform.openai.com/account/api-keys"})])]))])}}},[["__scopeId","data-v-87148612"]]);export{s as default};