import React from "react";
import { View, Text,  TouchableOpacity,StyleSheet, Image} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { t } from "../../hooks/UseI18n";

const ContactItem = ({item,onPress,isSelected}) =>{
    return(
        <TouchableOpacity 
         onPress={onPress}
         style={{...styles.container,
           borderColor:isSelected?COLORS.gray:COLORS.white,}}>
            
            <Image source={item.profileImage} style={styles.profileImage}/>
               
               <View style={{marginLeft:15}}>                 
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{t('number')} - {item.phoneNumber}</Text>
               </View>

        </TouchableOpacity>
    )
}

export default ContactItem;

const styles = StyleSheet.create({

    container:{
          width: 315,
          height: 80,
          borderRadius:20,
          flexDirection:"row",
          justifyContent:"flex-start",
          alignItems:"center",
          borderWidth:1
      },
      profileImage:{
          width: 40,
          height: 40,
          borderRadius:SIZES.padding
      },
      name:{
          ...FONTS.h4,
          fontSize:13,
          color: COLORS.black,
          letterSpacing:0.3
      },
      number:{
          ...FONTS.body5,
          color:COLORS.black,
          opacity: 0.5,
          letterSpacing:0.3
      }
})