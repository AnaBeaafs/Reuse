import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CategoryChip({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  chipText: {
    color: COLORS.primaryDark,
    fontWeight: '600',
    fontSize: 15,
  },
});