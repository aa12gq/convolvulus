/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import e from"./index-4e5e3f48.js";import t from"./history-850d7b4d.js";import"./.pnpm-8206d43d.js";/* empty css                                                              */import{u as l,a as u,e as o,f as a,b as n}from"./index-e8818864.js";/* empty css                                                               */import r from"./bottomInfo-c7e8bddf.js";import{C as i}from"./index-2ac7514a.js";import c from"./index-0b43b628.js";import"./index-965076c4.js";import"./menuItem-6721ffcc.js";import"./_plugin-vue_export-helper-1b428a4d.js";import"./asyncSubmenu-45c016ec.js";import"vue";const s={key:0,class:"quick-title"},V=["onClick"],d={class:"dialog-footer"},m=Object.assign({name:"CommandMenu"},{__name:"index",setup(e,{expose:t}){const o=VueRouter.useRouter(),a=VueRouter.useRouter(),n=l(),r=u(),i=Vue.ref(!1),c=Vue.ref(""),m=Vue.reactive([]),p=e=>{const t=[];return e.forEach((e=>{e.children&&e.children.length>0?t.push(...p(e.children)):e.meta.title&&e.meta.title.indexOf(c.value)>-1&&t.push({label:e.meta.title,func:()=>h(e)})})),t},v=()=>{const e={label:"跳转",children:[]},t=p(r.asyncRouters[0].children);e.children.push(...t),m.push(e)},f=()=>{const e={label:"操作",children:[]},t=[{label:"亮色主题",func:()=>x("light")},{label:"暗色主题",func:()=>x("dark")},{label:"退出登录",func:()=>n.LoginOut()}];e.children.push(...t.filter((e=>e.label.indexOf(c.value)>-1))),m.push(e)};v(),f();const h=e=>{var t,l;const u=e.name,n={},c={};(null==(t=r.routeMap[u])?void 0:t.parameters)&&(null==(l=r.routeMap[u])||l.parameters.forEach((e=>{"query"===e.type?n[e.key]=e.value:c[e.key]=e.value}))),u!==a.name&&(e.name.indexOf("http://")>-1||e.name.indexOf("https://")>-1?window.open(e.name):o.push({name:u,query:n,params:c}),i.value=!1)},x=e=>{null!==e?n.changeSideMode(e):n.changeSideMode("dark")},k=()=>{i.value=!1};return t({open:()=>{i.value=!0}}),Vue.watch(c,(()=>{m.length=0,v(),f()})),(e,t)=>{const l=Vue.resolveComponent("el-button"),u=Vue.resolveComponent("el-dialog");return Vue.openBlock(),Vue.createBlock(u,{modelValue:i.value,"onUpdate:modelValue":t[1]||(t[1]=e=>i.value=e),width:"30%",class:"overlay","show-close":!1},{header:Vue.withCtx((()=>[Vue.withDirectives(Vue.createElementVNode("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>c.value=e),class:"quick-input",placeholder:"请输入你需要快捷到达的功能"},null,512),[[Vue.vModelText,c.value]])])),footer:Vue.withCtx((()=>[Vue.createElementVNode("span",d,[Vue.createVNode(l,{onClick:k},{default:Vue.withCtx((()=>[Vue.createTextVNode("关闭")])),_:1})])])),default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(m,((e,t)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:t},[e.children.length?(Vue.openBlock(),Vue.createElementBlock("div",s,Vue.toDisplayString(e.label),1)):Vue.createCommentVNode("",!0),(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(e.children,((e,l)=>(Vue.openBlock(),Vue.createElementBlock("div",{key:t+"-"+l,class:"quick-item",onClick:e.func},Vue.toDisplayString(e.label),9,V)))),128))])))),128))])),_:1},8,["modelValue"])}}}),p={key:0,class:"gvaIcon gvaIcon-arrow-double-right"},v={key:1,class:"gvaIcon gvaIcon-arrow-double-left"},f={class:"flex items-center"},h={class:"flex justify-center items-center h-full w-full"},x={class:"cursor-pointer flex justify-center items-center"},k={"element-loading-text":"努力加载中...","element-loading-background":"rgba(0, 0, 0, 0)"},w=Object.assign({name:"Layout"},{__name:"index",setup(s){const V=VueRouter.useRouter(),d=VueRouter.useRoute(),w=u(),C=Vue.ref(!1),y=Vue.ref(!0),g=Vue.ref(!1),N=Vue.ref("");Vue.ref(!1);const _=()=>{"WIN"===window.localStorage.getItem("osType")?N.value="Ctrl":N.value="⌘";window.addEventListener("keydown",(e=>{e.ctrlKey&&"k"===e.key&&(e.preventDefault(),B())}));const e=document.body.clientWidth;e<1e3?(g.value=!0,y.value=!1,C.value=!0):e>=1e3&&e<1200?(g.value=!1,y.value=!1,C.value=!0):(g.value=!1,y.value=!0,C.value=!1)};_();const b=Vue.ref(),B=()=>{b.value.open()},E=Vue.ref(!1);Vue.onMounted((()=>{o.emit("collapse",C.value),o.emit("mobile",g.value),o.on("reload",L),o.on("showLoading",(()=>{E.value=!0})),o.on("closeLoading",(()=>{E.value=!1})),window.onresize=()=>(_(),o.emit("collapse",C.value),void o.emit("mobile",g.value)),I.loadingInstance&&I.loadingInstance.close()}));const I=l(),j=Vue.computed((()=>"dark"===I.sideMode?"#fff":"light"===I.sideMode?"#191a23":I.baseColor)),S=Vue.computed((()=>"dark"===I.sideMode?"#191a23":"light"===I.sideMode?"#fff":I.sideMode)),D=Vue.computed((()=>d.meta.matched)),M=Vue.ref(!0);let R=null;const L=async()=>{R&&window.clearTimeout(R),R=window.setTimeout((async()=>{if(d.meta.keepAlive)M.value=!1,await Vue.nextTick(),M.value=!0;else{const e=d.meta.title;V.push({name:"Reload",params:{title:e}})}}),400)},T=Vue.ref(!1),z=()=>{C.value=!C.value,y.value=!C.value,T.value=!C.value,o.emit("collapse",C.value)};return(l,u)=>{const o=Vue.resolveComponent("el-row"),s=Vue.resolveComponent("el-aside"),V=Vue.resolveComponent("el-col"),N=Vue.resolveComponent("el-breadcrumb-item"),_=Vue.resolveComponent("el-breadcrumb"),B=Vue.resolveComponent("arrow-down"),R=Vue.resolveComponent("el-icon"),L=Vue.resolveComponent("el-dropdown-item"),O=Vue.resolveComponent("el-dropdown-menu"),q=Vue.resolveComponent("el-dropdown"),A=Vue.resolveComponent("el-header"),F=Vue.resolveComponent("router-view"),U=Vue.resolveComponent("el-main"),K=Vue.resolveComponent("el-container"),W=Vue.resolveDirective("loading");return Vue.openBlock(),Vue.createBlock(K,{class:"layout-cont"},{default:Vue.withCtx((()=>[Vue.createVNode(K,{class:Vue.normalizeClass([y.value?"openside":"hideside",g.value?"mobile":""])},{default:Vue.withCtx((()=>[Vue.createVNode(o,{class:Vue.normalizeClass([T.value&&g.value?"bg-black opacity-50 w-full h-full absolute top-0 left-0 z-10":""]),onClick:u[0]||(u[0]=e=>(T.value=!T.value,y.value=!!C.value,void z()))},null,8,["class"]),Vue.createVNode(s,{class:"main-cont gva-aside",style:Vue.normalizeStyle({width:g.value?C.value?"0px":"220px":C.value?"54px":"220px"})},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",{class:"min-h-[60px] text-center transition-all duration-300 flex items-center justify-center gap-2",style:Vue.normalizeStyle({background:S.value,padding:"10px 0"})},[y.value?(Vue.openBlock(),Vue.createElementBlock("div",{key:0,class:"inline-flex text-white font-semibold text-xl",style:Vue.normalizeStyle({color:j.value})},Vue.toDisplayString(l.$GIN_VUE_ADMIN.appName),5)):Vue.createCommentVNode("",!0)],4),Vue.createVNode(e,{class:"aside"})])),_:1},8,["style"]),Vue.createVNode(U,{class:"main-cont main-right"},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.Transition,{duration:{enter:500,leave:100},mode:"out-in",name:"fade-in"},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",{style:Vue.normalizeStyle({width:"calc(100% - ".concat(g.value?"0px":C.value?"54px":"220px",")")}),class:"fixed top-0 box-border z-20"},[Vue.createVNode(o,null,{default:Vue.withCtx((()=>[Vue.createVNode(V,null,{default:Vue.withCtx((()=>[Vue.createVNode(A,{class:"header-cont"},{default:Vue.withCtx((()=>[Vue.createVNode(o,{class:"p-0 h-full"},{default:Vue.withCtx((()=>[Vue.createVNode(V,{xs:2,lg:1,md:1,sm:1,xl:1,class:"flex items-center pl-3"},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",{class:"text-black cursor-pointer text-lg leading-5",onClick:z},[C.value?(Vue.openBlock(),Vue.createElementBlock("div",p)):(Vue.openBlock(),Vue.createElementBlock("div",v))])])),_:1}),Vue.createVNode(V,{xs:10,lg:14,md:14,sm:9,xl:14,pull:1,class:"flex items-center"},{default:Vue.withCtx((()=>[Vue.withDirectives(Vue.createVNode(_,{class:"breadcrumb",separator:"/"},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(D.value.slice(1,D.value.length),(e=>(Vue.openBlock(),Vue.createBlock(N,{key:e.path},{default:Vue.withCtx((()=>[Vue.createTextVNode(Vue.toDisplayString(Vue.unref(a)(e.meta.title,Vue.unref(d))),1)])),_:2},1024)))),128))])),_:1},512),[[Vue.vShow,!g.value]])])),_:1}),Vue.createVNode(V,{xs:12,lg:9,md:9,sm:14,xl:9,class:"flex items-center justify-end pr-3"},{default:Vue.withCtx((()=>[Vue.createElementVNode("div",f,[Vue.createVNode(q,null,{dropdown:Vue.withCtx((()=>[Vue.createVNode(O,null,{default:Vue.withCtx((()=>[Vue.unref(I).userInfo.authorities?(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,{key:0},Vue.renderList(Vue.unref(I).userInfo.authorities.filter((e=>e.authorityId!==Vue.unref(I).userInfo.authorityId)),(e=>(Vue.openBlock(),Vue.createBlock(L,{key:e.authorityId,onClick:t=>(async e=>{0===(await n({authorityId:e})).code&&(window.sessionStorage.setItem("needCloseAll","true"),window.location.reload())})(e.authorityId)},{default:Vue.withCtx((()=>[Vue.createElementVNode("span",null,"切换为："+Vue.toDisplayString(e.authorityName),1)])),_:2},1032,["onClick"])))),128)):Vue.createCommentVNode("",!0),Vue.createVNode(L,{onClick:Vue.unref(I).LoginOut},{default:Vue.withCtx((()=>[Vue.createTextVNode("退出登录")])),_:1},8,["onClick"])])),_:1})])),default:Vue.withCtx((()=>[Vue.createElementVNode("div",h,[Vue.createElementVNode("span",x,[Vue.createVNode(i),Vue.withDirectives(Vue.createElementVNode("span",{class:"ml-2"},Vue.toDisplayString(Vue.unref(I).userInfo.nickName),513),[[Vue.vShow,!g.value]]),Vue.createVNode(R,null,{default:Vue.withCtx((()=>[Vue.createVNode(B)])),_:1})])])])),_:1})])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),Vue.createVNode(t,{ref:"layoutHistoryComponent"},null,512)],4)])),_:1}),M.value?(Vue.openBlock(),Vue.createBlock(F,{key:0,class:"admin-box"},{default:Vue.withCtx((({Component:e})=>[Vue.withDirectives((Vue.openBlock(),Vue.createElementBlock("div",k,[Vue.createVNode(Vue.Transition,{mode:"out-in",name:"fade-in"},{default:Vue.withCtx((()=>[(Vue.openBlock(),Vue.createBlock(Vue.KeepAlive,{include:Vue.unref(w).keepAliveRouters},[(Vue.openBlock(),Vue.createBlock(Vue.resolveDynamicComponent(e)))],1032,["include"]))])),_:2},1024)])),[[W,E.value]])])),_:1})):Vue.createCommentVNode("",!0),Vue.createVNode(r),Vue.createVNode(c),Vue.createVNode(m,{ref_key:"command",ref:b},null,512)])),_:1})])),_:1},8,["class"])])),_:1})}}});export{w as default};
