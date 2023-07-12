import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function SelfProfileScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text style={{ textAlign: "center" }}>
        The profile creation screen is still under development.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
