import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ColorChangerApp from 'ColorChangerApp';
import CounterApp from 'CounterApp';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🚀 My Combined App</Text>

      <View style={styles.section}>
        <CounterApp />
      </View>

      <View style={styles.section}>
        <ColorChangerApp />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',  // centers vertically
    alignItems: 'center',      // centers horizontally
    backgroundColor: '#f3e5f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6a1b9a',
  },
  section: {
    width: '90%',
    marginBottom: 20,
  },
});
  