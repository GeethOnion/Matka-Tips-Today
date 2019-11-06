import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  NetInfo,
  Dimensions,
  Platform
} from "react-native";

import { Button } from "native-base";

const { width } = Dimensions.get("window");

import LinearGradient from "react-native-linear-gradient";
import firebase from "react-native-firebase";

import verCheck from "./verCheck";
import OfflineNotice from "./OfflineNotice";

import "../adMob";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Matka Tips Today",
    headerLeft: null,
    headerRight: (
      <Button
        style={{ paddingHorizontal: 20 }}
        transparent
        onPress={() => HomeScreen._signout()}
      >
        <Text style={{ fontWeight: "bold", color: "#721f00", fontSize: 18 }}>
          Sign Out
        </Text>
      </Button>
    ),
    headerStyle: {
      backgroundColor: "#f3d104"
    },
    headerTintColor: "#721f00",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor() {
    super();
    this.unsubscribe = null;
    this.state = {
      currentUser: null,
      isLoading: true,
      categories: []
    };
    this.ref = firebase.firestore().collection("categories");
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    verCheck();
    const advert = firebase.admob().interstitial(global.adMobIds.interstitial);
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    advert.loadAd(request.build());

    advert.on("onAdLoaded", () => {
      advert.show();
    });

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
    this.props.navigation.navigate("ResultsScreen", item);
  }

  static _signout() {
    firebase.auth().signOut();
    // alert(this.state.currentUser.email);
  }

  render() {
    //firebase/auth
    const { currentUser } = this.state;

    const Banner = firebase.admob.Banner;

    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#f3d104", "#7b3c15"]}
          style={{ height: "100%" }}
        >
          <StatusBar backgroundColor="#f3d104" barStyle="dark-content" />
          <OfflineNotice />
          <ScrollView style={styles.scroll}>
            <View>
              <FlatList
                data={this.state.categories}
                renderItem={({ item }) => (
                  <View style={styles.buttonview}>
                    <Button
                      style={styles.button}
                      onPress={() => {
                        this.pressRow(item);
                      }}
                    >
                      <Text style={styles.buttontext}>{item.name}</Text>
                    </Button>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          {/* <Text>Hi {currentUser && currentUser.email}!</Text> */}

          <Banner
            unitId={global.adMobIds.banner}
            size={"SMART_BANNER"}
            request={request.build()}
          />
          <View style={styles.addView}>
            {/* <AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              // testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)}
            /> */}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    padding: 12,
    // width: (width / 10) * 8,
    height: 63,
    borderRadius: 20,
    alignItems: "center",
    shadowOpacity: 0.2
    // elevation: 20,
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
    textAlign: "center",
    fontWeight: "700",
    width: (width / 10) * 8
  },
  addView: {
    justifyContent: "center",
    alignItems: "center"
  },
  addText: {
    color: "white",
    textAlign: "center"
  },
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    top: 30
  },
  offlineText: {
    color: "#fff"
  },
  signText: {
    fontWeight: "bold",
    color: "#721f00"
  }
});
