var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(r(d[1])),o=t(r(d[2])),l=(t(r(d[3])),r(d[4])),s=r(d[5]),c=r(d[6]),u=r(d[7]),y=r(d[8]),f=r(d[9]),w=r(d[10]),p=r(d[11]);function h(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);n&&(l=l.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,l)}return o}function x(t){for(var o=1;o<arguments.length;o++){var l=null!=arguments[o]?arguments[o]:{};o%2?h(Object(l),!0).forEach(function(o){(0,n.default)(t,o,l[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(l)):h(Object(l)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(l,n))})}return t}var j=function(t){var n,h=t.navigation,j=t.route,b=(0,y.useSelector)(function(t){return null==t?void 0:t.userInfo}).user,S=null==j?void 0:null==(n=j.params)?void 0:n.finalState;return(0,p.jsxs)(s.View,{style:{flex:1,alignItems:"center",backgroundColor:c.COLORS.white},children:[(0,p.jsx)(u.Header,{title:(0,l.t)("paymentSummary"),leftIcon:c.icons.close,onLeftIconPress:function(){return h.goBack()}}),(0,p.jsxs)(s.View,{style:O.container,children:[(0,p.jsx)(u.IconButton,{containerStyle:O.IconButtonContainer,disable:!0,icon:c.icons.transfer,iconStyle:x({},O.IconButtonIcon)}),(0,p.jsx)(s.Text,{style:O.title,children:(0,l.t)("withdrawDetails")})]}),(0,p.jsxs)(s.View,{style:{justifyContent:"center",alignItems:"center",marginTop:35},children:[(0,p.jsxs)(s.View,{style:O.row,children:[(0,p.jsx)(s.Text,{style:O.rowText,children:(0,l.t)("amount")}),(0,p.jsx)(s.Text,{style:O.rowText2,children:null==S?void 0:S.amount})]}),(0,p.jsxs)(s.View,{style:O.row,children:[(0,p.jsx)(s.Text,{style:O.rowText,children:(0,l.t)("payout option")}),(0,p.jsx)(s.Text,{style:O.rowText2,children:null==S?void 0:S.payoutMethod})]}),(0,p.jsxs)(s.View,{style:x(x({},O.row),{},{marginTop:50}),children:[(0,p.jsx)(s.Text,{style:O.rowText,children:(0,l.t)("total")}),(0,p.jsx)(s.Text,{style:O.rowText2,children:null==S?void 0:S.amount})]})]}),(0,p.jsx)(s.View,{style:{justifyContent:"center",alignItems:"center",position:"absolute",bottom:70,left:0,right:0},children:(0,p.jsx)(u.CustomSwipeButton,{title:(0,l.t)("confirmWithdraw"),onSwipeSuccess:function(){return o.default.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.default.awrap(f.cloudFunction.httpsCallable("payoutObject-create_Payout")({user:b,payout:S}).then(function(t){var n,o;console.log(t),"SUCCESS"==(null==(n=t.data)?void 0:null==(o=n.status)?void 0:o.status)?h.replace("PaymentSuccess",{lottie:c.images.successfulLottie2}):(0,w.showMessage)({message:"Something went wron try agian !",type:"danger"})}));case 2:case"end":return t.stop()}},null,null,null,Promise)}})})]})};e.default=j;var O=s.StyleSheet.create({row:{flexDirection:"row",width:350,justifyContent:"space-between",paddingHorizontal:25,marginTop:25},rowText:x(x({},c.FONTS.body5),{},{color:c.COLORS.black,opacity:.4}),rowText2:x(x({},c.FONTS.body5),{},{color:c.COLORS.black}),container:x(x({marginTop:64},c.SIZES.marginHorizontal),{},{justifyContent:"center",alignItems:"center"}),IconButtonContainer:{width:60,height:60,borderRadius:22,justifyContent:"center",alignItems:"center",backgroundColor:"#B548C6"},IconButtonIcon:{tintColor:c.COLORS.white,width:22,height:22},title:x(x({marginTop:24},c.FONTS.h4),{},{fontSize:16})})