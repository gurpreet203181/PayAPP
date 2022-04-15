import React from "react";
import { t } from "../../hooks/UseI18n";
import { View, Text, StyleSheet, } from "react-native";
import { COLORS,icons} from "../../constants";
import { Header} from "../../components";
import {FontAwesome} from "@expo/vector-icons";

const TransferDashboard = () => {


    //render
    function renderHeader(){
        return(
           <Header 
           title={t('appName')}
           />
        )
    }
    return(
        <View style={{flex:1,backgroundColor:COLORS.white}}>
            {renderHeader()}
        </View>
    )
}

export default TransferDashboard;