import React, { useEffect, useState }  from "react";
import { Text,View,TouchableOpacity, Image,StyleSheet} from "react-native";
import { icons,FONTS,COLORS, SIZES } from "../../constants";


const PaymentMethodItem = ({
     icon,
     iconContainerStyle,
     label,
     onPress,
     isSelected,
     detail
    }) =>{

    return(
        <TouchableOpacity style={styles.containere} onPress={onPress}>

            <View style={{...styles.iconContanier, ...iconContainerStyle}}>
                <Image style={styles.icon} source={icon}/>
            </View>
            {/* Name and numer */}
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Text style={styles.name}>{label}</Text>
                {detail &&
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.detail}>{detail}</Text>
            }

            </View>

            {/* checkBox con */}
            <View 
            style={{
                ...styles.checkbox,
               backgroundColor: isSelected? COLORS.blue2:'rgba(8, 160, 247, 0.06);'}}
             >
                {isSelected &&
                <Image style={styles.checkedIcon} source={icons.checked}/>
                }
            </View>
        </TouchableOpacity>
    )
}

export default PaymentMethodItem;

const styles = StyleSheet.create({
    containere:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
        width: 315,
        height: 84,
        borderRadius:20,
        borderColor:'#08A0F7',
       // borderWidth:1,
        ...SIZES.marginHorizontal,
        marginTop:15,
        padding: 24,
        backgroundColor:'rgba(8, 160, 247, 0.06)'
    },
    icon:{
        width: 16,
        height: 16,
        tintColor:COLORS.white
    },
    iconContanier:{
        width:36,
        height: 36,
        borderRadius:13,
        justifyContent:"center",
        alignItems:"center"
    },
    name:{
        ...FONTS.body3,
        fontSize:14,
        color: COLORS.black2
    },
    checkbox:{
        width: 36,
        height: 36,
        borderRadius:SIZES.padding,
        backgroundColor:'rgba(8, 160, 247, 0.06);',
        borderWidth:1,
        borderColor:'#08A0F7',
        justifyContent:"center",
        alignItems:"center"
    },
    checkedIcon:{
        width: 18,
        height: 18,
        resizeMode:'contain',
        tintColor:COLORS.white
    },
    detail:{
        ...FONTS.body5,
        opacity: 0.5
    }
})