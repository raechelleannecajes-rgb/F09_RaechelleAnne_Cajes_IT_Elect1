import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";

export default function MessengerAndCommentSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      user: "You",
      avatar: "https://i.pravatar.cc/150?img=3", // random avatar
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.bubble}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.message}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Messenger & Comment Section</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatBox}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdfdfd" },
  header: { fontSize: 22, fontWeight: "700", textAlign: "center", padding: 15, backgroundColor: "#6C63FF", color: "white" },
  chatBox: { padding: 15 },
  messageContainer: { flexDirection: "row", alignItems: "flex-start", marginVertical: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  bubble: { backgroundColor: "#e6e6ff", padding: 10, borderRadius: 10, maxWidth: "80%" },
  user: { fontWeight: "bold", color: "#333", marginBottom: 2 },
  message: { fontSize: 16, color: "#444" },
  inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#fff" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 25, paddingHorizontal: 15, fontSize: 16 },
  sendBtn: { backgroundColor: "#6C63FF", padding: 12, borderRadius: 50, marginLeft: 8, justifyContent: "center", alignItems: "center" },
  sendText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
