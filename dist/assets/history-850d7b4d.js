/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{u as e,e as a,f as t}from"./index-e8818864.js";import"./.pnpm-8206d43d.js";import"vue";const l={class:"router-history"},u=["tab"],n=Object.assign({name:"HistoryComponent"},{__name:"history",setup(n){const s=VueRouter.useRoute(),o=VueRouter.useRouter(),r=e=>e.name+JSON.stringify(e.query)+JSON.stringify(e.params),i=Vue.ref([]),m=Vue.ref(""),v=Vue.ref(!1),c=e(),V=e=>e.name+JSON.stringify(e.query)+JSON.stringify(e.params),d=Vue.ref(0),p=Vue.ref(0),f=Vue.ref(!1),y=Vue.ref(!1),g=Vue.ref(""),h=Vue.computed((()=>c.userInfo.authority.defaultRouter)),S=()=>{i.value=[{name:h.value,meta:{title:"首页"},query:{},params:{}}],o.push({name:h.value}),v.value=!1,sessionStorage.setItem("historys",JSON.stringify(i.value))},b=()=>{let e;const a=i.value.findIndex((a=>(r(a)===g.value&&(e=a),r(a)===g.value))),t=i.value.findIndex((e=>r(e)===m.value));i.value.splice(0,a),a>t&&o.push(e),sessionStorage.setItem("historys",JSON.stringify(i.value))},N=()=>{let e;const a=i.value.findIndex((a=>(r(a)===g.value&&(e=a),r(a)===g.value))),t=i.value.findIndex((e=>r(e)===m.value));i.value.splice(a+1,i.value.length),a<t&&o.push(e),sessionStorage.setItem("historys",JSON.stringify(i.value))},w=()=>{let e;i.value=i.value.filter((a=>(r(a)===g.value&&(e=a),r(a)===g.value))),o.push(e),sessionStorage.setItem("historys",JSON.stringify(i.value))},k=e=>{if(!i.value.some((a=>((e,a)=>{if(e.name!==a.name)return!1;if(Object.keys(e.query).length!==Object.keys(a.query).length||Object.keys(e.params).length!==Object.keys(a.params).length)return!1;for(const t in e.query)if(e.query[t]!==a.query[t])return!1;for(const t in e.params)if(e.params[t]!==a.params[t])return!1;return!0})(a,e)))){const a={};a.name=e.name,a.meta={...e.meta},delete a.meta.matched,a.query=e.query,a.params=e.params,i.value.push(a)}window.sessionStorage.setItem("activeValue",r(e))},I=Vue.ref({}),q=e=>{var a;const t=null==(a=null==e?void 0:e.props)?void 0:a.name;if(!t)return;const l=I.value[t];o.push({name:l.name,query:l.query,params:l.params})},C=e=>{const a=i.value.findIndex((a=>r(a)===e));r(s)===e&&(1===i.value.length?o.push({name:h.value}):a<i.value.length-1?o.push({name:i.value[a+1].name,query:i.value[a+1].query,params:i.value[a+1].params}):o.push({name:i.value[a-1].name,query:i.value[a-1].query,params:i.value[a-1].params})),i.value.splice(a,1)};Vue.watch((()=>v.value),(()=>{v.value?document.body.addEventListener("click",(()=>{v.value=!1})):document.body.removeEventListener("click",(()=>{v.value=!1}))})),Vue.watch((()=>s),((e,a)=>{"Login"!==e.name&&"Reload"!==e.name&&(i.value=i.value.filter((e=>!e.meta.closeTab)),k(e),sessionStorage.setItem("historys",JSON.stringify(i.value)),m.value=window.sessionStorage.getItem("activeValue"))}),{deep:!0}),Vue.watch((()=>i.value),(()=>{sessionStorage.setItem("historys",JSON.stringify(i.value)),I.value={},i.value.forEach((e=>{I.value[r(e)]=e})),a.emit("setKeepAlive",i.value)}),{deep:!0});return(()=>{a.on("closeThisPage",(()=>{C(V(s))})),a.on("closeAllPage",(()=>{S()})),a.on("mobile",(e=>{y.value=e})),a.on("collapse",(e=>{f.value=e}));const e=[{name:h.value,meta:{title:"首页"},query:{},params:{}}];i.value=JSON.parse(sessionStorage.getItem("historys"))||e,window.sessionStorage.getItem("activeValue")?m.value=window.sessionStorage.getItem("activeValue"):m.value=r(s),k(s),"true"===window.sessionStorage.getItem("needCloseAll")&&(S(),window.sessionStorage.removeItem("needCloseAll"))})(),Vue.onUnmounted((()=>{a.off("collapse"),a.off("mobile")})),(e,a)=>{const n=Vue.resolveComponent("el-tab-pane"),o=Vue.resolveComponent("el-tabs");return Vue.openBlock(),Vue.createElementBlock("div",l,[Vue.createVNode(o,{modelValue:m.value,"onUpdate:modelValue":a[0]||(a[0]=e=>m.value=e),closable:!(1===i.value.length&&e.$route.name===h.value),type:"card",onContextmenu:a[1]||(a[1]=Vue.withModifiers((e=>(e=>{if(1===i.value.length&&s.name===h.value)return!1;let a="";if(a="SPAN"===e.srcElement.nodeName?e.srcElement.offsetParent.id:e.srcElement.id,a){let t;v.value=!0,t=f.value?54:220,y.value&&(t=0),d.value=e.clientX-t,p.value=e.clientY+10,g.value=a.substring(4)}})(e)),["prevent"])),onTabClick:q,onTabRemove:C},{default:Vue.withCtx((()=>[(Vue.openBlock(!0),Vue.createElementBlock(Vue.Fragment,null,Vue.renderList(i.value,(e=>(Vue.openBlock(),Vue.createBlock(n,{key:V(e),label:e.meta.title,name:V(e),tab:e,class:"gva-tab"},{label:Vue.withCtx((()=>[Vue.createElementVNode("span",{tab:e,style:Vue.normalizeStyle({color:m.value===V(e)?Vue.unref(c).activeColor:"#333"})},[Vue.createElementVNode("i",{class:"dot",style:Vue.normalizeStyle({backgroundColor:m.value===V(e)?Vue.unref(c).activeColor:"#ddd"})},null,4),Vue.createTextVNode(" "+Vue.toDisplayString(Vue.unref(t)(e.meta.title,e)),1)],12,u)])),_:2},1032,["label","name","tab"])))),128))])),_:1},8,["modelValue","closable"]),Vue.withDirectives(Vue.createElementVNode("ul",{style:Vue.normalizeStyle({left:d.value+"px",top:p.value+"px"}),class:"contextmenu"},[Vue.createElementVNode("li",{onClick:S},"关闭所有"),Vue.createElementVNode("li",{onClick:b},"关闭左侧"),Vue.createElementVNode("li",{onClick:N},"关闭右侧"),Vue.createElementVNode("li",{onClick:w},"关闭其他")],4),[[Vue.vShow,v.value]])])}}});export{n as default};