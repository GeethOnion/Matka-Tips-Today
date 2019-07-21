import { Alert, BackHandler, Linking } from "react-native";

import firebase from "react-native-firebase";

const FireDb = firebase.firestore().collection("version");

const verNumb = "0.0.1";

verCheck = () => {
  FireDb.doc("ver01")
    .get()
    .then(function(doc) {
      if (verNumb !== doc.data().verNo) {
        Alert.alert(
          "New Update Available!",
          "Do You Want To Update?",
          [
            {
              text: "No",
              onPress: () => BackHandler.exitApp(),
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(doc.data().url);
              }
            }
          ],
          { cancelable: false }
        );
        return true;
      }
    });
};

export default verCheck;
