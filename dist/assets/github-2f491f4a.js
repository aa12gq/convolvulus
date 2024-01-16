/*! 
 Build based on gin-vue-admin 
 Time : 1705391497000 */
const t=axios.create();function e(e){return t({url:"https://api.github.com/repos/aa12gq/piece-ui/commits?page="+e,method:"get"})}function o(){return t({url:"https://api.github.com/orgs/FLIPPED-AURORA/members",method:"get"})}export{e as C,o as M};
