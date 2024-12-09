import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FeedScreen = () => {
  const [photos, setPhotos] = useState<any[]>([]);  // Стан для картинок
  const [loading, setLoading] = useState<boolean>(false);  // Стан завантаження
  const [page, setPage] = useState<number>(1); // Сторінка для infinite scroll

  useEffect(() => {
    fetchPhotos(page);  // Завантаження картинок при першому рендері
  }, [page]);

  const fetchPhotos = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${pageNumber}&limit=30`); // Отримуємо картинки з API
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]); // Додавання нових карток
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false); // Оновлюємо стан завантаження
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.download_url }} style={styles.image} />
    </View>
  );

  const loadMorePhotos = () => {
    if (!loading) {
      setPage(page + 1); // Збільшуємо сторінку для довантаження карток
    }
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={photos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMorePhotos} // Довантажуємо нові картинки при прокручуванні
          onEndReachedThreshold={0.5} // Коли наближаємось до кінця списку
          ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null} // Покажчик завантаження при довантаженні
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default FeedScreen;
