import React, { Component } from "react";

// import NetInfo from "@react-native-community/netinfo";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";

import firebase from "react-native-firebase";

import { createAppContainer, createStackNavigator } from "react-navigation";

//Screens
import HomeScreen from "./Screens/HomeScreen";
import ResultsScreen from "./Screens/ResultsScreen";

import OfflineNotice from "./Screens/OfflineNotice";
import Loading from "./Components/Loading";
import SignupScreen from "./Screens/SignUpScreen/SignupScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import PhoneAuthTest from "./Screens/Phone-Auth/PhoneAuthTest";
import LoadingNew from "./Components/LoadingNew";

const StackNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    ResultsScreen: ResultsScreen,
    LoadingNew: {
      screen: LoadingNew
    },
    Loading: {
      screen: Loading
    },
    PhoneAuthTest: {
      screen: PhoneAuthTest
    }
  },
  {
    initialRouteName: "Loading"
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   NetInfo.isConnected.fetch().then(isConnected => {
  //     this.setState({ isConnected });
  //   });
  // }
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
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
