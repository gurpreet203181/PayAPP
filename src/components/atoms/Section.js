import React from "react";

import { View, Text,TouchableOpacity, Image} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const Section = ({ label, icon,onIconPress,iconstyle, containerStyle,labelStyle})=>{
    return(
        <View style={{flexDirection:"row", justifyContent:"space-between",marginTop:16,alignItems:"center",...SIZES.marginHorizontal,...containerStyle}}>
           
           <Text style={{...FONTS.body5, fontSize:14, color:'#082431',opacity:0.5,letterSpacing:0.3,...labelStyle}}>
               {label}
            </Text>
            <TouchableOpacity onPress={onIconPress}>
                <Image source={icon} style={{width:24, height:24, ...iconstyle}}/>
            </TouchableOpacity>


        </View>
    )
} 

export default Section;
