/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
import{f as a}from"./sysDictionary-30d98c9c.js";const t=Pinia.defineStore("dictionary",(()=>{const t=Vue.ref({}),e=a=>{t.value={...t.value,...a}};return{dictionaryMap:t,setDictionaryMap:e,getDictionary:async i=>{if(t.value[i]&&t.value[i].length)return t.value[i];{const r=await a({type:i});if(0===r.code){const a={},s=[];return r.data.resysDictionary.sysDictionaryDetails&&r.data.resysDictionary.sysDictionaryDetails.forEach((a=>{s.push({label:a.label,value:a.value})})),a[r.data.resysDictionary.type]=s,e(a),t.value[i]}}}}}));export{t as u};
