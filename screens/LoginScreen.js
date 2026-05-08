// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { COLORS } from '../constants/colors';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor preencha email e senha');
      return;
    }

    setLoading(true);
    const success = await login(email, password);

    if (success) {
      // navigation.replace não é mais necessário aqui (o App.js cuida disso)
    } else {
      Alert.alert('Erro', 'Falha ao fazer login');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>ReUse</Text>
        <Text style={styles.subtitle}>Troque. Reutilize. Conecte-se.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Entrar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', paddingHorizontal: 24 },
  logoContainer: { alignItems: 'center', marginBottom: 60 },
  logo: { fontSize: 52, fontWeight: '700', color: COLORS.primaryDark },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 8 },
  form: { width: '100%' },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginBottom: 6, marginTop: 16 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 16, fontSize: 16, borderWidth: 1, borderColor: COLORS.border },
  loginButton: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 40 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});