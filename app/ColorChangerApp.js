import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ColorChangerApp() {
  const [bgColor, setBgColor] = useState('#fff');

  const colors = ['#ff8a80', '#ff80ab', '#b388ff', '#8c9eff', '#80d8ff', '#a7ffeb', '#ccff90', '#ffff8d'];

  const changeColor = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(random);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.title}>🎨 Color Changer App</Text>
      <Button title="✨ Change Color" onPress={changeColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4a148c',
    textAlign: 'center',
  },
});