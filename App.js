import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import MessengerAndCommentSection from "./MessengerAndCommentSection";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
      <MessengerAndCommentSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },
});
