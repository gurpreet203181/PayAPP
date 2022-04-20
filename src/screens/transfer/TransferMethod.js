import React from "react";
import {View,Text, StyleSheet} from 'react-native';
import { FONTS,COLORS } from "../../constants";

const TransferMethod = ({route,navigation}) =>{
    const receiverId = route.params.receiverId;
    const amount= route.params.amount;
    return(
        <View style={{flex:1, backgroundColor:COLORS.white}}>
            {console.log(receiverId, amount)}
        </View>
    )
}

export default TransferMethod;