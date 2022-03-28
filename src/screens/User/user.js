import React  from "react";

import { View, SafeAreaView, Image, Text, StyleSheet } from "react-native";

import { COLORS,FONTS, dummyData,SIZES } from "../../constants";
import { CardsCarousel } from "../../stores";

const User = ()=>{
    return(
        <View style={{flex:1, backgroundColor:COLORS.white}}>
            <CardsCarousel/>
        </View>
    )
}

export default User;