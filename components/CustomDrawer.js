import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>ReUse</Text>
        <Text style={styles.subtitle}>Economia circular</Text>
      </View>

      <View style={styles.menuItems}>
        
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Home')}
        />

        <DrawerItem
          label="Nova Troca"
          icon={({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          )}
          onPress={() => props.navigation.navigate('Nova Troca')}
        />

      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Sustentabilidade</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#C8E6C9',
    marginTop: 4,
  },
  menuItems: {
    marginTop: 10,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
  },
  footerText: {
    color: 'gray',
    fontSize: 14,
  },
});