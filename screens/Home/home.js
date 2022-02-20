import React from 'react';
import {t} from '../../constants/services/i18n/config'

import { View ,Text,Image} from 'react-native';
import { icons ,COLORS,SIZES,FONTS} from '../../constants';
import { ButtonIcon } from '../../components';
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
                       {t('hello')} Gurpreet</Text>
                       <View style={{flexDirection:'row', marginTop:5}}>
                       <Text style={{fontSize:SIZES.body4}}>{t('welcome')}</Text>
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

                    <Text style={{...FONTS.h3}}>$5</Text>
                    <Text style={{...FONTS.body5}}>{t('YourBalance')}</Text>
                </View>
                <View>
                <ButtonIcon 
                label='Add Card'
                labelStyle={{...FONTS.body4}}
                iconPosition='RIGHT'
                icon={icons.home}
                iconStyle={{
                    marginRight:10,tintColor:COLORS.black,height:20, width:20
                }}

                containerStyle={{
                    
                    flex:1,
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingHorizontal:SIZES.radius,
                    borderRadius:SIZES.radius2,
                    borderColor:COLORS.black,
                    borderWidth: 1,
                  
                }}
                />

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