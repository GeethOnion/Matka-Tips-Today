import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import firebase from "react-native-firebase";

export default class Loading extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      //   this.props.navigation.navigate(user ? "HomeScreen" : "LoginScreen");
      if (user) {
        this.props.navigation.navigate(user ? "HomeScreen" : "SignupScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator color="#f3d104" size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
