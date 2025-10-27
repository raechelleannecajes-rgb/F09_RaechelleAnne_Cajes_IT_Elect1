import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MessengerAndCommentApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef(null);

  // 🗨️ Random replies list
  const autoReplies = [
    "Oh really? 😄",
    "That sounds nice!",
    "I totally agree with you 💬",
    "You're funny 😂",
    "Hmm, interesting thought 🤔",
    "I missed chatting with you 🥺",
    "Wait, say that again? 👀",
    "I’m proud of you ❤️",
    "Haha okay okay 😅",
    "Aww, you’re so sweet 💕",
    "That’s amazing! 🌟",
    "I didn’t know that 😮",
    "Tell me more!",
    "You always make me smile 😊",
  ];

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

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // 🧠 Generate random reply
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * autoReplies.length);
      const replyText = autoReplies[randomIndex];

      const reply = {
        id: (Date.now() + 1).toString(),
        sender: "GAIA ❤️",
        text: replyText,
        time: "Now",
        isMe: false,
      };
      setMessages((prev) => [...prev, reply]);

      // Scroll again for new message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.isMe ? styles.rightAlign : styles.leftAlign,
      ]}
    >
      {!item.isMe && (
        <Image
          source={require("../assets/HeaderPic.jpg")}
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
          source={require("../assets/Avatar.jpg")}
          style={[styles.avatar, { marginLeft: 6 }]}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons name="arrow-back" size={24} color="#e5e9ec" />
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
            <Ionicons name="call-outline" size={22} color="#e5e9ec" />
            <Ionicons
              name="videocam-outline"
              size={22}
              color="#e5e9ec"
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
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.chatArea}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: true })
              }
            />
          )}
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={26} color="#78A9FF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "95%",
    height: "95%",
    backgroundColor: "#2b3b52",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#334155",
    padding: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerImage: { width: 38, height: 38, borderRadius: 20, marginHorizontal: 8 },
  headerName: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  activeText: { color: "#b0bec5", fontSize: 12 },
  headerIcons: { flexDirection: "row" },

  // Chat area
  chatContainer: {
    flex: 1,
    backgroundColor: "#2b3b52",
    margin: 8,
    borderRadius: 15,
    padding: 5,
  },
  chatArea: { flex: 1 },
  messageRow: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "flex-end",
  },
  leftAlign: { alignSelf: "flex-start" },
  rightAlign: { alignSelf: "flex-end", flexDirection: "row-reverse" },
  avatar: { width: 36, height: 36, borderRadius: 20 },
  bubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 15,
  },
  myBubble: {
    backgroundColor: "#4e9cff",
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: "#475569",
    borderTopLeftRadius: 0,
  },
  messageText: { color: "#fff", fontSize: 15 },
  timeText: {
    color: "#cbd5e1",
    fontSize: 10,
    marginTop: 3,
    alignSelf: "flex-end",
  },

  emptyChat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 14,
  },

  // Input bar
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#475569",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  input: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#1e293b",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },
});
