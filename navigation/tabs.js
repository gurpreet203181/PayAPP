import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import { Home ,Settings,User} from "../screens";
import { COLORS,FONTS,icons,SIZES } from "../constants";
import { borderTopColor, color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
        screenOptions={{ headerShown: false , 
            tabBarStyle:[{
            
                position:'absolute',
                bottom:0,
                left:0,
                right:0,
                elevation:0,
                backgroundColor:COLORS.black2,
                borderTopColor:'transparent',
                marginHorizontal:20,
                marginBottom:SIZES.padding,
                borderRadius:SIZES.base *2,
                justifyContent:"center",
                height: 60
            },null]
        }}
        
        tabBarOptions={{
            showLabel:false,
           
        }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{
                            alignItems:"center", justifyContent:"center"
                        }}>
                            <Image source={icons.home} style={{
                                height: 20,
                                width: 20,
                                tintColor:focused?'#f18af1' :'#d0d0d2',
                                marginTop:10
                                
                            }}/>
                            
                            <View 
                            style={{
                                 width:4,
                                 height:4,
                                 backgroundColor:focused? '#f18af1':COLORS.black,
                                 borderRadius:SIZES.radius,
                                 marginTop:SIZES.base
                                 
                                 }}/>
                        </View>
                    )
                }}
                
                
            />
            <Tab.Screen
                name="Send"
                component={Settings}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{
                                alignItems:"center", justifyContent:"center", marginTop:10
                        }}>
                            <Image source={icons.send} style={{
                                height: 20,
                                width: 20,                                
                                tintColor:focused?COLORS.primary :COLORS.gray

                            }}/>
                             <View 
                            style={{
                                 width:5,
                                 height:5,
                                 backgroundColor:focused? COLORS.primary:COLORS.black,

                                 borderRadius:SIZES.radius,
                                 marginTop:SIZES.base
                                 
                                 }}/>
                        </View>
                    )
                }}
            />
            
            <Tab.Screen
                name="Portfolio"
                component={Settings}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{
                            alignItems:"center", justifyContent:"center", marginTop:10
                        }}>
                           <Image source={icons.pie_chart} style={{
                                height: 20,
                                width: 20,                                
                                tintColor:focused?COLORS.primary :COLORS.gray

                            }}/>
                             <View 
                            style={{
                                 width:5,
                                 height:5,
                                 backgroundColor:focused? COLORS.primary:COLORS.black,

                                 borderRadius:SIZES.radius,
                                 marginTop:SIZES.base
                                 
                                 }}/>
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon:({focused})=>(
                        <View style={{
                            alignItems:"center", justifyContent:"center", marginTop:10
                        }}>
                          <Image source={icons.settings} style={{
                                height: 20,
                                width: 20,                                
                                tintColor:focused?COLORS.primary :COLORS.gray

                            }}/>
                             <View 
                            style={{
                                 width:5,
                                 height:5,
                                 backgroundColor:focused? COLORS.primary:COLORS.black,

                                 borderRadius:SIZES.radius,
                                 marginTop:SIZES.base
                                 
                                 }}/>
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    )
}


/*
const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})*/

export default Tabs;