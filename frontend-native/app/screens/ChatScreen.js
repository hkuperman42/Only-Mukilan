import {
    StyleSheet,
    Text,
    Image,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import React, { useState, useCallback, useEffect } from "react";
  import useWebSocket from "react-use-websocket";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
  const webSocketURL = 'ws://192.168.1.15:8080/api/ws/test/'

  export default function ChatScreen({ navigation }) {
    const [log, setLog] = useState("");

    const {sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket} = useWebSocket(
      webSocketURL,
      {
        onOpen: () => console.log("Opened WebSocket Connection"),
        onClose: () => console.log("Websocket Closed"),
        shouldReconnect: (closeEvent) => true,
      },
    );

    useEffect(() => {
      if (lastJsonMessage !== null && lastJsonMessage !== {}) {
        setLog((prev) => prev + lastJsonMessage['message'] + "\n");
      }
    }, [lastJsonMessage, setLog])

    return (
      <SafeAreaView style={styles.view}>
        <TouchableOpacity onPress={() => navigation.navigate("SwipeScreen")}>
          <Image
            source={require("../assets/back-icon.png")}
            style={{ width: 26, height: 26, left: 15 }}
          />
        </TouchableOpacity>
        <Text style={{ paddingTop: 300, textAlign: "center" }}>
          {log}
        </Text>
        <TextInput placeholder="text response" 
        onSubmitEditing={useCallback(
            event => {
              sendJsonMessage({
                'message': event.nativeEvent.text,
              });
            },
            []
          )
        }>
        </TextInput>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    view: {
      backgroundColor: "white",
      flex: 1,
    },
  });
  