import { SafeAreaView, StatusBar } from "react-native";
import MessengerAndCommentApp from "./screens/MessengerAndCommentApp";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <MessengerAndCommentApp />
    </SafeAreaView>
  );
}
