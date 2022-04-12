import { t } from "../../hooks/UseI18n";
import { View, ScrollView , Text ,StyleSheet ,TouchableOpacity} from "react-native";
import { COLORS, FONTS ,icons, dummyData, SIZES} from "../../constants";
import {Header,Carditem,TransactionItem,Section,InfoItem} from "../../components";
import { FontAwesome } from '@expo/vector-icons'; 
import LottieView from "lottie-react-native";

const CardDetail =({route,navigation})=>{
    
    const item= route.params.item
    const animation = React.useRef(null);

    React.useEffect(() => {
       
          animation.current.play(0, 226);
        }, []);
    //render
    function renderHeader(){
        return(
           <Header 
           leftIcon={icons.back_arrow}
           onLeftIconPress={() => navigation.goBack()}
           rightIcon={icons.more2}
           />
        )
    }
    function renderLottieNfc(){
        return(
            <LottieView
            ref={animation}
              source={require("../../assets/images/88871-contactless-payment.json")}
              autoPlay
              loop={false}
            //  speed={2}
              style={{
                width: '100%',
                height: 110,
                alignSelf:"center",
              }}
            />
        )
    }
    function renderCard(){
        return(
            <View style={{marginHorizontal:44,justifyContent:"center", alignItems:"center"}}>
                <TouchableOpacity onPress={()=> navigation.navigate('PaymentSuccess')} style={{width:'100%'}}>
                 <Carditem item={item}/>
                </TouchableOpacity>

            </View>
        )
    }
    function renderTransactions(){
        return(
             <View >
             <Section label={t('transactions')}
             containerStyle={{marginTop:33}}/>
              {dummyData.Transaction.slice(0, 1).map((item,index)=>{
                    return( 
                    <TransactionItem  item={item} onPress={()=> navigation.navigate('TransactionDetail', { item })}/>
                    )
                })}
                <TouchableOpacity style={{alignItems:"center", marginTop:20}} onPress={()=>  navigation.navigate('Transactions',{item})}>
                    <Text style={{...FONTS.body5,fontSize:14}}>{t('more')}</Text>
                </TouchableOpacity>
             </View>
        )
    }
    function renderCardInfo(){
        return(
            <ScrollView showsVerticalScrollIndicator={false} >
             
             <View style={{...SIZES.marginHorizontal,marginTop:8}}>
             
             <InfoItem label={'Name'} value={'Gurpreet singh'} 
             icon={<FontAwesome name='user' size={16} color='white' />}
             />

             <InfoItem label={'Customer ID'} value={'0098 7485 1298'}
              icon={<FontAwesome name='user' size={16} color='white' />}
              />

             <InfoItem label={'Customer ID'} value={'September 2020'}
              icon={<FontAwesome name='user' size={16} color='white' />}
              />

             </View>
            </ScrollView>
        )
    }
    return(
        <View style={styles.container}>

                 
              {/* header */}
              {renderHeader()}

               {/* Lottie Nfc animation */}
               {renderLottieNfc()}
               <Text style={{...FONTS.body5, fontSize:12,alignSelf:"center",color:COLORS.black, opacity:0.8}}>{t('nearPhone')}</Text>

              {/* Card */}

              {renderCard()}
              
              {/* Transaction */}
               {renderTransactions()}

               {/* Account Info */}
             <Section label={t('accountInfo')} labelStyle={{...FONTS.h3, opacity:10}}
               containerStyle={{marginTop:33}}
             />
               {renderCardInfo()}


        </View>
    )

}

export default CardDetail;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:COLORS.white,
    },
    shadow:{
        shadowColor: '#4d4d4d',
        shadowOffset: {
         width: 0,
         height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 13.51,
        elevation: 5,
    },
    
})