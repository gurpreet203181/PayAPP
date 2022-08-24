var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(r(d[1])),o=t(r(d[2])),l=t(r(d[3])),s=(function(t,n){if(!n&&t&&t.__esModule)return t;if(null===t||"object"!=typeof t&&"function"!=typeof t)return{default:t};var o=O(n);if(o&&o.has(t))return o.get(t);var l={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if("default"!==c&&Object.prototype.hasOwnProperty.call(t,c)){var u=s?Object.getOwnPropertyDescriptor(t,c):null;u&&(u.get||u.set)?Object.defineProperty(l,c,u):l[c]=t[c]}l.default=t,o&&o.set(t,l);return l})(r(d[4])),c=r(d[5]),u=r(d[6]),f=r(d[7]),y=r(d[8]),h=r(d[9]),p=t(r(d[10])),w=r(d[11]),x=r(d[12]),j=r(d[13]),S=r(d[14]);function O(t){if("function"!=typeof WeakMap)return null;var n=new WeakMap,o=new WeakMap;return(O=function(t){return t?o:n})(t)}function T(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);n&&(l=l.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,l)}return o}function b(t){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?T(Object(l),!0).forEach(function(n){(0,o.default)(t,n,l[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):T(Object(l)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(l,n))})}return t}var C=function(t){var o=t.navigation,O=(0,h.useSelector)(function(t){return t.transfer}),T=O.amount,C=O.contact,I=(0,h.useSelector)(function(t){return t.userInfo}).user,P=(0,s.useState)(!1),B=(0,l.default)(P,2),D=B[0],L=B[1];return(0,S.jsxs)(u.View,{style:{flex:1,backgroundColor:f.COLORS.white,alignItems:"center"},children:[(0,S.jsx)(y.Header,{title:(0,c.t)("paymentSummary"),leftIcon:f.icons.close,onLeftIconPress:function(){return o.navigate("Home")}}),(0,S.jsxs)(u.View,{style:v.container,children:[(0,S.jsx)(y.IconButton,{containerStyle:b(b({},v.IconButtonContainer),{},{backgroundColor:"#32A7E2"}),disable:!0,icon:f.icons.transfer,iconStyle:b({},v.IconButtonIcon)}),(0,S.jsx)(u.Text,{style:v.title,children:(0,c.t)("transferDetails")}),(0,S.jsx)(u.TouchableOpacity,{style:{justifyContent:"center",alignItems:"center",marginTop:10},onPress:function(){return L(!D)},children:(0,S.jsxs)(u.View,{style:{flexDirection:"row",alignItems:"center"},children:[(0,S.jsx)(u.Text,{adjustsFontSizeToFit:!0,numberOfLines:1,style:b(b({opacity:.5},f.FONTS.body5),{},{fontSize:13,letterSpacing:.3}),children:(0,c.t)("details")}),(0,S.jsx)(w.AntDesign,{name:"downcircleo",style:{opacity:.5,marginLeft:8},size:15,color:"black"})]})})]}),(0,S.jsxs)(u.ScrollView,{style:{marginBottom:20},showsVerticalScrollIndicator:!1,children:[D&&(0,S.jsxs)(u.View,{style:{justifyContent:"center",alignItems:"center",marginTop:35},children:[(0,S.jsxs)(u.View,{style:v.row,children:[(0,S.jsx)(u.Text,{style:v.rowText,children:(0,c.t)("amount")}),(0,S.jsxs)(u.Text,{style:v.rowText2,children:["\u20ac ",T]})]}),(0,S.jsxs)(u.View,{style:v.row,children:[(0,S.jsx)(u.Text,{style:v.rowText,children:(0,c.t)("receiver")}),(0,S.jsx)(u.Text,{style:v.rowText2,children:C.username})]}),(0,S.jsxs)(u.View,{style:v.row,children:[(0,S.jsx)(u.Text,{style:v.rowText,children:(0,c.t)("paymentMethod")}),(0,S.jsx)(u.Text,{style:v.rowText2,children:(0,c.t)("inAppBalance")})]})]}),(0,S.jsxs)(u.View,{style:b(b({justifyContent:"center",alignItems:"center"},f.SIZES.marginHorizontal),{},{marginTop:60}),children:[(0,S.jsxs)(u.View,{style:{flexDirection:"row",justifyContent:"center",alignItems:"center"},children:[(0,S.jsx)(p.default,{style:{width:120,height:1},dashGap:7,dashLength:6,dashColor:"#D5D5E4"}),(0,S.jsx)(y.ProfileButton,{icon:null==C?void 0:C.image,containerStyle:{backgroundColor:f.COLORS.primary,marginHorizontal:20,width:40,height:40}}),(0,S.jsx)(p.default,{style:{width:120,height:1},dashGap:7,dashLength:6,dashColor:"#D5D5E4"})]}),(0,S.jsx)(u.Text,{style:b(b({marginTop:13},f.FONTS.h4),{},{color:f.COLORS.darkBlue3,fontSize:18,letterSpacing:.3}),children:null==C?void 0:C.username}),(0,S.jsx)(u.Text,{style:b(b({color:f.COLORS.lightGray3},f.FONTS.body5),{},{fontSize:15,marginTop:10}),children:null==C?void 0:C.name})]}),(0,S.jsxs)(u.View,{style:v.totalContainer,children:[(0,S.jsx)(u.Text,{style:v.totalText,children:(0,c.t)("total")}),(0,S.jsxs)(u.Text,{style:v.totalAmount,children:["\u20ac ",T]})]})]}),(0,S.jsx)(u.View,{style:b(b({marginTop:36},f.SIZES.marginHorizontal),{},{bottom:50}),children:(0,S.jsx)(y.CustomSwipeButton,{title:(0,c.t)("swipeToSend"),onSwipeSuccess:function(){var t;return n.default.async(function(l){for(;;)switch(l.prev=l.next){case 0:return t={source_ewallet:I.ewalletId,amount:T,currency:"EUR",destination_ewallet:null==C?void 0:C.ewalletId},l.next=3,n.default.awrap(x.cloudFunction.httpsCallable("walletTransaction-Transfer_Funds_Between_Wallets")({transferObj:t}).then(function(t){var n,l;"SUCCESS"==(null==(n=t.data)?void 0:null==(l=n.status)?void 0:l.status)?o.replace("PaymentSuccess",{lottie:f.images.successfulLottie2}):((0,j.showMessage)({message:"Something Went Wrong, Please Try Again!",type:"danger"}),o.navigate("Home"))}).catch(function(t){(0,j.showMessage)({message:"Something Went Wrong, Please Try Again!",type:"danger"}),o.navigate("Home")}));case 3:case"end":return l.stop()}},null,null,null,Promise)}})})]})};e.default=C;var v=u.StyleSheet.create({container:b(b({marginTop:64},f.SIZES.marginHorizontal),{},{justifyContent:"center",alignItems:"center"}),row:{flexDirection:"row",width:350,justifyContent:"space-between",paddingHorizontal:25,marginTop:25},rowText:b(b({},f.FONTS.body5),{},{color:f.COLORS.lightGray3}),rowText2:b(b({},f.FONTS.h4),{},{color:f.COLORS.darkBlue3}),IconButtonContainer:{width:60,height:60,borderRadius:22,justifyContent:"center",alignItems:"center"},IconButtonIcon:{tintColor:f.COLORS.white,width:22,height:22},title:b(b({marginTop:24},f.FONTS.h4),{},{fontSize:16}),totalContainer:b(b({height:76,width:315},f.SIZES.marginHorizontal),{},{backgroundColor:"#E2E2F0",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:25,borderBottomStartRadius:30,borderBottomEndRadius:30,marginTop:40}),totalText:b(b({},f.FONTS.h4),{},{fontSize:16,color:f.COLORS.darkBlue3,letterSpacing:.3}),totalAmount:b(b({},f.FONTS.h4),{},{fontSize:22,color:f.COLORS.darkBlue3,paddingTop:7})})