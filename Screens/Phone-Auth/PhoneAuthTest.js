import React, { Component } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  Image,
  BackHandler,
  Alert,
  StatusBar,
  StyleSheet
} from "react-native";

import firebase from "react-native-firebase";
import InputField from "../../Components/InputField";
import LoginButton from "../../Components/loginButton";

const successImageUri =
  "https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png";

export default class PhoneAuthTest extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: "",
      codeInput: "",
      phoneNumber: "+94",
      confirmResult: null
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.setState({ user: user.toJSON() });
        this.props.navigation.navigate("HomeScreen");
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: "",
          codeInput: "",
          phoneNumber: "+94",
          confirmResult: null
        });
      }
    });
  }

  handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: "Sending code ..." });

    if (phoneNumber) {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(confirmResult =>
          this.setState({ confirmResult, message: "Code has been sent!" })
        )
        .catch(error =>
          this.setState({
            // message: `Wrong Format, Example: +4412345678`
            message: error.message
          })
        );
    } else if (phoneNumber.length == 0) {
      this.setState({
        message: "Input Your Phone Number"
      });
    }
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult
        .confirm(codeInput)
        .then(user => {
          this.props.navigation.navigate("HomeScreen");
        })
        .catch(error =>
          this.setState({ message: `Code Confirm Error: ${error.message}` })
        );
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.logoView}>
          <Image source={require("../../assets/logo.png")} />
          <Text style={[styles.LogoText]}>Matka Tips Today</Text>
        </View>

        <View style={{ flex: 3, padding: 25, marginTop: 30 }}>
          <InputField
            keyboardType="number-pad"
            label="Enter Phone Number"
            placeholder="Phone Number"
            onChangeText={value => this.setState({ phoneNumber: value })}
            value={phoneNumber}
          />
          <LoginButton title="Sign In" onPress={this.signIn} />
        </View>
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text
        style={{ padding: 5, backgroundColor: "#721f00", color: "#f3d104" }}
      >
        {message}
      </Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below</Text>
        <InputField
          keyboardType="number-pad"
          //   style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          label="Code Here"
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={"Code ... "}
          value={codeInput}
        />
        <LoginButton title="Confirm Code" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#f3d104" barStyle="dark-content" />
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoView: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  LogoText: {
    color: "#7b3c15",
    fontWeight: "bold",
    fontSize: 30
  }
});
