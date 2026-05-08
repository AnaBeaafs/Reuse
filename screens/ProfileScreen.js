// screens/ProfileScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../contexts/AuthContext';
import { COLORS } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import PointsAnimation from '../components/PointsAnimation';

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [showPoints, setShowPoints] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateProfile({ avatar: result.assets[0].uri });
    }
  };

  const saveProfile = () => {
    updateProfile({ name });
    Alert.alert('Sucesso', 'Perfil atualizado!');
  };

  const earnPointsDemo = () => {
    const earned = 150;
    const newPoints = (user?.points || 0) + earned;
    updateProfile({ points: newPoints });
    setPointsEarned(earned);
    setShowPoints(true);
    setTimeout(() => setShowPoints(false), 1800);
  };

  const handleLogout = () => {
    Alert.alert(
      'Deseja sair?',
      'Você será redirecionado para a tela de login.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true);
            await logout();           // Isso vai limpar o user e ativar loading global
            setIsLoggingOut(false);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image 
            source={{ uri: user?.avatar || 'https://picsum.photos/id/64/300/300' }} 
            style={styles.avatar} 
          />
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.points || 0}</Text>
            <Text style={styles.statLabel}>Pontos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>Nv.{user?.level || 1}</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.streak || 0}</Text>
            <Text style={styles.statLabel}>Streak 🔥</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.demoButton} onPress={earnPointsDemo}>
          <Text style={styles.demoText}>+150 Pontos (Demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#E53E3E" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={24} color="#E53E3E" />
              <Text style={styles.logoutText}>Sair da Conta</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {showPoints && <PointsAnimation points={pointsEarned} onFinish={() => setShowPoints(false)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, alignItems: 'center', paddingBottom: 120 },
  avatarContainer: { marginTop: 60, position: 'relative' },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 5, borderColor: COLORS.primary },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.primary, padding: 8, borderRadius: 20 },
  nameInput: { marginTop: 30, fontSize: 22, fontWeight: '600', textAlign: 'center', borderBottomWidth: 2, borderColor: COLORS.primary + '40', width: '80%', paddingBottom: 8 },
  saveButton: { marginTop: 20, backgroundColor: COLORS.primary, paddingVertical: 14, paddingHorizontal: 50, borderRadius: 30 },
  saveText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  stats: { flexDirection: 'row', marginTop: 50, justifyContent: 'space-around', width: '100%' },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 26, fontWeight: 'bold', color: COLORS.primaryDark },
  statLabel: { color: COLORS.textLight, marginTop: 6, fontSize: 14 },
  demoButton: { marginTop: 50, backgroundColor: COLORS.accentPoints, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, width: '90%' },
  demoText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
  logoutButton: { 
    marginTop: 80, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF0F0', 
    paddingVertical: 16, 
    paddingHorizontal: 40, 
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FED7D7'
  },
  logoutText: { 
    color: '#E53E3E', 
    fontWeight: '600', 
    fontSize: 16, 
    marginLeft: 10 
  },
});