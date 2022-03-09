import React from  'react';
import {t} from '../../constants/services/i18n/config';
import { View,StyleSheet,Image  ,Button} from "react-native";
import { COLORS, FONTS, SIZES ,OnBoardingData,icons, } from "../../constants";

import Onboarding from 'react-native-onboarding-swiper';

const NextButton= ()=>{
  return(
    
      <Button 
      title='Sign in'
      buttonStyle={{
        backgroundColor: COLORS.black2,
      }}
      containerViewStyle={{
        marginVertical: 10,
        width: 70,
        backgroundColor: COLORS.black2,
      }}
      textStyle={{ color: COLORS.white }}
      {...props}/>
  )      
};
const DotComponent = ({ isLight, selected }) =>{
 
  return (
    <View
      style={{
        width: selected? 40 :5,
        height: 5,
        marginHorizontal: 4,
        backgroundColor:selected ? COLORS.black2 : '#B5BFFF',
        borderRadius:20,

      }}
    />
  );
};
const OnBoarding = ({navigation}) =>{

  
    return(
        <View style={{flex:1, backgroundColor:COLORS.white}}>
        <Onboarding
        onDone={()=>navigation.navigate('Welcome')}
        showSkip={false}
        bottomBarColor={COLORS.white}
        NextButtonComponent={NextButton}
        DotComponent={DotComponent}
        
        
        


        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={icons.apple} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={icons.apple} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={icons.apple} />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
            
                       
        </View>
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