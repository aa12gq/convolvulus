/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
System.register(["./index-legacy-65d10e67.js"],(function(e,t){"use strict";var r;return{setters:[function(e){r=e.s}],execute:function(){e("g",(function(e){var t=e.page,n=e.pageSize,o=e.taskName,s=e.sort,c=e.order,a="/registerTask/getRegisterTaskList?page=".concat(t,"&pageSize=").concat(n);return o&&(a+="&taskName=".concat(o)),s&&(a+="&sort=".concat(s,"&order=").concat(c)),r({url:a,method:"get"})})),e("c",(function(e){return r({url:"/registerTask/createRegisterTask",method:"post",data:e,headers:{"Content-Type":"multipart/form-data"}})})),e("k",(function(e,t,n,o){return r({url:"/registerSubTask/getRegisterSubTaskList?page=".concat(e,"&pageSize=").concat(t,"&main_task_id=").concat(n,"&phone=").concat(o),method:"get"})})),e("D",(function(e){return r({url:"/registerSubTask/download/blocked/txt/".concat(String(e)),method:"get",responseType:"blob"})})),e("a",(function(e){return r({url:"/registerSubTask/download/blocked/excel/".concat(String(e)),method:"get",responseType:"blob"})})),e("b",(function(e){return r({url:"/registerSubTask/download/riskcontrol/txt/".concat(String(e)),method:"get",responseType:"blob"})})),e("e",(function(e){return r({url:"/registerSubTask/download/riskcontrol/excel/".concat(String(e)),method:"get",responseType:"blob"})})),e("f",(function(e){return r({url:"/registerSubTask/download/success/txt/".concat(String(e)),method:"get",responseType:"blob"})})),e("h",(function(e){return r({url:"/registerSubTask/download/success/excel/".concat(String(e)),method:"get",responseType:"blob"})})),e("i",(function(e){return r({url:"/registerSubTask/download/non_execution/txt/".concat(String(e)),method:"get",responseType:"blob"})})),e("j",(function(e){return r({url:"/registerSubTask/download/non_execution/excel/".concat(String(e)),method:"get",responseType:"blob"})})),e("d",(function(e){return r({url:"/registerTask/deleteRegisterTask",method:"delete",data:e})})),e("P",(function(e){return r({url:"/registerTask/pauseTask/".concat(e),method:"post"})})),e("R",(function(e){return r({url:"/registerTask/resumeTask/".concat(e),method:"post"})}))}}}));