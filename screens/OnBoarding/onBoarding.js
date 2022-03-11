import React from  'react';
import {t} from '../../constants/services/i18n/config';
import { View,StyleSheet,Image,Animated,ImageBackground,Text  } from "react-native";
import { COLORS, FONTS, SIZES ,OnBoardingData,icons, images,TextButton } from "../../constants";
import { Button} from "../../components";

const OnBoarding = ({navigation}) =>{
 
  return(
       <View></View>
    )
}

export default OnBoarding;

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#4d4d4d',
        shadowOffset: {
         width: 0,
         height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 13.51,
        elevation: 5,
    },
    ButtonIcon:{
        width:20,
        height:20 ,
        tintColor:COLORS.white,
        marginLeft:32
    },
    ButtonContainer:{
        backgroundColor:COLORS.black2,
        width:155,
        height:72 ,
        borderRadius:28,
        marginRight: 37,
        marginBottom:47
    }
})