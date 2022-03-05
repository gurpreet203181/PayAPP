import React  from "react";
import {t} from '../../constants/services/i18n/config';
import { FormInput ,Button} from "../../components";
import { View, SafeAreaView, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { AuthLayout } from "..";
import { utils } from "../../utils";
import { COLORS,FONTS, dummyData,SIZES,icons } from "../../constants";

const SignUp = ({navigation})=>{
   
    const [email,setEmail]= React.useState("")
    const [emailError, setEmailError]= React.useState("")
   
    const [username,setUsername]= React.useState("")
    const [usernameError,setUsernameError]= React.useState("")
 
    const [password,setPassword] =React.useState("")
    const [passwordError,setPasswordError] =React.useState("")
    
    const [showPass, setShowPass]= React.useState(false)

    function isEnableSignUP() {
        return email!="" && username!="" && password!="" &&
         emailError=="" && passwordError=="" && usernameError==""
    }

    return(
        <AuthLayout 
        title={t('authLayout_Title')}
        subTitle={t('authLayout_SignUp_SubTitle')}
        onClosePress={()=> navigation.goBack()}
        childern={
            <View>
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
                onPress={()=> pressed="true"}
                
                errorMsg={emailError}
                prependComponenet={
                    <Image source={icons.email} style={{width:20, height:20, tintColor:COLORS.black2, }}/>
                }
               
                />
                {/* Name */}

                <FormInput
                value={username}
                placeholder={t('username')}
                containStyle={{
                    marginTop:SIZES.radius
                }}
                onChange={(value)=>{setUsername(value)}}
                errorMsg={usernameError}
                appendComponenet={
                    <View style={{justifyContent:'center'}}>
                        <Image source={username=="" || (username !=""&& usernameError=="")? icons.correct:icons.cross} 
                        style={{height:20,width:20,
                         tintColor: username==""?COLORS.gray :(username!="" && usernameError==
                         "")?COLORS.green:COLORS.red}}/>

                    </View>
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
                appendComponenet={
                  <TouchableOpacity style={{
                      width: 40,alignItems:"flex-end",justifyContent:'center'
                  }} onPress={()=> setShowPass(!showPass)}>
                      
                      <Image source={showPass?icons.eye_close: icons.eye} 
                      style={{height:20,width:20,tintColor:COLORS.gray}}/>
                  </TouchableOpacity>
                }
                />
                {/* Sign Up */}
                <Button label="Sign UP"
                disabled={isEnableSignUP()? false:true}
                buttonContainerStyle={{
                    height:55,
                    alignItems:'center',
                    marginTop:SIZES.padding,
                    borderRadius:SIZES.radius,
                    backgroundColor: isEnableSignUP()?COLORS.primary:COLORS.transparentPrimray
                    }} onPress={()=> navigation.navigate("Otp")}/>

            </View>
        }
        />
    )
}

export default SignUp;