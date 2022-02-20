import React from 'react';
import {t} from '../../constants/services/i18n/config'

import { View ,Text,Image,StyleSheet,FlatList,ScrollView} from 'react-native';
import { icons ,COLORS,SIZES,FONTS,dummyData} from '../../constants';
import { Button ,ProfileButton,IconButton,Section,TransactionItem} from '../../components';
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
                       {t('hello')} {dummyData.myProfile.name}</Text>
                       <View style={{flexDirection:'row', marginTop:5}}>
                       <Text  adjustsFontSizeToFit numberOfLines={1} style={{fontSize:SIZES.body4}}>{t('welcome')}</Text>
                       <Image source={icons.star} style={{height:20, width:20}}/>

                       </View>
                </View>
                {/* Profile */}
                 <ProfileButton 
                 icon={dummyData.myProfile.profile_image}
                 containerStyle={{
                     backgroundColor:COLORS.primary
                 }}/>

            </View>
        )
    }
    function render_Balance_And_CardBtn(){
        return(
            <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginTop:SIZES.padding}}>
                {/* Balance */}
                <View>

                    <Text style={{...FONTS.h1}}>${dummyData.myProfile.totalBalance}</Text>
                    <Text style={{...FONTS.body4, color:COLORS.gray2}}>{t('yourBalance')}</Text>
                </View>

                {/* Button */}
                <View>  
                <Button 
                label={t('addCard')}
                labelStyle={{...FONTS.h4}}
                iconPosition='RIGHT'
                icon={icons.plus}
                iconStyle={{
                    marginLeft:20,
                }}

                containerStyle={{
                    
                    flex:1,
                    justifyContent:'space-between',
                    alignItems:'center',
                    paddingHorizontal:SIZES.radius,
                    borderRadius:SIZES.radius2,
                    borderColor:COLORS.darkGray,
                    borderWidth: 1,
                    marginVertical:9,

                  
                }}
                />

                </View>
                
            </View>
        )
    }

    function renderCards(){
        return(
            <View style={{ flexDirection:'row', justifyContent:'center',alignItems:'center' }}>

                {dummyData.myProfile.Cards && 
                <View>
                    
                </View>
                }
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:60,
                    backgroundColor:COLORS.white,
                    height: 200,
                    width:"100%",
                   borderRadius:SIZES.radius*2,
                   borderColor:COLORS.darkGray2,
                   borderWidth:1
                   }}>

                    <Image source={icons.plus}
                    style={{
                        height: 40,
                        width: 40,
                        tintColor:COLORS.black
                    }}/>

                </View>
            </View>
        )
    }

    function renderOptions(){
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginTop:SIZES.padding

            }}>
               {/* Send */}

                <View 
                style={{justifyContent:'center',alignItems:'center'}}
                >
                <IconButton 
                icon={icons.sendMoney}
                iconStyle={style.IconButton_icon}
                containerStyle={style.IconButtonContainer}
                />
                <Text style={style.IconButton_text} adjustsFontSizeToFit numberOfLines={1}>
                    {t('send')}
                </Text>
                </View>
                   
                   {/* Bill */}
                   <View style={{justifyContent:'center',alignItems:'center'}}>
                   <IconButton 
                     icon={icons.bill}
                     iconStyle={style.IconButton_icon}
                     containerStyle={style.IconButtonContainer}
                    />
               
                      <Text style={style.IconButton_text} adjustsFontSizeToFit numberOfLines={1}>
                      {t('bill')}
                       </Text>
                </View>

                   {/* Recharge */}
                   <View  style={{justifyContent:'center',alignItems:'center'}}>
                <IconButton 
                icon={icons.recharge}
                iconStyle={style.IconButton_icon}
                containerStyle={style.IconButtonContainer}
                />
                <Text style={style.IconButton_text} adjustsFontSizeToFit numberOfLines={1}>
                    {t('recharge')}
                </Text>
                </View>
                   
                   {/* More */}
                   <View style={{justifyContent:'center',alignItems:'center'}} >
                <IconButton 
                icon={icons.more}
                iconStyle={style.IconButton_icon}
                containerStyle={style.IconButtonContainer}
                />
                <Text style={style.IconButton_text} adjustsFontSizeToFit numberOfLines={1}>
                    {t('more')}
                </Text>
                </View>


            </View>
        )
    }

    function renderSendAgian(){
        return(
            <View>
              <Section label={t('sendAgain')} icon={null}  containerStyle={{marginTop:SIZES.padding}}/>

              {/* Rendering profiles */}
               <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center', marginTop:SIZES.radius2}}>
               <ProfileButton 
                 icon={icons.addUser}
                 iconStyle={{width:25, height:25, marginTop:0,tintColor:COLORS.gray2}}
                 containerStyle={{
                     backgroundColor:COLORS.gray3,
                     height: 50,
                     width: 50,
                 }}
                 onPress={()=> console.log("add user")}/>
              <FlatList
               data={dummyData.sendAgain}
               keyExtractor={(item)=> `${item.id}`}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({item,index})=>(
                     
                 <ProfileButton 
                 icon={item.profileImage}
                 containerStyle={{
                     backgroundColor:COLORS.primary,
                     marginLeft:20,
                     height: 50,
                     width: 50
                 }} 
                 onPress={()=>console.log(item.id)}/>
               )}


              />
               </View>

           
            </View>
        )
    }
    function renderTransactions(){
        return(
            <View>
                  <Section label={t('transaction')} 
                   icon={icons.goArrow} 
                   containerStyle={{marginTop:SIZES.padding}}/>
                   <View >
                    <FlatList
                    data={dummyData.Transaction}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item)=> `${item.id}`}
                    renderItem={({item,index})=>(
                        <TransactionItem item={item}/>
                    )}
  
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

              {/* Balance and add Card */}
              {render_Balance_And_CardBtn()}

              {/* Cards View */}

              {renderCards()}
              
              {/* options */}
              {renderOptions()}

              {/* send Again */}
              {renderSendAgian()}

              {/* Transactions */}
              {renderTransactions()}


              </View>

        </View>
    )

}

export default Home;

const style = StyleSheet.create({
    
    IconButton_icon:{
        width: 30,
        height: 30,
        tintColor:COLORS.white
    
    },
    IconButtonContainer:{
        width: 60,
        height: 60,
        borderRadius:SIZES.padding,
        backgroundColor:COLORS.black2
    },
    IconButton_text:{
       
        marginTop:10,
        color: COLORS.gray2,
        ...FONTS.body4
    }

})