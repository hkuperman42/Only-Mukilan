import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView } from 'react-native';
import SwipeScreen from './app/screens/SwipeScreen';

export default function App() {
  return (
    <SwipeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
