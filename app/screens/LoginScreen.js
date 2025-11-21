import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter both email and password.");
      return;
    }
    try {
      setLoading(true);
      await signIn({ email: email.trim(), password });

      // Go to UsersScreen after sign-in
      navigation.replace("Users");

    } catch (e) {
      Alert.alert("Login failed", e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.backgroundPattern}>
          <View style={styles.patternCircle1} />
          <View style={styles.patternCircle2} />
        </View>

        <View style={styles.header}>
          <Ionicons name="chatbubble-ellipses" size={80} color="#FF85A2" />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue chatting</Text>
        </View>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#D4A5B5"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#D4A5B5"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>
              {loading ? "Signing In..." : "Log In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>

          {/* Info Button */}
          <TouchableOpacity 
            style={styles.infoButton} 
            onPress={() => setShowInfoModal(true)}
          >
            <Ionicons name="information-circle" size={24} color="#FF85A2" />
            <Text style={styles.infoButtonText}>App Information</Text>
          </TouchableOpacity>
        </View>

        {/* Information Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showInfoModal}
          onRequestClose={() => setShowInfoModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowInfoModal(false)}
              >
                <Ionicons name="close" size={24} color="#8A4B76" />
              </TouchableOpacity>

              <Image
                source={require("../../assets/Avatar.jpg")}
                style={styles.modalAvatar}
              />
              
              <Text style={styles.modalTitle}>About the Developer</Text>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Author/Submitted by:</Text>
                <Text style={styles.infoValue}>Raechelle Anne B. Cajes</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Submitted to:</Text>
                <Text style={styles.infoValue}>Jay Ian Camelotes</Text>
              </View>

              <View style={styles.bioSection}>
                <Text style={styles.bioText}>
                  I am Raechelle Anne B. Cajes, a third-year student who's learning, growing, and finding my place with confidence. I carry my passion, curiosity, and quiet determination into everything I do, hoping to build a future that reflects both my dreams and my resilience.
                </Text>
              </View>

              <View style={styles.contactSection}>
                <Ionicons name="mail" size={16} color="#FF85A2" />
                <Text style={styles.contactText}>raechelleannecajes@gmail.com</Text>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
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
    top: '10%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 182, 193, 0.1)',
  },
  patternCircle2: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 192, 203, 0.08)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF69B4',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#D4A5B5',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 24,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  input: {
    backgroundColor: '#FFF5F7',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFE4E9',
    fontSize: 16,
    color: '#8A4B76',
  },
  loginButton: {
    backgroundColor: '#FF85A2',
    padding: 16,
    marginTop: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF85A2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#D4A5B5',
    fontSize: 16,
  },
  signUpBold: {
    color: '#FF85A2',
    fontWeight: '700',
  },
  // Info Button Styles
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FFF5F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  infoButtonText: {
    color: '#FF85A2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#FFE4E9',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  modalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFE4E9',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF69B4',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#D4A5B5',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#8A4B76',
    fontWeight: '600',
  },
  bioSection: {
    width: '100%',
    marginTop: 16,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFF5F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  bioText: {
    fontSize: 14,
    color: '#8A4B76',
    lineHeight: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF5F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  contactText: {
    fontSize: 14,
    color: '#FF85A2',
    fontWeight: '500',
    marginLeft: 6,
  },
});