import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ResultsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ResultsScreen</Text>
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
