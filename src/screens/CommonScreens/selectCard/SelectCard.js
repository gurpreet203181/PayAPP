import React from "react";
import {Text, View, StyleSheet,TouchableOpacity, FlatList} from 'react-native';
import { FONTS,COLORS,icons, SIZES, dummyData } from "../../../constants";
import { Header,Carditem } from "../../../components";
import { t } from "../../../hooks/UseI18n";
import {Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setSelectCard } from "../../../redux/reducers/selectedCardSlice";


/*Summray
All user card will render in flatlist 
and then user can select a card and  ID of selected card will be saved in selectedCardSlice reducer 
Then screen while navigate to back 
*/
const SelectCard = ({navigation}) =>{

    const dispatch = useDispatch();
    //render
     function renderHeader(){
      return(
        <Header 
         title={t('selectCard')}
         rightIcon={icons.close}
         onRightIconPress={() => navigation.goBack()}
         />
         )
      }

    return(
       <View style={{flex:1, backgroundColor:COLORS.white}}>

           {/* Header */}
           {renderHeader()}
           <View style={{...SIZES.marginHorizontal,marginTop:50 ,flex:1}}>
               <Text style={styles.selectCardText} adjustsFontSizeToFit numberOfLines={2}>
                   {t('selectCardText')}
             </Text>

             <View style={styles.selectCardView}>

                 <Text style={{...FONTS.h3, fontSize:16}}>
                     {t('selectCard')}
                </Text>
                 <Feather onPress={() => navigation.navigate('AddCard')} name="plus-circle" size={24} color="#5366BE" />
             </View>
             
             <View style={{flex:1}}>
             <FlatList
              data={dummyData.Cards}
              showsVerticalScrollIndicator={false}     
              keyExtractor={(item)=> `${item.id}`}
              renderItem={({item})=>(
                  <TouchableOpacity style={{marginBottom:10}} 
                     onPress={() => 
                     //setting select card id to selectedcardSlice so other slice can take from it 
                     //reason for this is to get this screen as common screen which is used by ither screens
                    { 
                        dispatch(setSelectCard(item.id))
                        navigation.goBack();
                    }

                     }>
                      <Carditem item={item}
                      containerStyle={{elevation:0}}/>
                </TouchableOpacity>
              )}/>

             </View>

           </View>

       </View>
    )
}

export default SelectCard;


const styles = StyleSheet.create({
    selectCardText:{
        ...FONTS.body5, 
        color:COLORS.gray2
    },
    selectCardView:{
        flexDirection:"row",
         justifyContent:"space-between", 
         alignItems:"center", 
         marginTop:43, 
         marginBottom:20
        }
})