import { trim } from 'lodash'
import React from 'react'
import { Text,View,TextInput,StyleSheet,Image } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Button } from '.'

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
 secureTextEntry,
 keyboradType="default",
 autoCompleteType="off",
 autoCapitalize="none",
 errorMsg="",
 maxLength,
 forgotButton
})=>{
    const [Focus, setFocus] = React.useState(false);
    return(
        <View>

            <View style={{...Styles.container,...containerStyle,
           borderBottomColor:Focus? COLORS.black2 : COLORS.lightGray2
            }} >
              
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
            onFocus={()=> setFocus(true)}
            onBlur={()=> setFocus(false)}
            />
            {appendComponenet}
            </View>
            {errorMsg!="" &&
            
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'flex-start'}}>
            <Text style={Styles.ErrorMsg}>{errorMsg}</Text>   
              {forgotButton}
            </View>
            }
            


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
    },
    inputContainer:{
        color:COLORS.black2,
        backgroundColor:COLORS.white,
        width: '100%',
        height: 56,
        marginLeft:16


    },
    ErrorMsg:{
        color:COLORS.red,
        ...FONTS.body5
    }
})