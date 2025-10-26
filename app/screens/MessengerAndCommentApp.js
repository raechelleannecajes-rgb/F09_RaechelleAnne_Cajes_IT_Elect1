import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MessengerAndCommentApp() {
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);

  // Avatar from assets folder
  const myAvatar = require("../../assets/Avatar.jpg");

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), text: message, avatar: myAvatar, reactions: 0 }]);
      setMessage("");
    }
  };

  // Post comment
  const postComment = () => {
    if (comment.trim()) {
      setComments([...comments, { id: Date.now(), text: comment, avatar: myAvatar, reactions: 0 }]);
      setComment("");
    }
  };

  // Add reaction
  const addReaction = (list, setList, id) => {
    const updated = list.map((item) =>
      item.id === id ? { ...item, reactions: item.reactions + 1 } : item
    );
    setList(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Messenger & Comment App</Text>

      {/* MESSAGES SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.reactionRow}>
                  <TouchableOpacity onPress={() => addReaction(messages, setMessages, item.id)}>
                    <Text style={styles.react}>❤️ {item.reactions}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* COMMENTS SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.reactionRow}>
                  <TouchableOpacity onPress={() => addReaction(comments, setComments, item.id)}>
                    <Text style={styles.react}>❤️ {item.reactions}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
          />
          <TouchableOpacity onPress={postComment} style={styles.button}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingBottom: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  reactionRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  react: {
    color: "#e63946",
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
