/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{_ as e}from"./_plugin-vue_export-helper-1b428a4d.js";const a={class:"dashboard-line-box"},t=(e=>(Vue.pushScopeId("data-v-f55864a1"),e=e(),Vue.popScopeId(),e))((()=>Vue.createElementVNode("div",{class:"dashboard-line-title"}," 访问趋势 ",-1))),o=e({__name:"echartsLine",setup(e){for(var o=[],s=1;s<13;s++)o.push("".concat(s,"月"));var l=[220,182,191,234,290,330,310,123,442,321,90,149];for(s=0;s<l.length;s++);const i=Vue.shallowRef(null),r=Vue.ref(null),n=()=>{i.value.setOption({grid:{left:"40",right:"20",top:"40",bottom:"20"},xAxis:{data:o,axisTick:{show:!1},axisLine:{show:!1},z:10},yAxis:{axisLine:{show:!1},axisTick:{show:!1},axisLabel:{textStyle:{color:"#999"}}},dataZoom:[{type:"inside"}],series:[{type:"bar",barWidth:"40%",itemStyle:{borderRadius:[5,5,0,0],color:"#188df0"},emphasis:{itemStyle:{color:"#188df0"}},data:l}]})};return Vue.onMounted((async()=>{await Vue.nextTick(),i.value=Echarts.init(r.value),n()})),Vue.onUnmounted((()=>{i.value&&(i.value.dispose(),i.value=null)})),(e,o)=>(Vue.openBlock(),Vue.createElementBlock("div",a,[t,Vue.createElementVNode("div",{ref_key:"echart",ref:r,class:"dashboard-line"},null,512)]))}},[["__scopeId","data-v-f55864a1"]]);export{o as default};