import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

export default function MessengerAndCommentSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    // User message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      user: "You",
      avatar: "https://i.pravatar.cc/150?img=12",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Friend Bot reply after 1 sec
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotReply(input),
        user: "Friend ",
        avatar: "https://i.pravatar.cc/150?img=32",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Simple bot replies
  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("hi") || lower.includes("hello")) return "Hey! 🌸 How are you?";
    if (lower.includes("how are you")) return "I’m doing great, thanks for asking 🌿";
    if (lower.includes("bye")) return "Bye friend! 👋";
    return "That’s interesting! Tell me more 💚";
  };

  const renderMessage = ({ item }) => {
    const isUser = item.user === "You";
    return (
      <View style={[styles.messageContainer, isUser ? styles.rightAlign : styles.leftAlign]}>
        {!isUser && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.friendBubble]}>
          <Text style={[styles.user, isUser ? styles.userName : styles.friendName]}>
            {item.user}
          </Text>
          <Text style={styles.message}>{item.text}</Text>
        </View>
        {isUser && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>🌱 Messenger And Comment Section 🌱</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatBox}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message... "
          placeholderTextColor="#66bb6a"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>📩</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "80%",
    backgroundColor: "#f1f8e9",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    alignSelf: "center",
    marginTop: 40,
    overflow: "hidden",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    padding: 12,
    backgroundColor: "#66bb6a",
    color: "white",
  },
  chatBox: { padding: 12 },
  messageContainer: { flexDirection: "row", alignItems: "flex-end", marginVertical: 6 },
  leftAlign: { justifyContent: "flex-start" },
  rightAlign: { justifyContent: "flex-end" },
  avatar: { width: 35, height: 35, borderRadius: 20, marginHorizontal: 6 },
  bubble: { padding: 10, borderRadius: 12, maxWidth: "65%" },
  userBubble: { backgroundColor: "#c8e6c9" },
  friendBubble: { backgroundColor: "#e0f2f1" },
  user: { fontWeight: "bold", marginBottom: 2 },
  userName: { color: "#2e7d32" },
  friendName: { color: "#00695c" },
  message: { fontSize: 15, color: "#333" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#a5d6a7",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#81c784",
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: "#f1f8e9",
  },
  sendBtn: {
    backgroundColor: "#66bb6a",
    padding: 10,
    borderRadius: 50,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: { color: "white", fontSize: 18 },
});