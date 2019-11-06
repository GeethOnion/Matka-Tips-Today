import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import firebase from "react-native-firebase";
import InputField from "../../Components/InputField";
import ButtonNB from "../../Components/loginButton";

import { Button } from "native-base";

export default class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
    empty: "",
    danger: "#f3d104"
  };
  handleSignUp = () => {
    // TODO: Firebase stuff...

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("HomeScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
    console.log("handleSignUp");
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <View style={styles.header}>
            <Text style={styles.signTextTitle}>Sign Up</Text>
            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            )}
          </View>
          <InputField
            label="Email"
            itemStyle={{
              borderBottomWidth: 2
            }}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <InputField
            secureTextEntry
            itemStyle={{
              borderBottomWidth: 1.6
            }}
            label="Password"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <ButtonNB title="Sign Up" onPress={this.handleSignUp} />
          <Button
            style={styles.signButton}
            transparent
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text style={styles.signText}>Don't have an account? Login</Text>
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
  inputView: {
    flex: 3,
    justifyContent: "center",
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
  },
  signTextTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#7b3c15"
  },
  header: {
    marginVertical: 20,
    marginLeft: 10
  }
});
