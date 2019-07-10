import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableNativeFeedback
} from "react-native";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "react-native-admob";

import LinearGradient from "react-native-linear-gradient";
import firebase from "./firebase";
import verCheck from "./verCheck";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Matka Tips Today",
    headerStyle: {
      backgroundColor: "#24C6DC"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      categories: []
    };
    this.ref = firebase.firestore().collection("categories");
  }

  componentDidMount() {
    verCheck();
    this.unsubscribe = this.ref.onSnapshot(querySnapshot => {
      const categories = [];
      querySnapshot.forEach(doc => {
        const { name, title, result } = doc.data();
        categories.push({
          key: doc.id,
          doc,
          name,
          title,
          result
        });
      });
      this.setState({
        categories,
        loading: false
      });
    });
  }

  pressRow(item) {
    this.props.navigation.navigate("Results", item);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#24C6DC", "#514A9D"]}
          style={{ height: "100%" }}
        >
          <StatusBar backgroundColor="#24C6DC" barStyle="light-content" />
          <ScrollView style={styles.scroll}>
            <View>
              <FlatList
                data={this.state.categories}
                renderItem={({ item }) => (
                  <View style={styles.buttonview}>
                    <TouchableNativeFeedback
                      style={{ borderRadius: 20 }}
                      background={TouchableNativeFeedback.Ripple(
                        "#ececec",
                        true
                      )}
                      useForeground={true}
                      onPress={() => {
                        this.pressRow(item);
                      }}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttontext}>{item.name}</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <View style={styles.addView}>
            <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              // testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 12,
    width: 350,
    height: 63,
    borderRadius: 20,
    alignItems: "center",
    shadowOpacity: 0.2,
    elevation: 20
  },

  buttonview: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  scroll: {
    width: "100%",
    height: "100%"
  },

  buttontext: {
    color: "grey",
    fontSize: 25,

    fontWeight: "700"
  },
  addView: {
    justifyContent: "center",
    alignItems: "center"
  },
  addText: {
    color: "white",
    textAlign: "center"
  }
});
