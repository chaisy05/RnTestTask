import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Імпортуємо useNavigation

const LoginScreen = () => {
  const [email, setEmail] = useState<string>(''); // Стан для email
  const [password, setPassword] = useState<string>(''); // Стан для пароля
  const [error, setError] = useState<string>(''); // Стан для помилки
  const [isLoading, setIsLoading] = useState<boolean>(false); // Стан завантаження

  const navigation = useNavigation(); // Отримуємо доступ до навігації

  const handleLogin = () => {
    // Очистка помилок перед кожною спробою входу
    setError('');

    // Перевірка email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Перевірка пароля
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    // Тут можна додати логіку для авторизації, наприклад, API запит.
    // Якщо авторизація успішна, виконуємо навігацію до головної сторінки:
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful!');
      // Перехід до головної сторінки після успішної авторизації
      navigation.replace('Main'); // Використовуємо replace для заміни екрану
    }, 1500); // Імітуємо затримку для демонстрації
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading} // Діє, коли є процес входу
      />
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
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
