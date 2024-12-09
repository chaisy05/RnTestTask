// src/screens/MainScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const MainScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // викликає action logout для виходу
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Main Screen!</Text>
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MainScreen;
