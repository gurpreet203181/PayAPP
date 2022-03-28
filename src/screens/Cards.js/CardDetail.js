import React from "react";

import { View, ImageBackground , Text ,StyleSheet  } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";

const CardDetail =({route})=>{
    const item= route.params.item
    return(
        <View>
            <Text>{item.id}</Text>

        </View>
    )

}

export default CardDetail;