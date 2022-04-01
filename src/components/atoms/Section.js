import React from "react";

import { View, Text,TouchableOpacity, Image} from "react-native";
import { COLORS, FONTS } from "../../constants";

const Section = ({ label, icon,onIconPress,iconstyle, containerStyle,})=>{
    return(

        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center",...containerStyle}}>
            
            <Text style={{...FONTS.h3}}>{label}</Text>
            
            <TouchableOpacity onPress={onIconPress}>
             <Image source={icon} style={{width:15, height:15, tintColor:COLORS.black,...iconstyle}}/>
             </TouchableOpacity>
        </View>
    )
} 

export default Section;
