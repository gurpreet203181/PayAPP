import React from "react";
import { TouchableOpacity,Text ,Image,StyleSheet} from "react-native";
import { FONTS ,COLORS} from "../../constants"; 


const ButtonIcon = ({icon,iconStyle,label,labelStyle,containerStyle,onPress,iconPosition,disabled}) => {
    return(
       <TouchableOpacity 
       style={{
           flexDirection: "row",
           alignItems:"center",
           justifyContent:"center",
           ...containerStyle
       }}
       onPress={onPress} disabled={disabled}
       >

           {iconPosition=="LEFT" &&
             <Image source={icon} style={{...style.imgStyle, ...iconStyle}}/>
           }
           <Text style={{ ...FONTS.body3,...labelStyle,}}>
               {label}
           </Text>

            {iconPosition=="RIGHT" &&
             <Image source={icon} style={{...style.imgStyle, ...iconStyle}}
            />}

       </TouchableOpacity>
    )
}

const style = StyleSheet.create({
   imgStyle:{
   // marginLeft:5,
    width: 20,
    height: 20,
    tintColor:COLORS.black,
   }
    
})
export default ButtonIcon;