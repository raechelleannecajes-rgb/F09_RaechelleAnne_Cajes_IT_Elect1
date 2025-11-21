import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { getConversation, saveMessage } from "../../db/db";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const flatRef = useRef();
  const pollRef = useRef();

  useEffect(() => {
    navigation.setOptions({ 
      headerShown: false,
    });
    loadMessages();

    pollRef.current = setInterval(() => {
      loadMessages();
    }, 800);

    return () => clearInterval(pollRef.current);
  }, []);

  const loadMessages = async () => {
    try {
      const msgs = await getConversation(user.id, otherUser.id);
      const normalized = msgs.map((m) => ({
        id: m.id,
        senderId: m.senderId ?? m.from_id,
        receiverId: m.receiverId ?? m.to_id,
        text: m.text ?? m.content,
        createdAt: m.createdAt ?? m.created_at,
      }));
      setMessages(normalized);
      setTimeout(() => flatRef.current?.scrollToEnd?.({ animated: true }), 50);
    } catch (e) {
      console.warn("loadMessages", e);
    }
  };

  const send = async () => {
    if (!text.trim()) return;
    const payload = {
      senderId: user.id,
      receiverId: otherUser.id,
      text: text.trim(),
      createdAt: Date.now(),
    };
    try {
      setMessages((prev) => [...prev, { ...payload, id: "tmp-" + Date.now() }]);
      setText("");
      const newId = await saveMessage(payload);
      setMessages((prev) =>
        prev.map((m) => (String(m.id).startsWith("tmp-") ? { ...m, id: newId } : m))
      );
      setTimeout(() => flatRef.current?.scrollToEnd?.({ animated: true }), 50);
    } catch (e) {
      Alert.alert("Send failed", e.message || String(e));
    }
  };

  const getInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF85A2', '#FF69B4', '#FFB6C1', '#D4A5B5', '#FF97C1'];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Avatar rendering function for specific email
  const renderAvatar = (otherUser) => {
    const specificEmail = "raechelleannecajes@gmail.com";
    
    if (otherUser.email === specificEmail) {
      return (
        <Image
          source={require("../../assets/Avatar.jpg")}
          style={styles.avatarImage}
        />
      );
    } else {
      const initials = getInitials(otherUser.name, otherUser.email);
      const avatarColor = getAvatarColor(otherUser.name || otherUser.email);
      
      return (
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      );
    }
  };

  const renderItem = ({ item }) => {
    const isMe = item.senderId === user.id;
    return (
      <View style={[styles.bubble, isMe ? styles.rightBubble : styles.leftBubble]}>
        <Text style={[styles.bubbleText, isMe ? styles.rightBubbleText : styles.leftBubbleText]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, isMe ? styles.rightTimeText : styles.leftTimeText]}>
          {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#FF85A2" />
        </TouchableOpacity>

        {renderAvatar(otherUser)}

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{otherUser.name || otherUser.email}</Text>
          <Text style={styles.statusText}>Online now </Text>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#FF85A2" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={setText}
              placeholder="Type a sweet message..."
              placeholderTextColor="#D4A5B5"
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]} 
              onPress={send}
              disabled={!text.trim()}
            >
              <Ionicons name="send" size={20} color={text.trim() ? "#FFFFFF" : "#E8C4D0"} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  patternCircle1: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: '30%',
    left: '5%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 192, 203, 0.08)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  backButton: {
    padding: 6,
    marginRight: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFE4E9',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF69B4",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 13,
    color: "#D4A5B5",
    fontWeight: '500',
  },
  menuButton: {
    padding: 6,
  },
  messagesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 10,
  },
  bubble: {
    padding: 16,
    borderRadius: 24,
    marginVertical: 6,
    maxWidth: "80%",
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  leftBubble: {
    alignSelf: "flex-start",
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  rightBubble: { 
    alignSelf: "flex-end", 
    backgroundColor: "#FF85A2",
    borderBottomRightRadius: 8,
  },
  bubbleText: { 
    fontSize: 16,
    lineHeight: 22,
  },
  leftBubbleText: { 
    color: '#8A4B76',
  },
  rightBubbleText: { 
    color: '#FFFFFF',
  },
  timeText: { 
    fontSize: 11, 
    marginTop: 6,
    textAlign: "right",
  },
  leftTimeText: { 
    color: '#D4A5B5',
  },
  rightTimeText: { 
    color: 'rgba(255,255,255,0.8)',
  },
  inputContainer: {
    padding: 2,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FFE4E9',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  textInput: {
    flex: 1,
    color: '#8A4B76',
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  sendButton: {
    backgroundColor: '#FF85A2',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#FFE4E9',
  },
});