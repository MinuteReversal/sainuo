webpackJsonp([8],{"1uOR":function(e,t,a){"use strict";var n=a("MlO5"),i=a("V4G2"),r=a("VU/8")(n.a,i.a,!1,null,null,null);r.options.__file="components\\AMap.vue",t.a=r.exports},AcGk:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("wgTH"),i=a("cQCG"),r=a("VU/8")(n.a,i.a,!1,null,null,null);r.options.__file="pages\\main\\integration\\AMap.vue",t.default=r.exports},MlO5:function(e,t,a){"use strict";t.a={props:{url:{type:String,default:"http://webapi.amap.com/maps?v=1.4.3&key="},amapKey:{type:String,default:"",required:!0},opts:{type:Object,default:function(){return{resizeEnable:!0,zoom:16,center:[102.711664,25.041005]}}},width:{type:String|Number,default:"100%"},height:{type:String|Number,default:"100%"}},data:function(){return{amap:null}},methods:{numberToPX:function(e){return"number"==typeof e?e+"px":e},onLoad:function(e){var t=this;t.map=new AMap.Map(t.$el,t.opts),t.$emit("load",{target:t,map:t.map,AMap:AMap})},addAmapReference:function(){var e=this,t=document.createElement("script");t.setAttribute("data-reference","amap"),t.addEventListener("load",function(t){e.onLoad(t)}),t.src=""+e.url+e.amapKey,document.querySelector("head").appendChild(t)},createReference:function(){this.isReferenced()?this.onLoad({target:this}):this.addAmapReference()},isReferenced:function(){return document.querySelectorAll("[data-reference='amap']").length>0}},mounted:function(){this.createReference()}}},V4G2:function(e,t,a){"use strict";var n=function(){var e=this.$createElement;return(this._self._c||e)("div",{style:{width:this.numberToPX(this.width),height:this.numberToPX(this.height)},attrs:{"data-role":"amap"}})};n._withStripped=!0;var i={render:n,staticRenderFns:[]};t.a=i},cQCG:function(e,t,a){"use strict";var n=function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("amap",{staticStyle:{position:"absolute",width:"100%",height:"100%"},attrs:{"amap-key":"9594c8dad9ede5935c38d750ed93d8b0"},on:{load:this.onAmapLoad}})],1)};n._withStripped=!0;var i={render:n,staticRenderFns:[]};t.a=i},wgTH:function(e,t,a){"use strict";var n=a("1uOR");t.a={components:{amap:n.a},methods:{onAmapLoad:function(e){var t,a=e.AMap,n=e.map;new a.Marker({position:n.getCenter()}).setMap(n),(t=[]).push('<div><div><img style="float:left;" src=" http://webapi.amap.com/images/autonavi.png "/></div> '),t.push('<div style="padding:0px 0px 0px 4px;"><b>傲城珠宝汇</b>'),t.push("电话 : <a href='tel:63618691'>63618691</a>   邮编 : 100102"),t.push("地址 :云南省昆明市人民中路傲城大厦B2座8楼211室</div></div>"),new a.InfoWindow({content:t.join("<br/>"),offset:new a.Pixel(5,-25)}).open(n,n.getCenter(102.711664,25.041005))}}}}});