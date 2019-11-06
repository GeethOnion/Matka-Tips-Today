import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import firebase from "react-native-firebase";
import InputField from "../../Components/InputField";

import { Button } from "native-base";

import ButtonNB from "../../Components/loginButton";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = { email: "", password: "", errorMessage: null };
  handleLogin = () => {
    // TODO: Firebase stuff...

    const { email, password } = this.state;

    if ((email, password)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate("HomeScreen"))
        .catch(error => this.setState({ errorMessage: "Bad Credentials" }));

      console.log("handleLogin");
    } else if ((email, password).length == 0) {
      alert("Fill Required");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoView}></View>

        <View style={styles.inputView}>
          {this.state.errorMessage && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {this.state.errorMessage}
            </Text>
          )}
          <InputField
            label="Email"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <InputField
            secureTextEntry
            label="Password"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <ButtonNB title="Login" onPress={this.handleLogin} />
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
    flex: 3
  },
  inputView: {
    flex: 2,
    justifyContent: "flex-end"
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
    alignSelf: "center"
  },
  signButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0
  }
});
