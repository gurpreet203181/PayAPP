import React from 'react';

import { View ,Text} from 'react-native';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Settings = ()=>{

    return(
        <View style={{flex:1, justifyContent:'center' ,alignItems:'center', backgroundColor:Colors.white}}>
             
             <Text>Settings</Text>
        </View>
    )

}

export default Settings;