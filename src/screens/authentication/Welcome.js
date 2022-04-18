import React  from "react";
import { t } from "../../hooks/UseI18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, SafeAreaView, Image, Text, StyleSheet,ImageBackground } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Button } from "../../components";
import { COLORS,FONTS, dummyData,SIZES,images } from "../../constants";

const Welcome = ({navigation})=>{
    const clearOnboarding = async () =>{
        try {
            await AsyncStorage.removeItem('@viewedOnboarding')
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <View style={{flex:1, backgroundColor:COLORS.white}}>
                <ImageBackground source={images.WelcomeShape}
                 resizeMode="cover" 
                 style={styles.BackgroudImage}>
                  <View style={{ marginLeft:40, marginTop:50}}>

                  <Image source={images.Logo} style={styles.logo}/>
                   <Text style={{marginTop:20,...styles.logoText}} >{t('welcome')}</Text>

                  </View>
                </ImageBackground>
                  {/* Button sigin && sigUP */}
                  <View style={{alignItems:"center", position:"absolute", alignSelf: 'center', bottom:57}}>
                <Button 
                label={t('signUp')}
                labelStyle={{color:COLORS.white,...styles.btnLabel}}
                containerStyle={{backgroundColor:COLORS.black2, ...styles.BtnContainer, }}
                onPress={()=>  navigation.navigate("SignUp")}
                />
               
                <Button 
                label={t('signIn')}
                labelStyle={{color:COLORS.black2,...styles.btnLabel}}
                containerStyle={{backgroundColor:COLORS.white,marginTop:20 , ...styles.BtnContainer}}
                onPress={()=>  navigation.navigate("SignIn")}
                />
                <View style={{width:134, height:5, backgroundColor:COLORS.black2,borderRadius:100, marginTop:50}}/>
                 </View>
                 <Button label='remove key onboarding'
                onPress={clearOnboarding}
                labelStyle={{color:COLORS.black2}}/> 

           
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    BtnContainer:{
        width: 315,
        height: 56,
        borderRadius:60,
        borderWidth:1,
        borderColor:COLORS.black2,
    },
    btnLabel:{
        ...FONTS.body3,
    },
    BackgroudImage:{
        width:"100%", 
        height:"90%" , 
    },
    logo:{
        height: 60,
        width: 60
    },
    logoText:{
        color: COLORS.white,
        ...FONTS.body1 ,
   }
})