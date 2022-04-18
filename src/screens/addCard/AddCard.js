import React,{useState} from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text,StyleSheet, TouchableOpacity,Image} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { Header } from "../../components";
import AddCardModel from '../addCard/AddCardModel'
const AddCard = ({navigation}) =>{
 
  const [isModalVisible, setModalVisible] =  useState(false);

    //Model show and close function
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    //render
   function renderHeader(){
    return(
       <Header 
       leftIcon={icons.back_arrow}
       onLeftIconPress={() => navigation.goBack()}
       title={t('addPayment')}
       
       />
    )
   };

 function renderAddCard(){
   return(
     <View style={{...SIZES.marginHorizontal, alignItems:"center"}}>
   
       <TouchableOpacity style={styles.addCard} onPress={toggleModal}>
        <Image source={icons.plus} style={styles.plusImg}/>
        <Text style={styles.addCardText}>{t('addCard')}</Text>
       </TouchableOpacity>

     </View>
   )
 }

    return(
        <View style={{flex:1, backgroundColor:COLORS.white}}>
          {renderHeader()}
          {renderAddCard()}
          
          {/* AddCard model  */}
          <View>
            <AddCardModel isVisible={isModalVisible} onClosePress={toggleModal}/>
          </View>

        </View>
    )
} 

export default AddCard;

const styles = StyleSheet.create({

  addCard:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:60,
    backgroundColor:'rgba(18, 18, 29, 0.05);',
    height: 200,
    width:315,
   borderRadius:16,
   borderColor:COLORS.darkGray2,
  },
  plusImg:{
    height: 20,
    width: 20,
    tintColor:COLORS.black
  },
  addCardText:{
    marginTop:8,
    ...FONTS.h4
  }
})

