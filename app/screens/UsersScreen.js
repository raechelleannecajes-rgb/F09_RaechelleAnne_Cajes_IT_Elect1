import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { getAllUsers } from "../../db/db";
import { Ionicons } from "@expo/vector-icons";

export default function UsersScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      loadUsers();
    });
    loadUsers();
    return unsub;
  }, [navigation]);

  const loadUsers = async () => {
    try {
      const list = await getAllUsers(user?.id || null);
      setUsers(list);
    } catch (e) {
      Alert.alert("Error", "Could not load users");
    }
  };

  const handleSignOut = () => {
    signOut();
    navigation.replace("Login");
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

  // Function to render avatar - uses image for specific email, initials for others
  const renderAvatar = (item) => {
    const specificEmail = "raechelleannecajes@gmail.com";
    
    if (item.email === specificEmail) {
      // Use Avatar.jpg for the specific email
      return (
        <Image
          source={require("../../assets/Avatar.jpg")}
          style={styles.avatarImage}
        />
      );
    } else {
      // Use initials avatar for other users
      const initials = getInitials(item.name, item.email);
      const avatarColor = getAvatarColor(item.name || item.email);
      
      return (
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => navigation.navigate("Chat", { otherUser: item })}
      >
        {renderAvatar(item)}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name || item.email.split("@")[0]}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#FF85A2" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern}>
        <View style={styles.patternCircle1} />
        <View style={styles.patternCircle2} />
      </View>

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.userNameText}>
              {user?.name || user?.email?.split("@")[0]}
            </Text>
          </View>
          <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Your Friends </Text>
        
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={64} color="#FFB6C1" />
              <Text style={styles.emptyText}>No friends yet</Text>
              <Text style={styles.emptySubtext}>
                Start chatting with people around you!
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFF5F7" 
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
    top: '15%',
    right: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: '20%',
    left: '8%',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 192, 203, 0.08)',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 16,
    color: '#D4A5B5',
    fontWeight: '500',
    marginBottom: 2,
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF69B4',
  },
  logoutButton: {
    backgroundColor: '#FF85A2',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF69B4',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFE4E9',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A4B76',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#D4A5B5',
  },
  separator: {
    height: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF85A2',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#D4A5B5',
    textAlign: 'center',
  },
});