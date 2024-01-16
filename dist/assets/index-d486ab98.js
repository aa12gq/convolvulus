/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{_ as e,e as a}from"./soldAccount.vue_vue_type_script_setup_true_lang-2cc7efb2.js";import l from"./record-7fe0c086.js";import{g as t}from"./country-ad958732.js";import{W as u}from"./warningBar-4e9b9d77.js";import{g as o}from"./accoutTag-cc78c789.js";import{g as r}from"./accoutGroup-00835702.js";import"./index-e8818864.js";import"./.pnpm-8206d43d.js";import"vue";import"./_plugin-vue_export-helper-1b428a4d.js";const n={class:"gva-table-box"},d={class:"p-3"},c={class:"dialog-footer"},s=Vue.defineComponent({__name:"index",setup(s){const V=Vue.ref("first"),i=(e,a)=>{},m=Vue.ref(1),p=Vue.ref(0),v=Vue.ref(10),f=Vue.ref([]),g=e=>{m.value=e},_=e=>{v.value=e},y=Vue.ref({count:null,country_id:"",format:null,tag_id:null,group_id:null}),C=Vue.ref(null),h=()=>{Vue.nextTick((()=>{C.value?C.value.resetFields():console.error("The form reference 'Form' is not available.")})),B(),j(),(async()=>{const e=await t(1,300);0===e.code&&Array.isArray(e.data.list)&&(f.value=[],setTimeout((()=>{f.value=e.data.list}),100),p.value=e.data.total,m.value=e.data.page,v.value=e.data.pageSize)})(),y.value={count:null,country_id:null,format:null,tag_id:null,group_id:null}},k=()=>{h(),b.value=!1},w=Vue.ref("导出账号"),b=Vue.ref(!1),x=Vue.ref(""),N=Vue.ref([]),B=async()=>{const e=await r(1,100);0===e.code&&Array.isArray(e.data.list)&&(N.value=[],setTimeout((()=>{N.value=e.data.list}),100),p.value=e.data.total,m.value=e.data.page,v.value=e.data.pageSize)},E=Vue.ref([]),j=async()=>{const e=await o(1,100);0===e.code&&(E.value=[],setTimeout((()=>{E.value=e.data.list}),100),p.value=e.data.total,m.value=e.data.page,v.value=e.data.pageSize)},T=async()=>{await C.value.validate((async e=>{if(e)switch(x.value){case"export":await(async(e,a)=>{try{ElementPlus.ElMessage.info("准备下载，请稍候...");const l=await e();if(l&&l.data){const e=new Blob([l.data],{type:"text/plain"});setTimeout((()=>{const l=window.URL.createObjectURL(e),t=document.createElement("a");t.href=l,t.setAttribute("download",a),document.body.appendChild(t),t.click(),URL.revokeObjectURL(l),document.body.removeChild(t),ElementPlus.ElMessage.success("下载成功")}),3e3)}else ElementPlus.ElMessage.error("下载失败，没有获取到文件内容")}catch(l){ElementPlus.ElMessage.error("下载出错"),console.error("下载出错",l)}})((()=>a(y.value)),"导出账号.txt");break;case"edit":break;default:ElementPlus.ElMessage({type:"error",message:"未知操作",showClose:!0})}}))};return(a,t)=>{const o=Vue.resolveComponent("el-button"),r=Vue.resolveComponent("el-pagination"),s=Vue.resolveComponent("el-tab-pane"),B=Vue.resolveComponent("el-tabs"),j=Vue.resolveComponent("el-option"),U=Vue.resolveComponent("el-select"),z=Vue.resolveComponent("el-input"),L=Vue.resolveComponent("el-form"),M=Vue.resolveComponent("el-dialog");return Vue.openBlock(),Vue.createElementBlock("div",n,[Vue.createElementVNode("div",d,[Vue.createVNode(o,{type:"primary",onClick:t[0]||(t[0]=e=>(e=>{switch(e){case"export":w.value="导出账号";break;case"edit":w.value="编辑"}x.value=e,b.value=!0,h()})("export"))},{default:Vue.withCtx((()=>[Vue.createTextVNode("导出账号")])),_:1})]),Vue.createVNode(B,{modelValue:V.value,"onUpdate:modelValue":t[1]||(t[1]=e=>V.value=e),type:"card",stretch:"",class:"demo-tabs",onTabClick:i},{default:Vue.withCtx((()=>[Vue.createVNode(s,{label:"库存",name:"first",class:"-mt-4"},{default:Vue.withCtx((()=>[Vue.createVNode(e),Vue.createVNode(r,{"current-page":m.value,"page-size":v.value,"page-sizes":[10,30,50,100],total:p.value,layout:"total, sizes, prev, pager, next, jumper",onCurrentChange:g,onSizeChange:_},null,8,["current-page","page-size","total"])])),_:1}),Vue.createVNode(s,{label:"卖号记录",name:"second"},{default:Vue.withCtx((()=>[Vue.createVNode(l)])),_:1})])),_:1},8,["modelValue"]),Vue.createVNode(M,{modelValue:b.value,"onUpdate:modelValue":t[7]||(t[7]=e=>b.value=e),"before-close":k,title:w.value},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",c,[Vue.createVNode(o,{onClick:k},{default:Vue.withCtx((()=>[Vue.createTextVNode("取 消")])),_:1}),Vue.createVNode(o,{type:"primary",onClick:T},{default:Vue.withCtx((()=>[Vue.createTextVNode("确 定")])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(u,{title:"导出账号"}),Vue.createVNode(L,{ref_key:"Form",ref:C,model:y.value,"label-width":"80px",class:"space-y-6"},{default:Vue.withCtx((()=>[Vue.createVNode(U,{modelValue:y.value.country_id,"onUpdate:modelValue":t[2]||(t[2]=e=>y.value.country_id=e),filterable:"",placeholder:"请选择国家区号",style:{width:"100%"}},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(f.value,(e=>(Vue.openBlock(),Vue.createBlock(j,{key:e.ID,label:"".concat(e.code," ").concat(e.name," ").concat(e.dialingCode),value:e.ID},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),Vue.createVNode(U,{modelValue:y.value.group_id,"onUpdate:modelValue":t[3]||(t[3]=e=>y.value.group_id=e),modelModifiers:{number:!0},placeholder:"请选择分组",class:"w-full"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(N.value,(e=>(Vue.openBlock(),Vue.createBlock(j,{key:e.ID,label:e.name,value:e.ID},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),Vue.createVNode(U,{modelValue:y.value.tag_id,"onUpdate:modelValue":t[4]||(t[4]=e=>y.value.tag_id=e),modelModifiers:{number:!0},placeholder:"请选择标签",class:"w-full"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(E.value,(e=>(Vue.openBlock(),Vue.createBlock(j,{key:e.ID,label:e.name,value:e.ID},null,8,["label","value"])))),128))])),_:1},8,["modelValue"]),Vue.createVNode(z,{modelValue:y.value.count,"onUpdate:modelValue":t[5]||(t[5]=e=>y.value.count=e),placeholder:"导出数量",autocomplete:"off"},null,8,["modelValue"]),Vue.createVNode(U,{modelValue:y.value.format,"onUpdate:modelValue":t[6]||(t[6]=e=>y.value.format=e),placeholder:"导出格式",class:"w-full"},{default:Vue.withCtx((()=>[(Vue.openBlock(),Vue.createBlock(j,{key:1,label:"6列数据格式(逗号分割)",value:1}))])),_:1},8,["modelValue"])])),_:1},8,["model"])])),_:1},8,["modelValue","title"])])}}});export{s as default};
