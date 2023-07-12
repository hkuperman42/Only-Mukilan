import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function SwipeScreen() {
  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.menusAndLogo}>
        <TouchableOpacity>
          <Image
            source={require("../assets/hamburger-icon.png")}
            style={{ width: 26, height: 26, left: 15 }}
          ></Image>
        </TouchableOpacity>
        <Image
          source={require("../assets/hacked-together-logo.png")}
          style={{ width: 175, height: 42 }}
        ></Image>
        <TouchableOpacity>
          <Image
            source={require("../assets/human-icon.png")}
            style={{ width: 28, height: 28, right: 15 }}
          ></Image>
        </TouchableOpacity>
      </SafeAreaView>

      <ImageBackground
        source={require("../assets/generic-man.png")}
        style={styles.profile}
        imageStyle={styles.roundedTop}
      >
        <ImageBackground
          source={require("../assets/opacity-gradient.png")}
          style={styles.profile}
        >
          <Text style={styles.name}></Text>
        </ImageBackground>
      </ImageBackground>

      <Image
        source={require("../assets/black-box-bottom.png")}
        style={{ flex: 0.25 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
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
  name: {},
  bio: {},
});
