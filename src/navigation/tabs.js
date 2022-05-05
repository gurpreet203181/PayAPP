import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Profile } from "../screens";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { t } from "@hooks/UseI18n";

const Tab = createBottomTabNavigator();
const AddCardPlaceHodler = () => {
  return <View style={{ flex: 1, backgroundColor: COLORS.white }} />;
};
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: [{ ...styles.tabBarStyle, display: "flex" }],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={focused ? icons.homeFilled : icons.home}
                style={{
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>
              {t("tabHome")}
            </Text>
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
          tabBarLabel: () => <View />,
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
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.tabIconContainer }}>
              <Image
                source={focused ? icons.userFilled : icons.userOutline}
                style={{
                  ...styles.tabIcon,
                }}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.tabLabelActive : styles.tabLabel}>
              {t("tabProfile")}
            </Text>
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
    height: 64,
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    height: 30,
    width: 30,
    marginTop: 10,
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
  },
  tabLabel: {
    ...FONTS.body3,
    fontSize: 10,
    color: COLORS.lightGray3,
  },
  tabLabelActive: {
    ...FONTS.h2,
    lineHeight: 22,
    fontSize: 10,
    color: COLORS.darkBlue3,
  },
  AddCardButton: {
    //bottom: 20,
    width: 48,
    height: 48,
    backgroundColor: COLORS.darkBlue3,
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
    elevation: 3,
  },

  shadow2: {
    shadowColor: "#4d4d4d",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 13.51,
    elevation: 8,
  },
});

export default Tabs;
