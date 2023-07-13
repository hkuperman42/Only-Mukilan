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
} from "react-native";
import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SwipeScreen({ navigation }) {
  //This profile is for testing. Eventually, there will be a getProfile function.
  const [currentProfile, setCurrentProfile] = useState(getNewMukilan());

  //This is probably the least self-explanatory bit of code, enables swiping animation using PanResponder.
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
            setCurrentProfile(getNewMukilan);
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

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.menusAndLogo}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/hamburger-icon.png")}
            style={{ width: 26, height: 26, left: 15 }}
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
          source={{ uri: currentProfile.picture, cache: "reload" }}
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
            <Text style={styles.name}>{currentProfile.name}</Text>
            <Text style={styles.bio}>{currentProfile.bio}</Text>
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

function getNewMukilan() {
  return {
    name: "Random Image-kilan",
    bio: "My bio is randomized\n" + Math.random(),
    picture: "https://picsum.photos/200/300?" + Math.random(),
  };
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
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
