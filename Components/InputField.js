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
  ref,
  itemStyle
}) => (
  <View style={styles.container}>
    <Form>
      <Item style={[styles.item, itemStyle]} floatingLabel>
        <Label style={styles.label}>{label}</Label>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
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
    width: (width / 10) * 8,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10
  },
  label: {
    marginBottom: 10
  },
  item: {
    paddingVertical: 10,
    paddingRight: 20
  }
});
