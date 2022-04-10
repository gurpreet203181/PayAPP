import React  from "react";
import { t } from "../../hooks/UseI18n";
import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";
import { FormInput,Button,LineDivider,CheckBox} from "../../components";
import { AuthLayout } from "..";
import { COLORS,FONTS, dummyData,SIZES,icons } from "../../constants";
import { utils } from "../../utils";

const SignIn = ({navigation})=>{
    const [email,setEmail]= React.useState("")
    const [emailError, setEmailError]= React.useState("")
   
    const [username,setUsername]= React.useState("")
    const [usernameError,setUsernameError]= React.useState("")
 
    const [password,setPassword] =React.useState("")
    const [passwordError,setPasswordError] =React.useState("")
    
    const[rememberMe,setRememberMe]= React.useState(false)
    const [showPass, setShowPass]= React.useState(false)
    return(
        <AuthLayout
        title={t('authLayout_TitleSignIn')}
        subTitle={t('authLayout_SignIn_SubTitle')}
        onClosePress={()=> navigation.goBack()}
        childern={
            <View>
            {/* LineDivider */}

            <LineDivider lineStyle={Styles.LineStyle}/>
          
            <View style={{marginTop:28}}>
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
            {/* Password */}
           
            <FormInput 
            value={password}
            placeholder={t('password')}
            secureTextEntry={!showPass}
            errorMsg={passwordError}
            autoCompleteType='password'
            contentContainerStyle={{marginTop:SIZES.radius}}
            onChange={(value) =>{
                utils.validatePassword(value,setPasswordError)
                setPassword(value)
            }}
            prependComponenet={
                <Image source={icons.lock} style={{width:20, height:20, tintColor:COLORS.black2, }}/>
            }
            forgotButton={
                <Button label={t('restPassword')}
                labelStyle={{...FONTS.body5, color:COLORS.gray2}}
                onPress={()=> navigation.navigate('ForgotPassword')}
                />
            }
            
            />
            
            </View>
            {/* remmber me  */}
            <View style={{flexDirection:"row", justifyContent:'flex-start',  marginTop:44}}>
                  
                  <CheckBox value={rememberMe} onChange={(value)=> setRememberMe(value)}/>
                
                  <Text style={Styles.RememberMeText}>{t('rememberMe')}</Text>
              </View>
           

         

        </View>
        }
        bottomButton={
            <View>
                <Button
                label={t('signIn')}
                labelStyle={{...Styles.SignInText}}
                containerStyle={{...Styles.SignInButton,...Styles.shadow}}
                onPress={()=> navigation.navigate('Home')}
                />
            </View>
        }
        />
            
    )
}

export default SignIn;

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
    PasswordRulesText:{
        marginTop:8,
         color: COLORS.gray2,
         ...FONTS.body5
    },
   
    SignInButton:{
        backgroundColor:COLORS.blue2,
        width:160,
        height:56 ,
        borderRadius:SIZES.padding,
    },
    SignInText:{
        color:COLORS.white,
        ...FONTS.body3,
        fontFamily:'Poppins_500Medium'
    },
    LineStyle:{
        marginTop:77,
        height:1 ,
        color:COLORS.darkGray2 
    },
    RememberMeText:{
        marginLeft:8,
        ...FONTS.body5,
        color:COLORS.gray2 
    }

})