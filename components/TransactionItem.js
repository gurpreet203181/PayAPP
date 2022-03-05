import React from "react";

import { View, TouchableOpacity, Image, Text,StyleSheet } from "react-native";
import { COLORS,SIZES,FONTS,icons } from "../constants";

const TransactionItem =({item,onPress, })=>{
    return(
        <TouchableOpacity style={style.Container}
           underlayColor="red"
            onPress={()=> console.log("Transaction")}>
           <View style={{flexDirection:"row",alignItems:"center"}}>
            
           <Image source={item.profileImage} style={style.ImgStyle}/>
            
            {/* name */}
           <View style={style.nameContainer}>
               <Text style={{...FONTS.h3, color:COLORS.black2}}>{item.name}</Text>
               <Text style={{...FONTS.body5, color:COLORS.gray2}}>{item.date}</Text>
           </View>
           </View>
           {
               item.type ==="output" &&
               
               <Text style={{...style.amount, color:COLORS.orange}}>-{item.amount}</Text>
                   
           }
            {
               item.type ==="input" &&
               
               <Text style={{...style.amount, color:COLORS.lightGreen2}}>+{item.amount}</Text>
                   
           }

        </TouchableOpacity>
    )
}

const style= StyleSheet.create({

    Container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20,
    },
    ImgStyle:{
        width: 30,
        height: 30,
    },
    nameContainer:{
        marginLeft:30
    },
    amount:{
        ...FONTS.body3,
        color: COLORS.black2
    }

})



export default TransactionItem;