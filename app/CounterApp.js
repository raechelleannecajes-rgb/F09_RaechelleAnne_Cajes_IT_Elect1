import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔢 Counter App</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="➕ Increase" onPress={() => setCount(count + 1)} />
        <Button title="➖ Decrease" onPress={() => setCount(count - 1)} />
        <Button title="🔄 Reset" onPress={() => setCount(0)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1565c0',
    textAlign: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
    marginVertical: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});