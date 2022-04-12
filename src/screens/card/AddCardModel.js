import React from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text,StyleSheet, TouchableOpacity} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { Button } from "../../components";
import Modal from "react-native-modal";

const AddCardModel = ({navigation}) =>{

    const [isVisible,setIsvisible] = React.useState(true);
    return(
        <View>
         <Modal
        testID={'modal'}
        isVisible={isVisible}
        swipeDirection={['up', 'left', 'right', 'down']}
        
        style={styles.view}>
            <View style={{backgroundColor:COLORS.white,flex:1,height:400}}>
                <Button label={'press'} onPress={() => navigation.goBack()}/>
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
})