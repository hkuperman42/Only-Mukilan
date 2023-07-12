import { StyleSheet, Text, Image, View, SafeAreaView } from 'react-native'
import React from 'react'

export default function SwipeScreen() {
  return (
    <View style={styles.view}>
      <SafeAreaView style={styles.menusAndLogo}>
        <Image source={require("../assets/hamburger-icon.png")} style={{width: 26, height: 26, left: 15}}></Image>
        <Image source={require("../assets/hacked-together-logo.png")} style={{width: 175, height: 42}}></Image>
        <Image source={require("../assets/human-icon.png")} style={{width: 28, height: 28, right: 15}}></Image>
      </SafeAreaView>
      <Text>SwipeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    backgroundColor: "orange",
    flex: 1
  },

  menusAndLogo : {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
    borderBottomWidth: 10
  }
})