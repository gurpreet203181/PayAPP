import React, { useEffect, useMemo, useState} from "react";
import { t } from "../../hooks/UseI18n";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text,StyleSheet, TouchableOpacity,Image} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { Button,Header , Carditem,FormInput} from "../../components";
import CardModelItem from "./CardModelItem";
import Modal from "react-native-modal";
import { utils } from "../../utils";

const AddCardModel = ({isVisible,onClosePress}) =>{

    
    const [cardnumber, setCardNumber]= useState("");
    const [cardnumberErrore, setCardNumberErrore]= useState("");
    
    const [cardHolder, setCardHolder]= useState("");
    const [cardholderErrore, setCardholderErrore]= useState("");

    
    const [expiryDate, setExpiryDate]= useState("");
    const [expiryDateError, SetExpiryDateError]= useState("");

    
    const [cvv, setCvv]= useState("");
    const [cvvError, setCvvError]= useState("");

    const [clearModel, setClearModel] = useState(false);
    
    useMemo(() =>{
        setCardNumber("");
        setCardHolder("");
        setExpiryDate("")
        setCvv("")
 
    },[clearModel])
    //render
   const closeModel = () =>{
    setClearModel(!clearModel);  
    onClosePress();
   } 
   function renderHeader(){
    return(
       <Header 
       rightIcon={icons.close}
       onRightIconPress={closeModel}
       title={t('addCard')}
       containStyle={{paddingBottom:20}}
       
       />
    )
   };
   function renderCard(){
       return(
           <View style={{...SIZES.marginHorizontal, marginTop:20}}>
                <CardModelItem 
                cardNumber={cardnumber}
                cardHolder={cardHolder}
                expiryDate={expiryDate}
                cvv={cvv}
                />
           </View>
       )
   }
  
   function renderInput(){
       return(
           <View style={{...SIZES.marginHorizontal}}>
               
                {/* Card number */}
                <FormInput
                placeholder={t('number')}
                maxLength={19}
                keyboradType='number-pad'
                autoFocus={true}
                value={cardnumber}
                onChange={(value)=> {setCardNumber(value.replace(/\s/g,'').
                replace(/(\d{4})/g,'$1 ').trim())
                utils.validateInput(value,19,setCardNumberErrore)}}
                errorMsg={cardholderErrore}
                prependComponenet={
                    <Image source={icons.debit_Card} style={styles.icon}/>
                }
               
                />

                {/* CardHolder */}
                <FormInput
                placeholder={t('username')}
                value={cardHolder}
                containStyle={{
                    marginTop:SIZES.radius
                }}
                onChange={(value) => setCardHolder(value)}
                errorMsg={cardholderErrore}
                prependComponenet={
                    <Image source={icons.profile} style={{...styles.icon, width:22, height:22}}/>
                }
               
                />
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
               
                {/* expiry date 
                */}     
                
                <FormInput
                 placeholder={t('expiryDate')}
                maxLength={4}
                keyboradType='number-pad'
                value={expiryDate}
                onChange={(value)=> {setExpiryDate(value)}}
                errorMsg={expiryDateError}
                prependComponenet={
                    <Image source={icons.expiryDate} style={styles.icon}/>
                }
                containerStyle={{width:'40%'}}
                />
                {/* cvv */}
                 <FormInput
                 placeholder={t('cvv')}
                maxLength={3}
                keyboradType='number-pad'
                value={cvv}
                onChange={(value)=> {setCvv(value)}}
                errorMsg={cvvError}
                prependComponenet={
                    <Image source={icons.cvv} style={styles.icon}/>
                }
                containerStyle={{width:'40%'}}
                />
                
                </View>
               
           </View>
       )
   }
    return(
        <View>
         <Modal
         isVisible={isVisible}
          onBackButtonPress={closeModel}//onClosepress function to close model by changes isvisible value 
          onBackdropPress={closeModel}
          useNativeDriver={true}
          propagateSwipe
          style={styles.view}
        >
            <View style={styles.container}>
                {/* <View style={styles.rectangle}/> */}
                {renderHeader()}
                <KeyboardAwareScrollView
                 scrollEnabled={true}
                 enableAutomaticScroll={true}
                 extraScrollHeight={200}
                 >
                <View style={{...SIZES.marginHorizontal, marginTop:50}}>
                  <Text style={{...FONTS.body5, color:COLORS.gray2}} adjustsFontSizeToFit numberOfLines={2}>
                  {t('addCardSubTitle')}
                </Text>
                </View>

                {renderCard()}
                {renderInput()}
                <View style={{marginTop:46, ...SIZES.marginHorizontal, alignItems:"center", justifyContent:"center", paddingBottom:20}}>
                <Button label={t('save')}
                 labelStyle={{...styles.saveText}}
                 containerStyle={{...styles.saveButton,...styles.shadow}}/>
                </View>
                </KeyboardAwareScrollView>
                
            </View>

      </Modal>
        </View>
    )
} 

export default AddCardModel;

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      container:{
        backgroundColor:COLORS.white,
        flex:1,
        
      },
      rectangle:{
         width:44,
         height:4,
         backgroundColor:'rgba(18, 18, 29, 0.1);',
         marginTop:10,
         alignSelf:"center",
         ...SIZES.marginHorizontal
      },
      icon:{
          width:27, 
          height:27, 
          tintColor:COLORS.black2, 
        },
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
        
    saveButton:{
        backgroundColor:COLORS.black2,
        width:160,
        height:56 ,
        borderRadius:SIZES.padding,
    },
    saveText:{
        color:COLORS.white,
        ...FONTS.body3,
        fontFamily:'Poppins_500Medium'
    },
    TextInputMaskContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderBottomWidth:1,
        width: '40%'
     },
})