import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { COLORS,SIZES,FONTS,icons } from "../../constants";

const AuthLayout =({childern,title, subTitle, onClosePress })=>{
    return(
        <View style={{flex:1, backgroundColor:COLORS.white }}>
            
            <View style={{marginHorizontal:30}}>

            {/* Close button */}
            <TouchableOpacity style={{alignItems:'flex-end'}} onPress={onClosePress}>
                <View style={Styles.CloseContainer}>
                <Image source={icons.close} style={{width:15,height:15}} />
                </View>
            </TouchableOpacity>

            {/* Title && subtitle */}
            <View style={Styles.TitleContainer}>
              <Text style={{...FONTS.h1, fontSize:28}} adjustsFontSizeToFit numberOfLines={1}>
                  {title}
            </Text>
            <Text style={{...FONTS.body5, color:COLORS.gray2}} adjustsFontSizeToFit numberOfLines={1}>
                  {subTitle}
            </Text>

            </View>
            
            {/* Inputs */}
            <KeyboardAwareScrollView>
                {childern}
            </KeyboardAwareScrollView>

            {/* Social Login && Sign Button */}
             <View>

             </View>
            </View>

        </View>
    )
}

export default AuthLayout;

const Styles = StyleSheet.create({
    CloseContainer:{
        backgroundColor:COLORS.lightGray2 , 
        borderRadius:SIZES.padding,
         height:44,
         width:44,
         marginTop:35, 
         justifyContent:"center",
         alignItems:"center"
    },
    TitleContainer:{
        marginTop:26,
        justifyContent:"flex-start",
        

    }
})