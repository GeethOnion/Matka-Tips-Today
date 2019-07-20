import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import firebase from "react-native-firebase";

export default class App extends React.Component {
  componentDidMount() {
    firebase.messaging().subscribeToTopic("all");

    ////firebase request permission for notification
    // firebase
    //   .messaging()
    //   .hasPermission()
    //   .then(enabled => {
    //     myData = "Line 24";
    //     if (enabled) {
    //       // user has permissions
    //       myData = "user has permissions";
    //     } else {
    //       // user doesn't have permission
    //       myData = "user doesn't have permission";
    //       firebase
    //         .messaging()
    //         .requestPermission()
    //         .then(() => {
    //           myData = "User has authorised";
    //           // User has authorised
    //         })
    //         .catch(error => {
    //           // User has rejected permissions
    //           myData = "User has rejected permissions";
    //         });
    //     }
    //   });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
