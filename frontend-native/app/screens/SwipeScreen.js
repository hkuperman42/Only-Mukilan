import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  PanResponder,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import axios from "axios";

const API_URL = "http://192.168.1.15:8080/api/"; 
// Gryphon: http://192.168.1.15:8080/api/
// Hunter: http://192.168.2.169:8000/api/

export default function SwipeScreen({ navigation }) {
  const [currentProfile, setCurrentProfile] = useState({
    data: {},
    error: null,
    loading: true,
    refreshing: false,
  });

  const [swipeOpacity, setSwipeOpacity] = useState(new Animated.Value(1));
  const [pan, setPan] = useState(new Animated.ValueXY());
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        let newX = gestureState.dx;

        if (newX < 180 && newX > -180) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        } else {
          let toExit = newX > 1 ? 1000 : -1000;
          Animated.timing(pan, {
            toValue: { x: toExit, y: 0 },
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            getNewMukilan(setCurrentProfile);
            swipeOpacity.setValue(0);
            pan.setValue({ x: 0, y: 0 });
            Animated.timing(swipeOpacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            }).start();
          });
        }
      },
    })
  ).current;

  if (currentProfile.loading === true) {
    getNewMukilan(setCurrentProfile);
  } else {
    console.log(currentProfile.data);
  }

  return (
    <View style={[styles.view, styles.androidSafeAreaView]}>
      <SafeAreaView style={styles.menusAndLogo}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/gear-icon.png")}
            style={{ width: 30, height: 30, left: 15 }}
          />
        </TouchableOpacity>
        <Image
          source={require("../assets/hacked-together-logo.png")}
          style={{ width: 175, height: 42 }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SelfProfileScreen")}
        >
          <Image
            source={require("../assets/human-icon.png")}
            style={{ width: 28, height: 28, right: 15 }}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <Animated.View
        style={[
          {
            transform: [
              { translateX: pan.x },
              {
                rotate: pan.x.interpolate({
                  inputRange: [0, 300],
                  outputRange: ["0deg", "50deg"],
                }),
              },
            ],
          },
          styles.view,
          {
            padding: 13,
            paddingTop: 5,
            backgroundColor: "transparent",
            opacity: swipeOpacity,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <ImageBackground
          source={{ uri: currentProfile.data.pfp }}
          style={styles.profile}
          imageStyle={styles.roundedTop}
        >
          <ImageBackground
            source={require("../assets/opacity-gradient.png")}
            style={[
              { paddingLeft: 10, paddingRight: 10 },
              styles.bottomColumnView,
              styles.profile,
            ]}
          >
            <Text style={styles.name}>{currentProfile.data.name}</Text>
            <Text style={styles.bio}>{currentProfile.data.bio}</Text>
          </ImageBackground>
        </ImageBackground>

        <Image
          source={require("../assets/black-box-bottom.png")}
          style={[{ flex: 0.035, width: undefined }, styles.roundedBottom]}
        />
      </Animated.View>
    </View>
  );
}

function getNewMukilan(dataSetter) {
  axios
    .get(API_URL + "profile/2/") 
    .then(function (response) {
      dataSetter({
        data: response.data,
        error: null,
        loading: false,
        refreshing: false,
      });
    })
    .catch((error) => {
      console.log(error.request.responseText);
      dataSetter({
        data: {},
        error: true,
        loading: false,
        refreshing: false,
      });
    });
}

//Example Data: {name: "Mukilan", age: 18, height: "5'9\"", bio: "text", pfp: file*, user: 1} * = Images lack testing
function createProfile(data) { 
  axios
    .post(API_URL + "profile/", data)
    .then(response => {
      console.log(response);
      console.log("Profile Created");
    })
    .catch(error => {
      console.log(error.request.responseText);
    });
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
  },
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bottomColumnView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  menusAndLogo: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
    borderBottomWidth: 10,
  },
  profile: {
    flex: 1,
    flexDirection: "column",
  },
  roundedTop: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  roundedBottom: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  name: {
    color: "white",
    fontSize: 35,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  bio: {
    color: "white",
    fontSize: 20,
    fontFamily: "Arial",
    lineHeight: 27,
  },
});
