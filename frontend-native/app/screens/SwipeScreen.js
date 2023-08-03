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
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.2.169:8000/api/";
// Gryphon: http://192.168.1.15:8080/api/
// Hunter: http://192.168.2.169:8000/api/

export default function SwipeScreen({ navigation }) {
  const [currentProfile, setCurrentProfile] = useState({
    data: {},
    error: null,
    loading: true,
    refreshing: false,
  });

  const [currentProfileIsLiked, setCurrentProfileIsLiked] = useState(true);
  const likedIconEnabled = require("../assets/liked-icon-enabled.png");
  const likedIconDisabled = require("../assets/liked-icon-disabled.png");

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
          }).start(async () => {
            try {
              await getNewMukilan(setCurrentProfile, setCurrentProfileIsLiked);
            } catch (error) {
              console.log(error);
            }
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
    getNewMukilan(setCurrentProfile, setCurrentProfileIsLiked);
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
        <View
          style={[
            styles.profile,
            { backgroundColor: "black" },
            styles.roundedBottom,
            styles.roundedTop,
          ]}
        >
          <ImageBackground
            source={{ uri: currentProfile.data.pfp }}
            style={styles.profile}
            imageStyle={styles.roundedTop}
          >
            <ImageBackground
              source={require("../assets/opacity-gradient.png")}
              style={[
                {
                  paddingLeft: 10,
                  paddingRight: 10,
                },
                styles.bottomColumnView,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.bottomColumnView}>
                  <Text style={styles.name}>{currentProfile.data.name}</Text>
                  <Text style={styles.bio}>{currentProfile.data.bio}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    toggleLike(
                      currentProfile.data.id,
                      currentProfileIsLiked,
                      setCurrentProfileIsLiked
                    )
                  }
                  style={{
                    flex: 0.2,
                    justifyContent: "flex-start",
                    padding: 6,
                  }}
                >
                  <Image
                    source={
                      currentProfileIsLiked
                        ? likedIconEnabled
                        : likedIconDisabled
                    }
                    style={{ height: 47, width: 47 }}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ImageBackground>

          <Image
            source={require("../assets/black-box-bottom.png")}
            style={[{ flex: 0.035, width: undefined }, styles.roundedBottom]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

async function toggleLike(id, isLiked, currentProfileIsLikedSetter) {
  currentProfileIsLikedSetter(!isLiked);
  try {
    await setLikedMukilans(id, isLiked ? 0 : 1);
  } catch (error) {
    console.log(error);
  }
}

async function getLikedMukilans() {
  try {
    const likedMukilanArray = await AsyncStorage.getItem("liked-mukilan-array");

    let res = JSON.parse(likedMukilanArray);
    if (res === null || !Array.isArray(res) || res.length != 250) {
      res = new Array(250).fill(0);
    }
    return res;
  } catch (error) {
    console.log(error);
    return new Array(250).fill(0);
  }
}

async function setLikedMukilans(mukilanID, value) {
  if (mukilanID >= 250 || mukilanID < 0) return;

  try {
    let likedMukilanArray = await getLikedMukilans();
    likedMukilanArray[mukilanID] = value;
    let jsonValue = JSON.stringify(likedMukilanArray);
    await AsyncStorage.setItem("liked-mukilan-array", jsonValue);
  } catch (error) {
    console.log(error);
  }
}
async function getNewMukilan(dataSetter, currentProfileIsLikedSetter) {
  //Change this to some better id-picking algorithm later
  let id = Math.round(Math.random() * 4 + 1);
  if (id === 5) id = 1; //Equalize probabilities to uniform distribution
  if (id === 4) id = 5; //Account for the lack of id === 4

  axios
    .get(API_URL + "profile/" + id + "/")
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

  try {
    let likedMukilanArray = await getLikedMukilans();
    currentProfileIsLikedSetter(
      likedMukilanArray != null && likedMukilanArray[id] === 1
    );
  } catch (error) {
    console.log(error);
  }
}

//Example Data: {name: "Mukilan", age: 18, height: "5'9\"", bio: "text", pfp: file*, user: 1} * = Images lack testing
function createProfile(data) {
  axios
    .post(API_URL + "profile/", data)
    .then((response) => {
      console.log(response);
      console.log("Profile Created");
    })
    .catch((error) => {
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
  bottomRowView: {
    flex: 1,
    flexDirection: "row",
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
