import React from 'react';

import { View ,Text,Image} from 'react-native';
import { icons ,COLORS,SIZES} from '../../constants';
const Home = ()=>{


    function renderHeader(){
        return(
            <View style={{ flexDirection:'row' , justifyContent:'space-between' ,alignItems:'center'}}>

                {/* Heloo && name */}
                <View style={{marginTop:SIZES.radius}}>
                   <Text 
                   style={{
                       color:COLORS.gray2,
                       fontSize:SIZES.body4}}>
                       Hello Gurpreet</Text>
                       <View style={{flexDirection:'row', marginTop:5}}>
                       <Text style={{fontSize:SIZES.body4}}>Welcome Back</Text>
                       <Image source={icons.star} style={{height:20, width:20}}/>

                       </View>
                </View>
                {/* Profile */}
                <Image style={{height:20, width:20}} source={icons.notification_color}/>

            </View>
        )
    }
    function renderOptions(){
        return(
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginTop:SIZES.padding}}>
                <View>

                    <Text style={{fontSize:SIZES.h2}}>$525555</Text>
                    <Text style={{fontSize: SIZES.body5}}>Your Balance</Text>
                </View>
                
            </View>
        )
    }
    return(
        <View style={{flex:1,backgroundColor:COLORS.white,}}>
           
              <View style={{marginHorizontal:SIZES.radius*2}}>
              {/* header */}
              {renderHeader()}

              {/* options */}
              {renderOptions()}

              </View>

        </View>
    )

}

export default Home;