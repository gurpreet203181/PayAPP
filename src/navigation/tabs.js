import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import { Home ,Settings,User,Home2} from "../screens";
import { COLORS,FONTS,icons,SIZES } from "../constants";
import { borderTopColor, color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false , 
            tabBarStyle:[{...styles.tabBarStyle},null]
        }}
        
        tabBarOptions={{
            showLabel:false,
            tabBarShowLabel:false,
            tabBarStyle:[{display:'flex'},null]
           
        }}
        >
            <Tab.Screen
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{...styles.tabIconContainer}}>
                           
                            <Image source={icons.home} 
                            style={{
                                ...styles.tabIcon,
                                tintColor:focused? COLORS.primary :COLORS.gray
                                }}/>
                            
                            {/* <View 
                            style={{
                                ...styles.tabDot, 
                                backgroundColor:focused? COLORS.primary:COLORS.white,
                                 }}/> */}
                        </View>
                    )
                }}
                
                
            />
            <Tab.Screen
                name="Send"
                component={Home2}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{...styles.tabIconContainer}}>
                           
                        <Image source={icons.send} 
                        style={{
                            ...styles.tabIcon,
                            tintColor:focused? COLORS.primary :COLORS.gray
                            }}/>
                        
                        {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
                    </View>
                    )
                }}
            />
            
            <Tab.Screen
                name="Portfolio"
                component={Settings}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{...styles.tabIconContainer}}>
                           
                        <Image source={icons.pie_chart} 
                        style={{
                            ...styles.tabIcon,
                            tintColor:focused? COLORS.primary :COLORS.gray
                            }}/>
                        
                        {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
                    </View>
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{...styles.tabIconContainer}}>
                           
                        <Image source={icons.settings} 
                        style={{
                            ...styles.tabIcon,
                            tintColor:focused? COLORS.primary :COLORS.gray
                            }}/>
                        
                        {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
                    </View>
                    )
                }}
            />
            
        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({
    tabBarStyle:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        elevation:0,
        backgroundColor:COLORS.white,
        borderTopColor:'transparent',
        justifyContent:"center",
    },
    tabIconContainer:{
        alignItems:"center", 
        justifyContent:"center",
        
        height: 24,
        width: 24,
    },
    tabIcon:{
        height: 20,
        width: 20,
    },
    tabDot:{
        width:4,
        height:4,
        borderRadius:SIZES.radius,
        marginTop:SIZES.base
    }

})

export default Tabs;