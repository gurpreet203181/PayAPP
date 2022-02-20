import React from "react";
import { TouchableOpacity,Text ,Image} from "react-native";
import { FONTS ,COLORS} from "../constants"; 


const ButtonIcon = ({icon,iconStyle,label,labelStyle,containerStyle,onPress,iconPosition}) => {
    return(
       <TouchableOpacity 
       style={{
           flexDirection: "row",
           alignItems:"center",
           justifyContent:"center",
           ...containerStyle
       }}onPress={onPress}>

           {iconPosition=="LEFT" &&
             <Image source={icon} style={{
                marginLeft:5,
                width: 20,
                height: 20,
                tintColor:COLORS.black,
                ...iconStyle
            }}/>
           }
           <Text style={{ ...FONTS.body3,...labelStyle,}}>
               {label}
           </Text>

            {iconPosition=="RIGHT" &&
             <Image source={icon} style={{
                marginLeft:5,
                width: 20,
                height: 20,
                tintColor:COLORS.black,
                ...iconStyle
            }}/>}

       </TouchableOpacity>
    )
}
export default ButtonIcon;