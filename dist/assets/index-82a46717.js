/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{w as e}from"./.pnpm-8206d43d.js";import{g as t}from"./wallet-bbfbf47f.js";import{_ as a}from"./_plugin-vue_export-helper-1b428a4d.js";import"vue";import"./index-e8818864.js";const s={class:"p-6 space-y-10"},l={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},o={class:"bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between"},i=(e=>(Vue.pushScopeId("data-v-0667d0b4"),e=e(),Vue.popScopeId(),e))((()=>Vue.createElementVNode("span",{class:"text-lg font-semibold"},"钱包余额",-1))),d={class:"text-2xl font-bold text-gray-800"},r={key:0,class:"text-red-500 text-sm"},n=Vue.createStaticVNode('<div class="bg-white rounded-lg shadow-sm p-6" data-v-0667d0b4><div class="text-lg font-semibold" data-v-0667d0b4>已解封数量</div><div class="text-2xl font-bold text-gray-800" data-v-0667d0b4>693700</div></div><div class="bg-white rounded-lg shadow-sm p-6" data-v-0667d0b4><div class="text-lg font-semibold" data-v-0667d0b4>正常账号数量</div><div class="text-2xl font-bold text-gray-800" data-v-0667d0b4>72000</div></div>',2),c={class:"grid grid-cols-1 lg:grid-cols-3 gap-6"},u={class:"bg-white rounded-lg shadow-sm p-6"},p={class:"bg-white rounded-lg shadow-sm p-6"},m={class:"bg-white rounded-lg shadow-sm p-6"},V={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},v={class:"bg-white rounded-lg shadow-sm p-6"},g={class:"bg-white rounded-lg shadow-sm p-6"},f=a(Vue.defineComponent({__name:"index",setup(a){const f=Vue.reactive({balance:0});Vue.onMounted((async()=>{(async()=>{const e=await t();f.balance=e.data.balance})(),await Vue.nextTick(),setTimeout((()=>{_()}),0)}));const h={dates:["01-01","01-02","01-03","01-04","01-05"],balances:[3e3,4500,3200,5e3,4e3]},x={months:["一月","二月","三月","四月","五月"],volumes:[300,400,350,500,400]},b=[{value:1048,name:"充值"},{value:735,name:"提现"},{value:580,name:"支付"},{value:484,name:"退款"},{value:300,name:"其他"}],y=Vue.ref(null),w=Vue.ref(null),E=Vue.ref(null),N=Vue.ref(null),k=Vue.ref(null),_=()=>{const e=Echarts.init(y.value),t=Echarts.init(w.value),a=Echarts.init(E.value);e.resize(),t.resize(),a.resize();const s=Echarts.init(N.value);s.resize();const l=Echarts.init(k.value);l.resize(),s.setOption({title:{text:"每日解封号码数量"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:C.dates},yAxis:{type:"value"},series:[{data:C.unblocks,type:"line",smooth:!0}]}),l.setOption({title:{text:"每日成功解封号码数量"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:A.dates},yAxis:{type:"value"},series:[{data:A.successful,type:"line",smooth:!0}]}),e.setOption({title:{text:"钱包余额变化"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:h.dates},yAxis:{type:"value"},series:[{data:h.balances,type:"line",smooth:!0}]}),t.setOption({title:{text:"交易量"},tooltip:{trigger:"axis"},xAxis:{type:"category",data:x.months},yAxis:{type:"value"},series:[{data:x.volumes,type:"bar",barWidth:"60%"}]}),a.setOption({title:{text:"交易类型比例"},tooltip:{trigger:"item"},legend:{top:"bottom"},series:[{name:"交易类型",type:"pie",radius:"50%",data:b,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})},C={dates:["01-01","01-02","01-03","01-04","01-05"],unblocks:[120,150,100,170,200]},A={dates:["01-01","01-02","01-03","01-04","01-05"],successful:[80,120,90,160,190]};return(t,a)=>{const h=Vue.resolveComponent("el-icon"),x=Vue.resolveComponent("el-tooltip");return Vue.openBlock(),Vue.createElementBlock("div",s,[Vue.createElementVNode("div",l,[Vue.createElementVNode("div",o,[Vue.createElementVNode("div",null,[i,Vue.createVNode(x,{effect:"dark",content:"您的个人钱包余额",placement:"top"},{default:Vue.withCtx((()=>[Vue.createVNode(h,{style:{"margin-left":"4px"},size:12},{default:Vue.withCtx((()=>[Vue.createVNode(Vue.unref(e))])),_:1})])),_:1})]),Vue.createElementVNode("div",d,Vue.toDisplayString(f.balance),1),f.balance<1e3?(Vue.openBlock(),Vue.createElementBlock("div",r,Vue.toDisplayString(f.balance<100?"金额不足100元":"金额不足1000元"),1)):Vue.createCommentVNode("",!0)]),n]),Vue.createElementVNode("div",c,[Vue.createElementVNode("div",u,[Vue.createElementVNode("div",{ref_key:"balanceChartRef",ref:y,class:"echart-container"},null,512)]),Vue.createElementVNode("div",p,[Vue.createElementVNode("div",{ref_key:"transactionVolumeChartRef",ref:w,class:"echart-container"},null,512)]),Vue.createElementVNode("div",m,[Vue.createElementVNode("div",{ref_key:"transactionTypeChartRef",ref:E,class:"echart-container"},null,512)])]),Vue.createElementVNode("div",V,[Vue.createElementVNode("div",v,[Vue.createElementVNode("div",{ref_key:"dailyUnblockChartRef",ref:N,class:"echart-container"},null,512)]),Vue.createElementVNode("div",g,[Vue.createElementVNode("div",{ref_key:"successfulUnblockChartRef",ref:k,class:"echart-container"},null,512)])])])}}}),[["__scopeId","data-v-0667d0b4"]]);export{f as default};
