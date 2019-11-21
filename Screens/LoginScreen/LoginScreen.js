import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Animated,
  Easing,
  Keyboard,
  StatusBar
} from "react-native";
import firebase from "react-native-firebase";
import InputField from "../../Components/InputField";

import { Button } from "native-base";

import ButtonNB from "../../Components/loginButton";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.anime = {
      animatedValue: new Animated.Value(0),
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    // alert("Keyboard Shown");
    Animated.spring(this.anime.opacity, {
      toValue: 0,
      duration: 50,
      easing: Easing.ease
    }).start();
    Animated.spring(this.anime.animatedValue, {
      toValue: 0.7,
      duration: 100,
      easing: Easing.ease
    }).start();
  };

  _keyboardDidHide = () => {
    // alert("Keyboard Hidden");
    Animated.spring(this.anime.animatedValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease
    }).start();
    Animated.spring(this.anime.opacity, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease
    }).start();
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
    empty: "",
    danger: "#f3d104"
  };
  HandleLogin = () => {
    const { email, password } = this.state;

    if ((email, password)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate("HomeScreen"))
        .catch(error => this.setState({ errorMessage: "Bad Credentials" }));
    } else if ((email, password).length == 0) {
      this.setState({ danger: "red" });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.logoView}>
          <Animated.Image
            style={{ transform: [{ scale: this.anime.animatedValue }] }}
            source={require("../../assets/logo.png")}
          />
          <Animated.Text
            style={[styles.LogoText, { opacity: this.anime.opacity }]}
          >
            Matka Tips Today
          </Animated.Text>
        </View>

        <View style={styles.inputView}>
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <InputField
            label="Email"
            itemStyle={{
              borderBottomColor: this.state.danger,
              borderBottomWidth: 2
            }}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <InputField
            secureTextEntry
            itemStyle={{
              borderBottomColor: this.state.danger,
              borderBottomWidth: 1.6
            }}
            label="Password"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <ButtonNB title="Login" onPress={this.HandleLogin} />
          <Button
            style={styles.signButton}
            transparent
            onPress={() => this.props.navigation.navigate("SignupScreen")}
          >
            <Text style={styles.signText}>Don't have an account? Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  logoView: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  inputView: {
    flex: 3,
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  },
  signText: {
    color: "#7b3c15",
    alignSelf: "center",
    fontSize: 16
  },
  signButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  LogoText: {
    color: "#7b3c15",
    fontWeight: "bold",
    fontSize: 30
  }
});
