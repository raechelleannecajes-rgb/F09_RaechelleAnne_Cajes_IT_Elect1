import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import MessengerAndCommentSection from "./MessengerAndCommentSection";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#66bb6a" />
      <View style={styles.center}>
        <MessengerAndCommentSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f5e9" }, // soft green background
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});