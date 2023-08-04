import {
    StyleSheet,
    Text,
    Image,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Pressable,
    FlatList,
    StatusBar,
  } from "react-native";
  import React, { useState, useCallback, useEffect, useRef } from "react";
  import useWebSocket from "react-use-websocket";
  import MessageComponent from "../components/MessageComponent";
  import { Feather, Ionicons } from "@expo/vector-icons";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
  const webSocketURL = 'ws://192.168.1.15:8080/api/ws/test/'

  export default function MessagingScreen({ route, navigation }) {
    const [newTextValue, setNewTextValue] = useState("");
    const [chatMessages, setChatMessages] = useState([
      {
        id: 3,
        text: "Where are my arms?",
        time: "07:50",
        user: "Johnathan White",
      },
      {
        id: 2,
        text: "Idk bro",
        time: "9:16",
        user: "Alexander Pollard",
        
      },
      {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id ornare arcu odio ut sem nulla pharetra diam. Egestas diam in arcu cursus euismod. Metus aliquam eleifend mi in. Pulvinar pellentesque habitant morbi tristique senectus. Netus et malesuada fames ac turpis. Et netus et malesuada fames ac. Praesent semper feugiat nibh sed pulvinar. Mattis ullamcorper velit sed ullamcorper. Diam phasellus vestibulum lorem sed risus. Tempus imperdiet nulla malesuada pellentesque. Tempor nec feugiat nisl pretium fusce id velit. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Sit amet nulla facilisi morbi tempus. Est velit egestas dui id.",
        time: "3:12",
        user: "Brendan Wilson",
      }
    ]);
    const textRef = useRef();
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
        setChatMessages([lastJsonMessage, ...chatMessages]);
      }
    }, [lastJsonMessage, setChatMessages])

    const { name, id } = route?.params ? route.params : {name: "No Name Given", id: -1};

    function submitText() {
      sendJsonMessage({
        'id': chatMessages[0].id + 1,
        'text': newTextValue,
        'time': "7:51",
        'user': "Mukilion: God of Mukile"
      });
      setNewTextValue("");
    }
      
    return (
      <SafeAreaView style={styles.messagesScreen}>
        
        <View style={styles.messagingHeaderContainer}>
          <Pressable style={styles.backButton}
              onPress={()=>{
              navigation.navigate("MatchesScreen");
            }}>
              <Ionicons name='arrow-back-sharp' size={32} color='black' />
          </Pressable>
          <View style={styles.messagingHeader}>
            <Pressable onPress={()=>{
                console.log("See Match Profile Button Pressed!");
              }}>
                <Ionicons name='person-circle-sharp' size={32} color='black' />
            </Pressable>
            <Text style={styles.messagingHeading}>{name}</Text>
          </View>
        </View>
        <View style={styles.messagesListContainer}>
          <FlatList 
                  inverted={true}
                  data={chatMessages}
                  renderItem={({ item }) => <MessageComponent message={item} user={1} showTime={item.id==chatMessages[0].id}/>}
                  keyExtractor={(item) => item.id}
                />
          
        </View>
        <View style={styles.messageInputContainer}>
          <TextInput 
            value={newTextValue}
            onChangeText={(value)=>setNewTextValue(value)}
            style={styles.messageInput}
            placeholder="Text message" 
            onSubmitEditing={submitText}>
          </TextInput>
          <Pressable style={styles.messageInputButton}
              onPress={submitText}>
            <Feather name="send" size={30} color="crimson" />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    messagesScreen: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#F7F7F7",
      flex: 1,
      flexDirection: "column",
    },
    messagingHeaderContainer: {
      backgroundColor: "white",
      height: 70,
      width: "100%",
      paddingVertical: 20,
      justifyContent: "center",
      marginBottom: 15,
      elevation: 2,
      flexDirection: "row",
    },
    backButton: {
      position: "absolute",
      left: 15,
      top: 20,
    },
    messagingHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      // flex: 0.5,
    },
    messagingHeading: {
      color: "crimson",
      fontSize: 24,
      fontWeight: "bold",
    },
    messagesListContainer: {
      paddingHorizontal: 10,
      flexDirection: "column",
      backgroundColor: "#F7F7F7",
      flex: 1,
    },
    messageInputContainer: {
      width: "100%",
      minHeight: 100,
      backgroundColor: "white",
      paddingVertical: 20,
      paddingHorizontal: 15,
      justifyContent: "center",
      flexDirection: "row",

      alignContent: "flex-end",
    },
    messageInput: {
      borderWidth: 1,
      padding: 15,
      flex: 1,
      marginRight: 10,
      borderRadius: 15,
    },
    messageInputButton: {
      justifyContent: "center",
    },
  });
  