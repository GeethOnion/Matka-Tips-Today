import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button, Icon } from "native-base";

const LoginButton = ({ title, onPress }) => (
  <View>
    <Button iconLeft light style={styles.loginButton} onPress={onPress}>
      <Icon style={styles.iconColor} name="ios-lock" />
      <Text style={styles.buttonText}>{title}</Text>
    </Button>
  </View>
);
export default LoginButton;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#f3d104",
    marginTop: 30,
    justifyContent: "center",
    borderRadius: 50
  },
  buttonText: {
    color: "#7b3c15",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 20
  },
  iconColor: {
    color: "#7b3c15"
  }
});
