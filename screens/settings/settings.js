import React from 'react';

import { View ,Text,FlatList,StyleSheet,TouchableOpacity,Image,SafeAreaView, Animated} from 'react-native';
import { COLORS,FONTS,SIZES,dummyData,width } from '../../constants';
import {Directions, FlingGestureHandler} from 'react-native-gesture-handler'
const Image_Width = 300;
const Image_Height=150;
const Visible_Items = 4;


const Settings = ()=>{
const[activeIndex, setActiveIndex]= React.useState(0);
const animatedValue = React.useRef(new Animated.Value(0)).current;
const reactiveAnimated = React.useRef(new Animated.Value(0)).current;

React.useEffect(()=>{
    Animated.timing(animatedValue, {
        toValue:reactiveAnimated,
        duration:300,
        useNativeDriver:true,

    }).start();
},[]);
const setActiveSlide =React.useCallback((newIndex)=>{
    setActiveIndex(newIndex);
    reactiveAnimated.setValue(newIndex);
})
    return(
        <FlingGestureHandler
         key="UP" 
        direction={Directions.UP} 
        onHandlerStateChange={ev=>{
            if(ev.nativeEvent.state=== state.END){
                if(activeIndex === dummyData.Cards.length-1)   {
                    return;
                } 
                setActiveIndex(activeIndex +1)
            }
        }}>
                <FlingGestureHandler  
                key="DOWN" 
               direction={Directions.DOWN} 
                onHandlerStateChange={ev=>{
                 if(ev.nativeEvent.state=== state.END){
                  if(index === 0)   {
                    return;
                } 
                setActiveIndex(index -1)
            }
        }}>
                <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
          
              <FlatList 
              data={dummyData.Cards}
              keyExtractor={item => item.id}
            contentContainerStyle={{
                  flex: 1,
                  alignItems:'center',
                  justifyContent:'center'
              }}
              
          

              renderItem={({item,index})=>{

                const inputRange=[index-1,index,index+1]
                const translate = animatedValue.interpolate({
                    inputRange,
                    outputRange:[-30,0,30],
                });
                  return(
                      <View style={{position:'absolute'}} >
                          <Image source={item.image} style={styles.image}/>
                          <Text style={styles.name,{position:'absolute'}}>{item.name}</Text>
                      </View>
                  )
              }}
              />

      </SafeAreaView>
                </FlingGestureHandler>
            </FlingGestureHandler>
       

    )

}

export default Settings;

const styles = StyleSheet.create({
    image:{
        width: 300,
        height: 150,
        resizeMode:'cover',
        borderRadius:16
    },
    name:{
 
        textTransform:'uppercase',
        color: COLORS.black,
        fontSize:36,
        fontWeight:'900'
    }
})
