import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';  // Імпортуємо useNavigation

const ProfileScreen = () => {
  const [user, setUser] = useState<any>(null);  // Стан для даних користувача
  const navigation = useNavigation();  // Отримуємо доступ до навігації

  useEffect(() => {
    fetchUser();  // Завантаження даних користувача при першому рендері
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users/1');  // Отримуємо дані про користувача з API
      setUser(response.data.data);  // Зберігаємо отримані дані користувача
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    if (navigation && navigation.replace) {
      navigation.replace('Login');  // Перехід на екран логіну після виходу
    } else {
      console.error('Navigation not available');
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;  // Відображаємо "Loading..." поки отримуємо дані
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
