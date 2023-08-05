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
  import React, { useState, useCallback, useEffect } from "react";
  import useWebSocket from "react-use-websocket";
  import { Feather, Ionicons } from "@expo/vector-icons";
  import MatchComponent from "../components/MatchComponent";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { getMatches, saveMatches } from "../utilities/matchesStorage";
  
  const webSocketURL = 'ws://192.168.1.15:8080/api/ws/test/'

  export default function MatchesScreen({ navigation }) {
    const [matches, setMatches] = useState([]);
    
    useEffect(() => {loadMatches();}, []);
    
    async function loadMatches() {
      setMatches(await getMatches());
    }

    return (
      <SafeAreaView style={styles.matchesScreen}>
        <View style={styles.matchesHeadingContainer}>
          <View style={styles.matchesHeader}>
          <Pressable style={styles.backButton}
              onPress={()=>{
              navigation.navigate("SwipeScreen");
            }}>
              <Ionicons name='arrow-back-sharp' size={32} color='black' />
          </Pressable>
            <Text style={styles.matchesHeading}>Matches</Text>
            <Pressable onPress={()=>{
              navigation.navigate("SelfProfileScreen")
            }}>
              <Ionicons name='person-circle-sharp' size={32} color='black' />
            </Pressable>
          </View>
        </View>
  
        <View style={styles.matchesListContainer}>
          { matches.length > 0 ? (
              <FlatList 
                data={matches}
                renderItem={({ item }) => <MatchComponent item={item}/>}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View style={styles.matchesEmptyContainer}>
                <Text style={styles.matchesEmptyText}>No Rooms Created!</Text>
                <Text>Click the icon above to create a room</Text>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    matchesScreen: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#F7F7F7",
      flex: 1,
      padding: 10,
      position: "relative",
    },
    matchesHeadingContainer: {
      backgroundColor: "#F7F7F7",
      height: 70,
      width: "100%",
      padding: 20,
      justifyContent: "center",
      marginBottom: 15,
      elevation: 2,
    },
    matchesHeading: {
      fontSize: 24,
      fontWeight: "bold",
      color: "crimson",
    },
    matchesHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    matchesListContainer: {
      paddingHorizontal: 10,
    },
    matchesEmptyContainer: {
      width: "100%",
      height: "80%",
      alignItems: "center",
      justifyContent: "center",
    },
    matchesEmptyText: {
      fontWeight: "bold",
      fontSize: 24,
      paddingBottom: 30
    }
  });
