import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useRoute} from '@react-navigation/native';

import { COLORS,SIZES,FONTS,icons } from "../../constants";

const AuthLayout =({childern,title, subTitle, onClosePress,bottomButton,screen })=>{
    const route = useRoute();
    return(
        <View style={{flex:1, backgroundColor:COLORS.white }}>
            <KeyboardAwareScrollView>
            
            <View style={{marginHorizontal:30}}>

            {/* Close button */}
            <View style={{alignItems:'flex-end'}}>
                <TouchableOpacity style={Styles.CloseContainer}  onPress={onClosePress}>
                <Image source={icons.close} style={{width:15,height:15}} />
                </TouchableOpacity>
            </View>

            {/* Title && subtitle */}
            <View style={Styles.TitleContainer}>
              <Text style={{...FONTS.h2, fontSize:28,paddingTop:10}} adjustsFontSizeToFit numberOfLines={1}>
                  {title}
            </Text>
            <Text style={{...FONTS.body5, color:COLORS.gray2}} adjustsFontSizeToFit numberOfLines={2}>
                  {subTitle}
            </Text>

            </View>
            
            {/* Inputs */}
                {childern}

            {/* Social Login && Sign Button */}
             <View style={{justifyContent:"center", alignItems:"center",marginTop:80}}>
                      {/* Social Buttons */}
                  {(route.name!= 'ForgotPassword' && route.name != 'Otp' ) &&

                  <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                      {/* Google */}
                    <TouchableOpacity style={{...Styles.SocialBtnFrame}} >
                       <Image source={icons.google} style={Styles.SocialImg}/>
                    </TouchableOpacity>
                         
                         {/* Facebook */}
                     <TouchableOpacity style={{...Styles.SocialBtnFrame}} >
                      <Image source={icons.facebook} style={Styles.SocialImg}/>    
                    </TouchableOpacity>
                      
                      {/* Apple */}
                     <TouchableOpacity style={{...Styles.SocialBtnFrame}} >
                      <Image source={icons.apple} style={Styles.SocialImg}/>    
                    </TouchableOpacity>
                    
                 </View>
                  }

                 {/* sign Button */}
                 <View style={{marginTop:42,paddingBottom:20}}>
                  {bottomButton}
                 </View>
             </View>

            </View>
            </KeyboardAwareScrollView>

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
        marginTop:16,
        justifyContent:"flex-start",

    },
    SocialBtnFrame:{
         width:56,
         height:56,
         borderColor:COLORS.lightGray2,
         borderWidth:1,
         borderRadius:SIZES.padding,
         justifyContent:"center",
         alignItems:"center",
         marginRight:16
    },
    SocialImg:{
        width:24,
        height: 24
    }
})