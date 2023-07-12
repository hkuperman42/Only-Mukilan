import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SelfProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate("SwipeScreen")}>
        <Image
          source={require("../assets/back-icon.png")}
          style={{ width: 26, height: 26, left: 15 }}
        />
      </TouchableOpacity>
      <Text style={{ paddingTop: 300, textAlign: "center" }}>
        The profile editing screen is still under development.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
  },
});
