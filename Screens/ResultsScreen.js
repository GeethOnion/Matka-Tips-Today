import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from "react-native-admob";

import firebase from "react-native-firebase";

import LinearGradient from "react-native-linear-gradient";
import OfflineNotice from "./OfflineNotice";

export default class ResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: ""
    };
  }
  componentDidMount() {
    // AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
    // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    // AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  }
  static navigationOptions = {
    title: "Results",
    headerStyle: {
      backgroundColor: "#f3d104"
    },
    headerTintColor: "#721f00",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <OfflineNotice />
        <ScrollView style={styles.scroll}>
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 50 }}>
            {this.state.date}
          </Text>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <View style={styles.reslutview}>
              <LinearGradient
                colors={["#f3d104", "#7b3c15"]}
                style={{ height: "100%", borderRadius: 15 }}
              >
                <View style={styles.result}>
                  <Text style={styles.resulttitle}>
                    * {this.props.navigation.state.params.title} *
                  </Text>
                  <Text style={styles.resulttext}>
                    {this.props.navigation.state.params.result}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reslutview: {
    width: 300,

    marginBottom: 150,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 20,
    justifyContent: "center"
  },
  result: {
    textAlign: "center",
    justifyContent: "center",
    padding: 20
  },

  resulttitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 50
  },

  resulttext: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 20,
    color: "white"
  },
  scroll: {
    width: "100%"
  }
});
