import React from 'react'
import { Text,View,TextInput,StyleSheet,Image } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { COLORS, SIZES,icons,FONTS } from '../constants'

const FormInput=({
 containerStyle,
 inputContainerStyle,
 label,
 placeholder,
 inputStyle,
 prependComponenet,
 appendComponenet,
 onChange,
 pressed,
 secureTextEntry,
 keyboradType="default",
 autoCompleteType="off",
 autoCapitalize="none",
 errorMsg="",
 maxLength
})=>{
    return(
        <View>

            <View style={{...Styles.container,...containerStyle}} >
              
            {prependComponenet}
            <TextInput 
            style={{...Styles.inputContainer, ...inputStyle}}
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboradType}
            autoCompleteType={autoCompleteType}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            onChangeText={onChange}
                   
            />
            {appendComponenet}
            </View>


       </View>
           
    )
}
export default FormInput;

const Styles= StyleSheet.create({

    container:{
       flexDirection:'row',
       justifyContent:'flex-start',
       alignItems:'center',
       marginTop:20,
       
       borderBottomWidth:1,
       borderBottomColor: pressed? COLORS.black2:COLORS.lightGray2,
    },
    inputContainer:{
        color:COLORS.black2,
        backgroundColor:COLORS.white,
        width: '100%',
        height: 56,
        marginLeft:16


    }
})