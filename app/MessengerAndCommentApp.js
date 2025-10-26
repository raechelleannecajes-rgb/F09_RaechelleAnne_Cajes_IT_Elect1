import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function MessengerAndCommentApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: input,
      time: "Now",
      isMe: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate auto-reply from other user after 1.5 seconds
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: "GAIA ❤️",
        text: "Okay noted 😄",
        text: "thanks",
        text: "YOU ARE beautiful.",
        time: "Now",
        isMe: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isMe ? styles.rightMessage : styles.leftMessage,
      ]}
    >
      {!item.isMe && (
        <Image
          source={require("../assets/HeaderPic.jpg")} // 💬 other avatar
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.bubble,
          item.isMe ? styles.myBubble : styles.otherBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {item.isMe && (
        <Image
          source={require("../assets/Avatar.jpg")} // 💬 your avatar
          style={[styles.avatar, { marginLeft: 8 }]}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Image
              source={require("../assets/HeaderPic.jpg")}
              style={styles.headerImage}
            />
            <View>
              <Text style={styles.headerName}>GAIA ❤️</Text>
              <Text style={styles.activeText}>Active 6 minutes ago</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="call-outline" size={22} color="#fff" />
            <Ionicons
              name="videocam-outline"
              size={22}
              color="#fff"
              style={{ marginLeft: 15 }}
            />
          </View>
        </View>

        {/* Chat Section */}
        <View style={styles.chatContainer}>
          {messages.length === 0 ? (
            <View style={styles.emptyChat}>
              <Text style={styles.emptyText}>Start a conversation...</Text>
            </View>
          ) : (
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.chatArea}
            />
          )}
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor="#aaa"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#1E90FF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
  justifyContent: "center",
  },
  container: {
    width: "98%",
    height: "90%", 
    backgroundColor: "gray",
    borderRadius: 20,
    overflow: "hidden",
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "gray",
    padding: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerImage: { width: 35, height: 35, borderRadius: 20, marginHorizontal: 8 },
  headerName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  activeText: { color: "#b0bec5", fontSize: 12 },
  headerIcons: { flexDirection: "row" },

  // CHAT BOX
  chatContainer: {
    flex: 1,
    backgroundColor: "gray",
    margin: 10,
    borderRadius: 15,
    padding: 5,
  },
  chatArea: { flex: 1 },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-end",
  },
  leftMessage: { justifyContent: "flex-start" },
  rightMessage: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  avatar: { width: 35, height: 35, borderRadius: 20 },
  bubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 15,
  },
  myBubble: {
    backgroundColor: "#006AFF",
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: "#263645",
    borderTopLeftRadius: 0,
  },
  messageText: { color: "#fff", fontSize: 15 },
  timeText: { color: "#ccc", fontSize: 10, marginTop: 3, alignSelf: "flex-end" },

  emptyChat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },

  // INPUT BAR
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "gray",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#2a3b4d",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
});
