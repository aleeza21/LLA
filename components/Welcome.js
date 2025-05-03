import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('../assets/Splashs.png')}
            style={styles.backgroundImage}
          />
        </View>
        <Pressable onPress={() => navigation.navigate("signIn")} style={styles.startLearningButton}>
          <Text style={styles.startLearningButtonText}>Start Learning</Text>
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background color
  },
  imageContainer: {
    flex: 1, // Take up the entire space
    position: 'relative', // Make the container relative for absolute positioning
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Resize mode
    bottom: 49,
  },
  startLearningButton: {
    position: 'absolute', // Position the button absolutely
    bottom: 50, // Adjust the bottom position to create a gap
    alignSelf: 'center', // Center the button horizontally
    backgroundColor: '#0B47DD', // Darker blue background color with opacity
    borderRadius: 20, // Round the corners
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
  },
  startLearningButtonText: {
    color: '#ffffff', // White text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center align the text
  },
});

export default WelcomeScreen;
