import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function PointsAnimation({ points, onFinish }) {
  const translateY = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -100,
        duration: 1400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
    });
  }, [points]);

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.points}>+{points} pts</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    backgroundColor: COLORS.accentPoints,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  points: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});