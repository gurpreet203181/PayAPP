var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(r(d[1])),o=(t(r(d[2])),r(d[3])),c=r(d[4]),l=r(d[5]),s=r(d[6]),u=r(d[7]);function b(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);n&&(c=c.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,c)}return o}function p(t){for(var o=1;o<arguments.length;o++){var c=null!=arguments[o]?arguments[o]:{};o%2?b(Object(c),!0).forEach(function(o){(0,n.default)(t,o,c[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):b(Object(c)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(c,n))})}return t}var O=function(t){var n=t.item,b=t.onIconPress;return(0,u.jsxs)(o.View,{style:f.container,children:[(0,u.jsx)(o.Image,{source:null!=n&&n.image?{uri:null==n?void 0:n.image}:c.images.userPlaceholder,style:f.profileImage}),(0,u.jsxs)(o.View,{style:{marginRight:10},children:[(0,u.jsx)(o.Text,{style:f.name,children:null!=n&&n.username?null==n?void 0:n.username:(0,l.t)("selectFriend")}),(0,u.jsx)(o.Text,{style:f.number,children:null==n?void 0:n.name})]}),(0,u.jsx)(o.TouchableOpacity,{style:{height:"100%",justifyContent:"center",alignItems:"center",width:40},onPress:b,children:(0,u.jsx)(s.SimpleLineIcons,{name:"arrow-down",size:20,color:"#525298"})})]})};e.default=O;var f=o.StyleSheet.create({container:{backgroundColor:"rgba(8, 160, 247, 0.06)",width:315,height:80,borderRadius:20,flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20},profileImage:{width:40,height:40,borderRadius:c.SIZES.padding},name:p(p({},c.FONTS.h4),{},{fontSize:13,color:c.COLORS.black,letterSpacing:.3}),number:p(p({},c.FONTS.body5),{},{color:c.COLORS.black,opacity:.5,letterSpacing:.3})})