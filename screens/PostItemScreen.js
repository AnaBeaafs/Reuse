import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../contexts/AuthContext';

export default function PostItemScreen() {
  const { user } = useContext(AuthContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState('back'); // ← Correção aqui
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Roupas');

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        setPhoto(data.uri);
        setShowCamera(false);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível tirar a foto');
      }
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!title || !price || !photo) {
      Alert.alert('Atenção', 'Preencha o título, preço e adicione uma foto!');
      return;
    }

    Alert.alert(
      ' Item Publicado com Sucesso!',
      `${title}\n\nVocê ganhou +300 pontos pela postagem! `,
      [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setPrice('');
            setDescription('');
            setPhoto(null);
          },
        },
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>Sem acesso à câmera. Verifique as permissões.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Postar Novo Item</Text>

      {photo ? (
        <View style={styles.photoContainer}>
          <Image source={{ uri: photo }} style={styles.photoPreview} />
          <TouchableOpacity style={styles.changePhoto} onPress={() => setPhoto(null)}>
            <Ionicons name="close-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.photoPlaceholder}>
          <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <Ionicons name="camera-outline" size={50} color={COLORS.primary} />
            <Text style={styles.cameraButtonText}>Abrir Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton} onPress={pickFromGallery}>
            <Ionicons name="image-outline" size={28} color={COLORS.primary} />
            <Text style={styles.galleryText}>Escolher da Galeria</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>Título do Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Jaqueta Jeans Oversized"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 85.00"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o estado, tamanho, marca, etc..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Publicar Item </Text>
        </TouchableOpacity>
      </View>

      {showCamera && (
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.closeCamera} onPress={() => setShowCamera(false)}>
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
            >
              <Ionicons name="camera-reverse" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.primaryDark, textAlign: 'center', marginBottom: 20 },
  photoContainer: { position: 'relative', alignItems: 'center', marginBottom: 20 },
  photoPreview: { width: '100%', height: 280, borderRadius: 20 },
  changePhoto: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: 4 },
  photoPlaceholder: { height: 280, backgroundColor: '#f8f8f8', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.border, marginBottom: 20 },
  cameraButton: { alignItems: 'center' },
  cameraButtonText: { marginTop: 12, fontSize: 16, color: COLORS.primary, fontWeight: '600' },
  galleryButton: { marginTop: 20, flexDirection: 'row', alignItems: 'center' },
  galleryText: { marginLeft: 8, color: COLORS.primary },
  form: { marginTop: 10 },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.text, marginTop: 16, marginBottom: 6 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORS.border, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  postButton: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 30, alignItems: 'center', marginTop: 30 },
  postButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  camera: { flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
  cameraControls: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: 40 },
  captureButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 55, height: 55, borderRadius: 30, backgroundColor: '#ff4757' },
  closeCamera: { position: 'absolute', top: 50, left: 20 },
  flipButton: { position: 'absolute', top: 50, right: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});