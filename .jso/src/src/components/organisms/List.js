var t=r(d[0]);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t(r(d[1])),o=(t(r(d[2])),r(d[3])),c=r(d[4]),l=t(r(d[5])),s=r(d[6]),u=t(r(d[7])),f=r(d[8]),h=r(d[9]),y=r(d[10]);function j(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);n&&(c=c.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),o.push.apply(o,c)}return o}function p(t){for(var o=1;o<arguments.length;o++){var c=null!=arguments[o]?arguments[o]:{};o%2?j(Object(c),!0).forEach(function(o){(0,n.default)(t,o,c[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(c)):j(Object(c)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(c,n))})}return t}var O=function(t){var n,j=(0,s.useNavigation)();return(0,y.jsx)(c.SafeAreaView,{style:b.list__container,children:(0,y.jsx)(c.View,{children:0!=(null==(n=t.data)?void 0:n.length)?(0,y.jsx)(c.FlatList,{data:null==t?void 0:t.data,showsVerticalScrollIndicator:!1,keyExtractor:function(t){return t.id},renderItem:function(t){var n=t.item,o=h.utils.cleanItem(n);return(0,y.jsx)(l.default,{item:o,onPress:function(){return j.navigate("TransactionDetail",{item:n})}})},onEndReachedThreshold:0,onEndReached:t.endReached}):(0,y.jsxs)(c.View,{style:{justifyContent:"center",alignItems:"center",marginTop:80},children:[(0,y.jsx)(u.default,{source:r(d[11]),autoPlay:!0,loop:!0,style:{width:"100%",height:200,alignSelf:"center"}}),(0,y.jsx)(c.Text,{style:p(p({marginTop:40},f.FONTS.h2),{},{fontSize:15}),children:(0,o.t)("noResult")}),(0,y.jsx)(c.Text,{style:p(p({},f.FONTS.body5),{},{fontSize:12,opacity:.5}),children:(0,o.t)("noSearchResult")})]})})})};e.default=O;var b=c.StyleSheet.create({list__container:{height:"85%",width:"100%"}})