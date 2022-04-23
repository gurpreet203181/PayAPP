import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Settings, User, TransferDashboard } from "../screens";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const AddCardPlaceHodler = () => {
  return <View style={{ flex: 1, backgroundColor: COLORS.white }} />;
};
const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [{ ...styles.tabBarStyle }, null],
      }}
      tabBarOptions={{
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: [{ display: "flex" }, null],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={icons.home}
                style={{
                  ...styles.tabIcon,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />

              {/* <View 
                            style={{
                                ...styles.tabDot, 
                                backgroundColor:focused? COLORS.primary:COLORS.white,
                                 }}/> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TransferDashboard"
        component={TransferDashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={icons.send}
                style={{
                  ...styles.tabIcon,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />

              {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddCardPlaceHodler}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.AddCardButton, ...styles.shadow }}>
              <AntDesign name="plus" size={24} color="white" />
            </View>
          ),
        }}
        // override tab listener to navigate to addCard screen to avoid bottom tab
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddCard");
          },
        })}
      />

      <Tab.Screen
        name="Activity"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={icons.pie_chart}
                style={{
                  ...styles.tabIcon,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />

              {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={icons.settings}
                style={{
                  ...styles.tabIcon,
                  tintColor: focused ? COLORS.primary : COLORS.gray,
                }}
              />

              {/* <View 
                        style={{
                            ...styles.tabDot, 
                            backgroundColor:focused? COLORS.primary:COLORS.white,
                             }}/> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.lightGray2,
    justifyContent: "center",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",

    height: 24,
    width: 24,
  },
  tabIcon: {
    height: 20,
    width: 20,
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
  },
  AddCardButton: {
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 5,
  },
});

export default Tabs;
