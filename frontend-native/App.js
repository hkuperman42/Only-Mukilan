import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, View, SafeAreaView } from "react-native";
import SwipeScreen from "./app/screens/SwipeScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import SelfProfileScreen from "./app/screens/SelfProfileScreen";
import MessagingScreen from "./app/screens/MessagingScreen";
import MatchesScreen from "./app/screens/MatchesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
        <Stack.Screen name="MessagingScreen" component={MessagingScreen}/>
        <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SelfProfileScreen" component={SelfProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
