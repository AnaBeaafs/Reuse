import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import Header from '../components/Header';
import CategoryChip from '../components/CategoryChip';
import ItemCard from '../components/ItemCard';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const categories = ['Roupas', 'Beleza', 'Eletrônicos', 'Livros', 'Móveis', 'Decoração', 'Esportes', 'Acessórios'];

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -60],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    loadCachedItems();
    fetchItemsFromAPI();
  }, []);

  const loadCachedItems = async () => {
    try {
      const cached = await AsyncStorage.getItem('@ReUse:items');
      if (cached) setItems(JSON.parse(cached));
    } catch (e) {}
  };

  const fetchItemsFromAPI = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=15');
      const data = await res.json();

      const mappedItems = data.map((item, index) => ({
        id: item.id.toString(),
        title: item.title.length > 35 ? item.title.substring(0, 35) + '...' : item.title,
        price: item.price,
        location: 'Campinas, SP',
        image: item.image || `https://picsum.photos/id/${100 + index}/400/300`,
      }));

      setItems(mappedItems);
      await AsyncStorage.setItem('@ReUse:items', JSON.stringify(mappedItems));
    } catch (error) {
      console.log('Erro ao buscar API:', error);
      Alert.alert('Aviso', 'Usando itens locais (cache)');
    }
    setLoading(false);
  };

  const handleFavorite = (item) => {
    Alert.alert('Favoritado!', `Você ganhou +20 pontos por favoritar ${item.title.substring(0, 20)}...`);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: headerTranslate }] }]}>
        <Header
          onLoginPress={() => {}}
          onMenuPress={() => Alert.alert('Menu', 'Em breve')}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Troque. Reutilize. Cuide do planeta.</Text>
          <Text style={styles.bannerSubtitle}>
            Bem-vindo, {user?.name?.split(' ')[0] || 'Usuário'}! 
          </Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Saiba mais sobre sustentabilidade</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="O que você quer trocar hoje?"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <CategoryChip key={cat} label={cat} onPress={() => Alert.alert('Filtro', `Filtrar por ${cat}`)} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Itens em Destaque</Text>
          {loading ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando itens...</Text>
          ) : (
            <FlatList
              data={items}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={{ width: 240, marginRight: 16 }}>
                  <ItemCard item={item} onFavorite={() => handleFavorite(item)} />
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.quizSection}>
          <Text style={styles.quizTitle}>Você sabe o impacto da reutilização?</Text>
          <Text style={styles.quizText}>Responda rápido e descubra!</Text>
          <TouchableOpacity style={styles.quizButton}>
            <Text style={styles.quizButtonText}>Fazer quiz rápido</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  banner: {
    marginTop: 140,
    marginHorizontal: 20,
    padding: 28,
    backgroundColor: COLORS.primary + '15',
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  bannerButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  bannerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text },
  categoriesContainer: { paddingHorizontal: 16, marginBottom: 16 },
  categorySection: { marginBottom: 32, paddingHorizontal: 16 },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  quizSection: {
    margin: 20,
    padding: 28,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  quizText: {
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  quizButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});