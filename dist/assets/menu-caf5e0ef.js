/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{l as e,m as t,n as l,o as a,p as u}from"./index-e8818864.js";import o from"./icon-12a89ffd.js";import{W as d}from"./warningBar-4e9b9d77.js";import{c as V}from"./authorityBtn-58ed1ba1.js";import{q as r,v as n}from"./.pnpm-8206d43d.js";import{t as i}from"./doc-46160848.js";import{_ as c}from"./_plugin-vue_export-helper-1b428a4d.js";import"vue";const m=e=>(Vue.pushScopeId("data-v-655622ea"),e=e(),Vue.popScopeId(),e),p={class:"gva-table-box"},s={class:"gva-btn-list"},v={key:0,class:"icon-column"},h={style:{display:"inline-flex","align-items":"center"}},f=m((()=>Vue.createElementVNode("span",null,"路由Path",-1))),w=m((()=>Vue.createElementVNode("span",{style:{"font-size":"12px","margin-right":"12px"}},"如果菜单包含子菜单，请创建router-view二级路由页面或者",-1))),N=m((()=>Vue.createElementVNode("span",null," 高亮菜单 ",-1))),x=m((()=>Vue.createElementVNode("span",null," 是否为基础页面 ",-1))),C={class:"flex items-center gap-2"},y={class:"flex items-center gap-2 mt-3"},b={class:"dialog-footer"},g=c(Object.assign({name:"Menus"},{__name:"menu",setup(c){const m=Vue.reactive({path:[{required:!0,message:"请输入菜单name",trigger:"blur"}],component:[{required:!0,message:"请输入文件路径",trigger:"blur"}],"meta.title":[{required:!0,message:"请输入菜单展示名称",trigger:"blur"}]}),g=Vue.ref(1),_=Vue.ref(0),k=Vue.ref(999),I=Vue.ref([]),E=Vue.ref({}),D=async()=>{const t=await e({page:g.value,pageSize:k.value,...E.value});0===t.code&&(I.value=t.data.list,_.value=t.data.total,g.value=t.data.page,k.value=t.data.pageSize)};D();const U=()=>{B.value.component=B.value.component.replace(/\\/g,"/")},B=Vue.ref({ID:0,path:"",name:"",hidden:!1,parentId:"",component:"",meta:{activeName:"",title:"",icon:"",defaultMenu:!1,closeTab:!1,keepAlive:!1},parameters:[],menuBtn:[]}),T=()=>{B.value.path=B.value.name},M=e=>{j(),e()},S=Vue.ref(null),q=Vue.ref(!1),j=()=>{q.value=!1,S.value.resetFields(),B.value={ID:0,path:"",name:"",hidden:!1,parentId:"",component:"",meta:{title:"",icon:"",defaultMenu:!1,closeTab:!1,keepAlive:!1}}},A=Vue.ref(!1),P=()=>{j(),A.value=!1},z=async()=>{S.value.validate((async e=>{if(e){let e;e=K.value?await l(B.value):await a(B.value),0===e.code&&(ElementPlus.ElMessage({type:"success",message:K.value?"编辑成功":"添加成功!"}),D()),j(),A.value=!1}}))},F=Vue.ref([{ID:"0",title:"根菜单"}]),$=()=>{F.value=[{ID:"0",title:"根目录"}],H(I.value,F.value,!1)},H=(e,t,l)=>{e&&e.forEach((e=>{if(e.children&&e.children.length){const a={title:e.meta.title,ID:String(e.ID),disabled:l||e.ID===B.value.ID,children:[]};H(e.children,a.children,l||e.ID===B.value.ID),t.push(a)}else{const a={title:e.meta.title,ID:String(e.ID),disabled:l||e.ID===B.value.ID};t.push(a)}}))},K=Vue.ref(!1),O=Vue.ref("新增菜单"),W=e=>{O.value="新增菜单",B.value.parentId=String(e),K.value=!1,$(),A.value=!0};return(e,l)=>{const a=Vue.resolveComponent("el-button"),c=Vue.resolveComponent("el-table-column"),_=Vue.resolveComponent("el-icon"),k=Vue.resolveComponent("el-table"),E=Vue.resolveComponent("el-input"),j=Vue.resolveComponent("el-form-item"),H=Vue.resolveComponent("el-checkbox"),G=Vue.resolveComponent("el-option"),J=Vue.resolveComponent("el-select"),L=Vue.resolveComponent("el-cascader"),Q=Vue.resolveComponent("el-tooltip"),R=Vue.resolveComponent("el-form"),X=Vue.resolveComponent("el-dialog");return Vue.openBlock(),Vue.createElementBlock("div",null,[Vue.createElementVNode("div",p,[Vue.createElementVNode("div",s,[Vue.createVNode(a,{type:"primary",icon:"plus",onClick:l[0]||(l[0]=e=>W("0"))},{default:Vue.withCtx((()=>[Vue.createTextVNode("新增根菜单")])),_:1})]),Vue.createVNode(k,{data:I.value,"row-key":"ID"},{default:Vue.withCtx((()=>[Vue.createVNode(c,{align:"left",label:"ID","min-width":"100",prop:"ID"}),Vue.createVNode(c,{align:"left",label:"展示名称","min-width":"120",prop:"authorityName"},{default:Vue.withCtx((e=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.row.meta.title),1)])),_:1}),Vue.createVNode(c,{align:"left",label:"图标","min-width":"140",prop:"authorityName"},{default:Vue.withCtx((e=>[e.row.meta.icon?(Vue.openBlock(),Vue.createElementBlock("div",v,[Vue.createVNode(_,null,{default:Vue.withCtx((()=>[(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(e.row.meta.icon)))])),_:2},1024),Vue.createElementVNode("span",null,Vue.toDisplayString(e.row.meta.icon),1)])):Vue.createCommentVNode("",!0)])),_:1}),Vue.createVNode(c,{align:"left",label:"路由Name","show-overflow-tooltip":"","min-width":"160",prop:"name"}),Vue.createVNode(c,{align:"left",label:"路由Path","show-overflow-tooltip":"","min-width":"160",prop:"path"}),Vue.createVNode(c,{align:"left",label:"是否隐藏","min-width":"100",prop:"hidden"},{default:Vue.withCtx((e=>[Vue.createElementVNode("span",null,Vue.toDisplayString(e.row.hidden?"隐藏":"显示"),1)])),_:1}),Vue.createVNode(c,{align:"left",label:"父节点","min-width":"90",prop:"parentId"}),Vue.createVNode(c,{align:"left",label:"排序","min-width":"70",prop:"sort"}),Vue.createVNode(c,{align:"left",label:"文件路径","min-width":"360",prop:"component"}),Vue.createVNode(c,{align:"left",fixed:"right",label:"操作",width:"300"},{default:Vue.withCtx((e=>[Vue.createVNode(a,{type:"primary",link:"",icon:"plus",onClick:t=>W(e.row.ID)},{default:Vue.withCtx((()=>[Vue.createTextVNode("添加子菜单")])),_:2},1032,["onClick"]),Vue.createVNode(a,{type:"primary",link:"",icon:"edit",onClick:t=>(async e=>{O.value="编辑菜单";const t=await u({id:e});B.value=t.data.menu,K.value=!0,$(),A.value=!0})(e.row.ID)},{default:Vue.withCtx((()=>[Vue.createTextVNode("编辑")])),_:2},1032,["onClick"]),Vue.createVNode(a,{type:"primary",link:"",icon:"delete",onClick:l=>{return a=e.row.ID,void ElementPlus.ElMessageBox.confirm("此操作将永久删除所有角色下该菜单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((async()=>{0===(await t({ID:a})).code&&(ElementPlus.ElMessage({type:"success",message:"删除成功!"}),1===I.value.length&&g.value>1&&g.value--,D())})).catch((()=>{ElementPlus.ElMessage({type:"info",message:"已取消删除"})}));var a}},{default:Vue.withCtx((()=>[Vue.createTextVNode("删除")])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])]),Vue.createVNode(X,{modelValue:A.value,"onUpdate:modelValue":l[19]||(l[19]=e=>A.value=e),"before-close":M,title:O.value},{footer:Vue.withCtx((()=>[Vue.createElementVNode("div",b,[Vue.createVNode(a,{onClick:P},{default:Vue.withCtx((()=>[Vue.createTextVNode("取 消")])),_:1}),Vue.createVNode(a,{type:"primary",onClick:z},{default:Vue.withCtx((()=>[Vue.createTextVNode("确 定")])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(d,{title:"新增菜单，需要在角色管理内配置权限才可使用"}),A.value?(Vue.openBlock(),Vue.createBlock(R,{key:0,ref_key:"menuForm",ref:S,inline:!0,model:B.value,rules:m,"label-position":"top","label-width":"85px"},{default:Vue.withCtx((()=>[Vue.createVNode(j,{label:"路由Name",prop:"path",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.name,"onUpdate:modelValue":l[1]||(l[1]=e=>B.value.name=e),autocomplete:"off",placeholder:"唯一英文字符串",onChange:T},null,8,["modelValue"])])),_:1}),Vue.createVNode(j,{prop:"path",style:{width:"30%"}},{label:Vue.withCtx((()=>[Vue.createElementVNode("span",h,[f,Vue.createVNode(H,{modelValue:q.value,"onUpdate:modelValue":l[2]||(l[2]=e=>q.value=e),style:{"margin-left":"12px",height:"auto"}},{default:Vue.withCtx((()=>[Vue.createTextVNode("添加参数")])),_:1},8,["modelValue"])])])),default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.path,"onUpdate:modelValue":l[3]||(l[3]=e=>B.value.path=e),disabled:!q.value,autocomplete:"off",placeholder:"建议只在后方拼接参数"},null,8,["modelValue","disabled"])])),_:1}),Vue.createVNode(j,{label:"是否隐藏",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(J,{modelValue:B.value.hidden,"onUpdate:modelValue":l[4]||(l[4]=e=>B.value.hidden=e),placeholder:"是否在列表隐藏"},{default:Vue.withCtx((()=>[Vue.createVNode(G,{value:!1,label:"否"}),Vue.createVNode(G,{value:!0,label:"是"})])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(j,{label:"父节点ID",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(L,{modelValue:B.value.parentId,"onUpdate:modelValue":l[5]||(l[5]=e=>B.value.parentId=e),style:{width:"100%"},disabled:!K.value,options:F.value,props:{checkStrictly:!0,label:"title",value:"ID",disabled:"disabled",emitPath:!1},"show-all-levels":!1,filterable:""},null,8,["modelValue","disabled","options"])])),_:1}),Vue.createVNode(j,{label:"文件路径",prop:"component",style:{width:"60%"}},{default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.component,"onUpdate:modelValue":l[6]||(l[6]=e=>B.value.component=e),autocomplete:"off",placeholder:"页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue",onBlur:U},null,8,["modelValue"]),w,Vue.createVNode(a,{style:{"margin-top":"4px"},onClick:l[7]||(l[7]=e=>B.value.component="view/routerHolder.vue")},{default:Vue.withCtx((()=>[Vue.createTextVNode("点我设置")])),_:1})])),_:1}),Vue.createVNode(j,{label:"展示名称",prop:"meta.title",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.meta.title,"onUpdate:modelValue":l[8]||(l[8]=e=>B.value.meta.title=e),autocomplete:"off"},null,8,["modelValue"])])),_:1}),Vue.createVNode(j,{label:"图标",prop:"meta.icon",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(o,{meta:B.value.meta,style:{width:"100%"}},null,8,["meta"])])),_:1}),Vue.createVNode(j,{label:"排序标记",prop:"sort",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.sort,"onUpdate:modelValue":l[9]||(l[9]=e=>B.value.sort=e),modelModifiers:{number:!0},autocomplete:"off"},null,8,["modelValue"])])),_:1}),Vue.createVNode(j,{prop:"meta.activeName",style:{width:"30%"}},{label:Vue.withCtx((()=>[Vue.createElementVNode("div",null,[N,Vue.createVNode(Q,{content:"注：当到达此路由时候，指定左侧菜单指定name会处于活跃状态（亮起），可为空，为空则为本路由Name。",placement:"top",effect:"light"},{default:Vue.withCtx((()=>[Vue.createVNode(_,null,{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(r))])),_:1})])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(E,{modelValue:B.value.meta.activeName,"onUpdate:modelValue":l[10]||(l[10]=e=>B.value.meta.activeName=e),placeholder:B.value.name,autocomplete:"off"},null,8,["modelValue","placeholder"])])),_:1}),Vue.createVNode(j,{label:"KeepAlive",prop:"meta.keepAlive",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(J,{modelValue:B.value.meta.keepAlive,"onUpdate:modelValue":l[11]||(l[11]=e=>B.value.meta.keepAlive=e),style:{width:"100%"},placeholder:"是否keepAlive缓存页面"},{default:Vue.withCtx((()=>[Vue.createVNode(G,{value:!1,label:"否"}),Vue.createVNode(G,{value:!0,label:"是"})])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(j,{label:"CloseTab",prop:"meta.closeTab",style:{width:"30%"}},{default:Vue.withCtx((()=>[Vue.createVNode(J,{modelValue:B.value.meta.closeTab,"onUpdate:modelValue":l[12]||(l[12]=e=>B.value.meta.closeTab=e),style:{width:"100%"},placeholder:"是否自动关闭tab"},{default:Vue.withCtx((()=>[Vue.createVNode(G,{value:!1,label:"否"}),Vue.createVNode(G,{value:!0,label:"是"})])),_:1},8,["modelValue"])])),_:1}),Vue.createVNode(j,{style:{width:"30%"}},{label:Vue.withCtx((()=>[Vue.createElementVNode("div",null,[x,Vue.createVNode(Q,{content:"此项选择为是，则不会展示左侧菜单以及顶部信息。",placement:"top",effect:"light"},{default:Vue.withCtx((()=>[Vue.createVNode(_,null,{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(r))])),_:1})])),_:1})])])),default:Vue.withCtx((()=>[Vue.createVNode(J,{modelValue:B.value.meta.defaultMenu,"onUpdate:modelValue":l[13]||(l[13]=e=>B.value.meta.defaultMenu=e),style:{width:"100%"},placeholder:"是否为基础页面"},{default:Vue.withCtx((()=>[Vue.createVNode(G,{value:!1,label:"否"}),Vue.createVNode(G,{value:!0,label:"是"})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])):Vue.createCommentVNode("",!0),Vue.createElementVNode("div",null,[Vue.createElementVNode("div",C,[Vue.createVNode(a,{type:"primary",icon:"edit",onClick:l[14]||(l[14]=e=>{return(t=B.value).parameters||(t.parameters=[]),void t.parameters.push({type:"query",key:"",value:""});var t})},{default:Vue.withCtx((()=>[Vue.createTextVNode("新增菜单参数")])),_:1}),Vue.createVNode(_,{class:"cursor-pointer",onClick:l[15]||(l[15]=e=>Vue.unref(i)("https://www.bilibili.com/video/BV1kv4y1g7nT?p=9&vd_source=f2640257c21e3b547a790461ed94875e"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(n))])),_:1})]),Vue.createVNode(k,{data:B.value.parameters,style:{width:"100%","margin-top":"12px"}},{default:Vue.withCtx((()=>[Vue.createVNode(c,{align:"left",prop:"type",label:"参数类型",width:"180"},{default:Vue.withCtx((e=>[Vue.createVNode(J,{modelValue:e.row.type,"onUpdate:modelValue":t=>e.row.type=t,placeholder:"请选择"},{default:Vue.withCtx((()=>[Vue.createVNode(G,{key:"query",value:"query",label:"query"}),Vue.createVNode(G,{key:"params",value:"params",label:"params"})])),_:2},1032,["modelValue","onUpdate:modelValue"])])),_:1}),Vue.createVNode(c,{align:"left",prop:"key",label:"参数key",width:"180"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(E,{modelValue:e.row.key,"onUpdate:modelValue":t=>e.row.key=t},null,8,["modelValue","onUpdate:modelValue"])])])),_:1}),Vue.createVNode(c,{align:"left",prop:"value",label:"参数值"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(E,{modelValue:e.row.value,"onUpdate:modelValue":t=>e.row.value=t},null,8,["modelValue","onUpdate:modelValue"])])])),_:1}),Vue.createVNode(c,{align:"left"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(a,{type:"danger",icon:"delete",onClick:t=>{return l=B.value.parameters,a=e.$index,void l.splice(a,1);var l,a}},{default:Vue.withCtx((()=>[Vue.createTextVNode("删除")])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"]),Vue.createElementVNode("div",y,[Vue.createVNode(a,{type:"primary",icon:"edit",onClick:l[16]||(l[16]=e=>{return(t=B.value).menuBtn||(t.menuBtn=[]),void t.menuBtn.push({name:"",desc:""});var t})},{default:Vue.withCtx((()=>[Vue.createTextVNode("新增可控按钮 ")])),_:1}),Vue.createVNode(_,{class:"cursor-pointer",onClick:l[17]||(l[17]=e=>Vue.unref(i)("https://www.gin-vue-admin.com/guide/web/button-auth.html"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(r))])),_:1}),Vue.createVNode(_,{class:"cursor-pointer",onClick:l[18]||(l[18]=e=>Vue.unref(i)("https://www.bilibili.com/video/BV1kv4y1g7nT?p=11&vd_source=f2640257c21e3b547a790461ed94875e"))},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(n))])),_:1})]),Vue.createVNode(k,{data:B.value.menuBtn,style:{width:"100%","margin-top":"12px"}},{default:Vue.withCtx((()=>[Vue.createVNode(c,{align:"left",prop:"name",label:"按钮名称",width:"180"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(E,{modelValue:e.row.name,"onUpdate:modelValue":t=>e.row.name=t},null,8,["modelValue","onUpdate:modelValue"])])])),_:1}),Vue.createVNode(c,{align:"left",prop:"name",label:"备注",width:"180"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(E,{modelValue:e.row.desc,"onUpdate:modelValue":t=>e.row.desc=t},null,8,["modelValue","onUpdate:modelValue"])])])),_:1}),Vue.createVNode(c,{align:"left"},{default:Vue.withCtx((e=>[Vue.createElementVNode("div",null,[Vue.createVNode(a,{type:"danger",icon:"delete",onClick:t=>(async(e,t)=>{const l=e[t];if(0===l.ID)return void e.splice(t,1);0===(await V({id:l.ID})).code&&e.splice(t,1)})(B.value.menuBtn,e.$index)},{default:Vue.withCtx((()=>[Vue.createTextVNode("删除")])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])])])),_:1},8,["modelValue","title"])])}}}),[["__scopeId","data-v-655622ea"]]);export{g as default};
