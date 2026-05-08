import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ onLoginPress, onMenuPress }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>
        ReUse
        <Text style={styles.spin}></Text> 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  spin: {
    fontSize: 28,
  },
});