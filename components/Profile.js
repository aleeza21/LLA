import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.blueBar}></View>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.learningText}>You are learning English language.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  blueBar: {
    position: 'absolute',
    backgroundColor: '#4A90E2',
    width: 50,
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  learningText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default ProfileScreen;
