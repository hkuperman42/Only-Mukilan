import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MessageComponent({ message, user, showTime }) {
    const [isShowingTime, setIsShowingTime] = useState(showTime);
    useEffect(()=>{setIsShowingTime(showTime)}, [showTime])
    
    return (
        <Pressable style={[styles.component, (message.id === user ? styles.rightText : styles.leftText)]}
                onPress={()=>setIsShowingTime(!isShowingTime)}>
            <View style={styles.messageContainer}>
                <View>
                    <Text style={styles.message}>
                        {message?.text ? message.text : "error"}
                    </Text>
                </View>
            </View>
            { isShowingTime &&
            <Text style={styles.time}>
                {message.time}
            </Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    component: {
        marginBottom: 1,
        width: "100%",
        // alignItems: "center",
        // flexDirection: "row",
        
        // borderRadius: 5,
        // paddingHorizontal: 15,
        // backgroundColor: "#fff",
        // height: 80,
        // marginBottom: 10,
    },
    messageContainer: {
        flexDirection: "row",
        alignItems: "center",

        maxWidth: "60%",
        backgroundColor: "red",
        padding: 15,
        borderRadius: 12,
        opacity: 0.7,
        
    },
    leftText: {
        alignItems: "flex-start",
    },
    rightText: {
        alignItems: "flex-end",
    },
    message: {
        color: "white",
        fontSize: 14,
        
    },
    time: {
        marginHorizontal: 15,
    }
})