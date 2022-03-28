import React  from "react";
import { t } from "../../hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { FormInput ,Button} from "../../components";
import { COLORS,FONTS, dummyData,SIZES,icons } from "../../constants";
import { AuthLayout } from "..";
import { utils } from "../../utils";

const ForgotPassword = ({navigation})=>{
    const [email,setEmail]= React.useState("")
    const [emailError, setEmailError]= React.useState("")
     
    return(
        <AuthLayout
        title={t('authLayout_TitleForgotPass')}
        subTitle={t('authLayout_ForgotPass_SubTitle')}
        onClosePress={()=> navigation.goBack()}
        childern={
         <View style={{marginTop:71}}>
            {/* Email */}
         <FormInput 
          value={email}
          placeholder={t('email')}
          keyboradType="email-address"
          autoCompleteType='email'
          onChange={(value) =>{
              utils.validateEmail(value,setEmailError)
              setEmail(value)
          }}
          errorMsg={emailError}
          prependComponenet={
              <Image source={icons.email} style={{width:20, height:20, tintColor:COLORS.black2, }}/>
          }
         
          />

            </View>
        }
        bottomButton={
            <View style={{paddingBottom:20}}>
                <Button label={t('next')}
                labelStyle={{...Styles.ForgotText}}
                containerStyle={{...Styles.ForgotButton,...Styles.shadow}}
                onPress={()=> navigation.navigate('Otp',{email: email })}
                />
            </View>
        }
        
        />
    )
}

export default ForgotPassword;

const Styles = StyleSheet.create({
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
   
    ForgotButton:{
        backgroundColor:COLORS.blue2,
        width:160,
        height:56 ,
        borderRadius:SIZES.padding
    },
    ForgotText:{
        color:COLORS.white,
        ...FONTS.body3,
        fontFamily:'Poppins_500Medium'
    },
   

})