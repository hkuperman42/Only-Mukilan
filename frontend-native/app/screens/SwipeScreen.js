import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SwipeScreen({ navigation }) {
  //This profile is for testing
  const testProfile = {
    name: "Club-kilan",
    bio: "Let's partayyyy.\nI'm not indian for some reason.",
    picture: "../assets/generic-man.png",
  };

  const [currentProfile, updateCurrentProfile] = useState(testProfile);

  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.menusAndLogo}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image
            source={require("../assets/hamburger-icon.png")}
            style={{ width: 26, height: 26, left: 15 }}
          ></Image>
        </TouchableOpacity>
        <Image
          source={require("../assets/hacked-together-logo.png")}
          style={{ width: 175, height: 42 }}
        ></Image>
        <TouchableOpacity
          onPress={() => navigation.navigate("SelfProfileScreen")}
        >
          <Image
            source={require("../assets/human-icon.png")}
            style={{ width: 28, height: 28, right: 15 }}
          ></Image>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={[{ padding: 13, paddingTop: 5 }, styles.view]}>
        <ImageBackground
          source={require("../assets/generic-man.png")}
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
      </View>
    </View>
  );
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
