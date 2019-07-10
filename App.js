import React from "react";
import OneSignal from "react-native-onesignal";

import { createStackNavigator, createAppContainer } from "react-navigation"; // Version can be specified in package.json
import homeScreen from "./components/HomeScreen";
import resultsScreen from "./components/ResultsScreen";

const RootStack = createStackNavigator({
  Home: homeScreen,
  Results: resultsScreen
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("c3c4c771-74c2-4cc8-8a1b-0fb26f058f90"); // TODO Paste Your OnSignal APP_ ID here

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
    OneSignal.configure(); // triggers the ids event
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }
  onIds(device) {
    console.log("Device info: ", device);
  }
  render() {
    return <AppContainer />;
  }
}
