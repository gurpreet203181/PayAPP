var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(r(d[1])),o=t(r(d[2])),c=t(r(d[3])),l=(function(t,n){if(!n&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var o=j(n);if(o&&o.has(t))return o.get(t);var c={},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in t)if("default"!==u&&Object.prototype.hasOwnProperty.call(t,u)){var f=l?Object.getOwnPropertyDescriptor(t,u):null;f&&(f.get||f.set)?Object.defineProperty(c,u,f):c[u]=t[u]}c.default=t,o&&o.set(t,c);return c})(r(d[4])),u=r(d[5]),f=r(d[6]),s=r(d[7]),p=r(d[8]),O=t(r(d[9])),y=t(r(d[10])),h=r(d[11]);function j(t){if("function"!=typeof WeakMap)return null;var n=new WeakMap,o=new WeakMap;return(j=function(t){return t?o:n})(t)}function b(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);n&&(c=c.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,c)}return o}function v(t){for(var n=1;n<arguments.length;n++){var c=null!=arguments[n]?arguments[n]:{};n%2?b(Object(c),!0).forEach(function(n){(0,o.default)(t,n,c[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):b(Object(c)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(c,n))})}return t}var w=function(t){var o=t.navigation,j=(0,l.useState)([]),b=(0,c.default)(j,2),w=b[0],S=b[1];return(0,l.useEffect)(function(){var t;n.default.async(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,n.default.awrap(y.default.getItem("@notifications"));case 2:t=o.sent,t=JSON.parse(t),S(t?t.reverse():[]);case 5:case"end":return o.stop()}},null,null,null,Promise)},[]),(0,h.jsxs)(f.View,{style:{flex:1,backgroundColor:s.COLORS.white,alignItems:"center"},children:[(0,h.jsx)(p.Header,{title:(0,u.t)("notification"),rightIcon:0!=(null==w?void 0:w.length)?s.icons.seen:null,rightIconStyle:{width:24,height:24},leftIcon:s.icons.left_arrow,onLeftIconPress:function(){return o.goBack()}}),w>0&&(0,h.jsx)(f.FlatList,{data:w,showsVerticalScrollIndicator:!1,keyExtractor:function(t){return""+t.id},renderItem:function(t){var n=t.item;return(0,h.jsx)(f.View,{style:{marginTop:16},children:(0,h.jsx)(p.NotificationItem,{item:n})})}}),0==w.length&&(0,h.jsxs)(f.View,{style:{justifyContent:"center",alignItems:"center",marginTop:"50%"},children:[(0,h.jsx)(f.Text,{style:v(v({marginTop:40},s.FONTS.h2),{},{fontSize:15,color:s.COLORS.blue}),children:(0,u.t)("noNotification")}),(0,h.jsx)(O.default,{source:r(d[12]),autoPlay:!0,loop:!1,style:{width:"100%",height:200,alignSelf:"center"}}),console.log(w),(0,h.jsx)(f.Text,{style:v(v({},s.FONTS.body5),{},{fontSize:12,color:s.COLORS.blue}),children:(0,u.t)("noNotificationText")})]})]})};e.default=w;f.StyleSheet.create({timeText:v(v({},s.FONTS.h5),{},{color:s.COLORS.lightGray3,fontSize:15,marginTop:24})})