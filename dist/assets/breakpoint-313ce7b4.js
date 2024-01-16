/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{S as e}from"./.pnpm-8206d43d.js";import{s as a}from"./index-e8818864.js";import{_ as l}from"./_plugin-vue_export-helper-1b428a4d.js";import"vue";const t=e=>(Vue.pushScopeId("data-v-85667c96"),e=e(),Vue.popScopeId(),e),u={class:"break-point"},n={class:"gva-table-box"},o={id:"fromCont",method:"post"},r=t((()=>Vue.createElementVNode("div",{class:"el-upload__tip"},"请上传不超过5MB的文件",-1))),s={class:"list"},i={key:0,class:"list-item"},d={class:"percentage"},p=t((()=>Vue.createElementVNode("div",{class:"tips"},"此版本为先行体验功能测试版，样式美化和性能优化正在进行中，上传切片文件和合成的完整文件分别再QMPlusserver目录的breakpointDir文件夹和fileDir文件夹",-1))),c=l(Object.assign({name:"BreakPoint"},{__name:"breakpoint",setup(l){const t=Vue.ref(null),c=Vue.ref(""),v=Vue.ref([]),m=Vue.ref([]),V=Vue.ref(NaN),f=Vue.ref(!1),h=Vue.ref(0),N=Vue.ref(!0),g=async l=>{const u=new FileReader,n=l.target.files[0];t.value=n,h.value=0,t.value.size<5242880?(u.readAsArrayBuffer(t.value),u.onload=async l=>{const u=l.target.result,n=new e.ArrayBuffer;n.append(u),c.value=n.end();const o=1048576;let r=0,s=0,i=0;for(v.value=[];s<t.value.size;){r=i*o,s=(i+1)*o;var d=t.value.slice(r,s);const e=new window.FormData;e.append("fileMd5",c.value),e.append("file",d),e.append("chunkNumber",i),e.append("fileName",t.value.name),v.value.push({key:i,formData:e}),i++}const p={fileName:t.value.name,fileMd5:c.value,chunkTotal:v.value.length},f=await(e=>a({url:"/fileUploadAndDownload/findFile",method:"get",params:e}))(p),h=f.data.file.ExaFileChunk;f.data.file.IsFinish?(m.value=[],ElementPlus.ElMessage.success("文件已秒传")):m.value=v.value.filter((e=>!(h&&h.some((a=>a.FileChunkNumber===e.key))))),V.value=m.value.length,V.value}):(f.value=!0,ElementPlus.ElMessage("请上传小于5M文件"))},w=()=>{null!==t.value?(100===h.value&&(N.value=!1),k()):ElementPlus.ElMessage("请先上传文件")},k=()=>{m.value&&m.value.forEach((a=>{a.formData.append("chunkTotal",v.value.length);const l=new FileReader,t=a.formData.get("file");l.readAsArrayBuffer(t),l.onload=l=>{const t=new e.ArrayBuffer;t.append(l.target.result),a.formData.append("chunkMd5",t.end()),E(a)}}))};Vue.watch((()=>V.value),(()=>{h.value=Math.floor((v.value.length-V.value)/v.value.length*100)}));const E=async e=>{var l;if(0===(await(l=e.formData,a({url:"/fileUploadAndDownload/breakpointContinue",method:"post",donNotShowLoading:!0,headers:{"Content-Type":"multipart/form-data"},data:l}))).code&&(V.value--,0===V.value)){const e={fileName:t.value.name,fileMd5:c.value},l=await(e=>a({url:"/fileUploadAndDownload/breakpointContinueFinish",method:"post",params:e}))(e);if(0===l.code){const e={fileName:t.value.name,fileMd5:c.value,filePath:l.data.filePath};ElementPlus.ElMessage.success("上传成功"),await((e,l)=>a({url:"/fileUploadAndDownload/removeChunk",method:"post",data:e,params:l}))(e)}}},C=Vue.ref(null),y=()=>{C.value.dispatchEvent(new MouseEvent("click"))};return(e,a)=>{const l=Vue.resolveComponent("el-divider"),c=Vue.resolveComponent("el-button"),v=Vue.resolveComponent("document"),m=Vue.resolveComponent("el-icon"),V=Vue.resolveComponent("el-progress");return Vue.openBlock(),Vue.createElementBlock("div",u,[Vue.createElementVNode("div",n,[Vue.createVNode(l,{"content-position":"left"},{default:Vue.withCtx((()=>[Vue.createTextVNode("大文件上传")])),_:1}),Vue.createElementVNode("form",o,[Vue.createElementVNode("div",{class:"fileUpload",onClick:y},[Vue.createTextVNode(" 选择文件 "),Vue.withDirectives(Vue.createElementVNode("input",{id:"file",ref_key:"FileInput",ref:C,multiple:"multiple",type:"file",onChange:g},null,544),[[Vue.vShow,!1]])])]),Vue.createVNode(c,{disabled:f.value,type:"primary",class:"uploadBtn",onClick:w},{default:Vue.withCtx((()=>[Vue.createTextVNode("上传文件")])),_:1},8,["disabled"]),r,Vue.createElementVNode("div",s,[Vue.createVNode(Vue.Transition,{name:"list",tag:"p"},{default:Vue.withCtx((()=>[t.value?(Vue.openBlock(),Vue.createElementBlock("div",i,[Vue.createVNode(m,null,{default:Vue.withCtx((()=>[Vue.createVNode(v)])),_:1}),Vue.createElementVNode("span",null,Vue.toDisplayString(t.value.name),1),Vue.createElementVNode("span",d,Vue.toDisplayString(h.value)+"%",1),Vue.createVNode(V,{"show-text":!1,"text-inside":!1,"stroke-width":2,percentage:h.value},null,8,["percentage"])])):Vue.createCommentVNode("",!0)])),_:1})]),p])])}}}),[["__scopeId","data-v-85667c96"]]);export{c as default};