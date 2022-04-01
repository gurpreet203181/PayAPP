import React from "react";
import { TouchableOpacity ,Image} from "react-native";
import { COLORS,SIZES} from "../../constants"; 


const ProfileButton = ({icon,iconStyle,containerStyle,onPress}) => {
    return(
       <TouchableOpacity 
       style={{
           flexDirection: "row",
           alignItems:"center",
           justifyContent:"center",
           height: 40,
           width: 40,
           borderRadius:SIZES.padding,
           overflow: "hidden",
           ...containerStyle
       }}onPress={onPress}>

           <Image source={icon} 
           style={{
               marginTop:10,
               height: 40,
               width: 40,
               ...iconStyle
           }}/>

        

       </TouchableOpacity>
    )
}
export default ProfileButton;