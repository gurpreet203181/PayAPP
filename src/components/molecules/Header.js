import React from "react";

import { Text, View , StyleSheet, Image,TouchableOpacity } from "react-native";
import { COLORS, FONTS,icons, SIZES } from "../../constants";

const Header = ({title,leftIcon,onLeftIconPress,rightIcon, onRightIconPress}) =>{
    return(
        <View style={styles.container}>
             {/* left Icon */}
             <TouchableOpacity onPress={onLeftIconPress}>
               <Image source={leftIcon} style={{height:18, width:18}}/>
             </TouchableOpacity>

             {/* title */}
             <View style={{flex:1, alignItems:"center", justifyContent: "center"}}>
                 
                 <Text style={{...FONTS.h3,letterSpacing:0.3,color:COLORS.black2}}>
                     {title}
                  </Text>

             </View>

             
             {/* right Icon */}
             <TouchableOpacity onPress={onRightIconPress}>
               <Image source={rightIcon} style={{height:18, width:18}}/>
             </TouchableOpacity>

        </View>
    )
} 

const styles = StyleSheet.create({

    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        ...SIZES.marginHorizontal,
        marginTop:16,
        
    }
})

export default Header;