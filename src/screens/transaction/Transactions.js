import React from "react";
import { View, Text , StyleSheet,FlatList } from "react-native";
import { FONTS, COLORS,icons,dummyData} from "../../constants";
import { Header,TransactionItem,Section} from "../../components";
import { t } from "../../hooks/UseI18n";
import LottieView from "lottie-react-native";

    
const Transactions = ({route,navigation}) =>{
    const item = route.params.item
    const [TransactionList, setTransactionList]= React.useState("");
  
    function TransactionData(){
     
        if (item==='all') {
            setTransactionList(dummyData.Transaction);
        } else {
            setTransactionList(dummyData.Transaction.filter((x) => x.card == item.id));
        }
    }
    React.useMemo(()=>{
        TransactionData();
    },[]);

  
    //render
    function renderHeader(){
        return(
           <Header 
           title={t('transactions')}
           leftIcon={icons.back_arrow}
           onLeftIconPress={() => navigation.goBack()}
           />
        )
    }
    
    function renderTransactions(){
        return(
             
              <FlatList
              data={TransactionList}
              showsVerticalScrollIndicator={false}     
              keyExtractor={(item)=> `${item.id}`}
              style={{marginBottom:22}}
              renderItem={({item,index})=>(
                  <View style={[index === dummyData.Transaction.length -1 ? {marginBottom:50}:null]}>
                  <TransactionItem item={item}  onPress={()=> navigation.navigate('TransactionDetail', { item })}/>
                 
                  </View>
                  
              )}

              />
    
        )
    }
    function renderLottie(){
        return(
            <LottieView
              source={require("../../assets/images/61372-404-error-not-found.json")}
              autoPlay
              loop={true}
              style={{
                width: '100%',
                height: 200,
                alignSelf:"center",
              }}
            />
        )
    }

    return(
        <View style={{backgroundColor:COLORS.white, flex:1}}>
               
               {/* Header */}
               {renderHeader()}

               
              {/* Transaction */}
              
              <Section label={t('transactions')}
             containerStyle={{marginTop:60}}/>

             {TransactionList != "" &&
               renderTransactions()
             }

              {TransactionList == "" &&
              <View style={{justifyContent:"center", alignItems:"center", marginTop:80}}>
              {renderLottie()}
              <Text  style={{marginTop:40,...FONTS.h2, fontSize:15}}>{t('noResult')}</Text>
              <Text style={{...FONTS.body5, fontSize:12, opacity:0.5}}>{t('noSearchResult')}</Text>
              </View>
              }

        </View>
    )
}

export default Transactions;

const styles = StyleSheet.create({

})