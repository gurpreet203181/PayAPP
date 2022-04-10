import React from "react";
import {Text,View, StyleSheet} from 'react-native';
import { FONTS, COLORS } from "../../constants";
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const CustomMultiSlider = ({onValuesChange,min,max,defaultValue}) => {
    return(
        <View>
            
            <View style={{marginTop:10, justifyContent:"center", alignItems:"center"}}>
                       <MultiSlider
                        values={defaultValue}
                        sliderLength={320}
                        onValuesChange={onValuesChange}
                        min={min}
                        max={max}
                        step={1}
                        allowOverlap
                        snapped
                        enableLabel
                        isMarkersSeparated={true}
                        

                        // customLabel={CustomLabel}
                       />
                       </View>
        </View>
    )
} 

export default CustomMultiSlider;
const styles = StyleSheet.create({
    
})