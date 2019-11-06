import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Input, Item, Form, Label } from "native-base";

const { width, height } = Dimensions.get("window");

const InputField = ({
  placeholder,
  label,
  onChangeText,
  secureTextEntry,
  value,
  style,
  ref
}) => (
  <View style={styles.container}>
    <Form>
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          ref={ref}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          value={value}
          style={(styles.input, style)}
        />
      </Item>
    </Form>
  </View>
);
export default InputField;

const styles = StyleSheet.create({
  input: {
    width: (width / 10) * 9,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10
  }
});
