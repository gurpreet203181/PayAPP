import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants";

const FormInput = ({
  containerStyle,
  textContainerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponenet,
  appendComponenet,
  onChange,
  secureTextEntry,
  keyboradType = "default",
  autoCompleteType = "off",
  autoCapitalize = "none",
  errorMsg = "",
  maxLength,
  forgotButton,
  value,
  autoFocus,
  multiline = false,
  numberOfLines,
}) => {
  const [Focus, setFocus] = React.useState(false);
  return (
    <View style={containerStyle}>
      <View
        style={{
          ...Styles.container,
          ...textContainerStyle,
          borderBottomColor: Focus ? COLORS.black2 : COLORS.lightGray2,
        }}
      >
        {prependComponenet}
        <TextInput
          style={{ ...Styles.inputContainer, ...inputStyle }}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoFocus={autoFocus}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboradType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onChangeText={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {appendComponenet}
      </View>
      {errorMsg != "" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={Styles.ErrorMsg}>{errorMsg}</Text>
          {forgotButton}
        </View>
      )}
    </View>
  );
};
export default FormInput;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
  },
  inputContainer: {
    color: COLORS.black2,
    backgroundColor: COLORS.white,
    width: "90%",
    height: 56,
    marginLeft: 16,
    //  ...FONTS.body3
  },
  ErrorMsg: {
    color: COLORS.red,
    ...FONTS.body5,
  },
});
