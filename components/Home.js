import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabase'; // Import the Supabase client

const HomeScreen = () => {
  const navigation = useNavigation();
  const [lessonContent, setLessonContent] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(1); // Initially selected lesson is 1

  useEffect(() => {
    fetchLessonContent(selectedLesson);
  }, [selectedLesson]);

  const fetchLessonContent = async (lessonNo) => {
    try {
      console.log('Selected Lesson:', lessonNo); // Log the selected lesson number

      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('lesson_no', lessonNo); // Fetch data for the selected lesson number

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setLessonContent(data);
      } else {
        console.log("No content found for lesson ${lessonNo}.");
        setLessonContent(null);
      }
    } catch (error) {
      console.error('Error fetching lesson content:', error.message);
      setLessonContent(null);
    }
  };

  const handleLessonButtonPress = (lessonNo) => {
    setSelectedLesson(lessonNo);
  };

  const handleQuizTabPress = () => { 
    navigation.navigate('Quiz', { email, username });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>Let's Learn</Text>
      </View>
      <View style={styles.learningsHeader}>
        <Text style={styles.learningsHeaderText}>Your Learnings</Text>
      </View>
      <View style={styles.lessonContainer}>
        <LessonBlock selectedLesson={selectedLesson} onPress={handleLessonButtonPress} />
      </View>
      {/* Render LessonContent component when lessonContent is not null */}
      {lessonContent && (
        <View style={styles.lessonContent}>
          {lessonContent.map((item, index) => (
            <View key={index} style={styles.lessonContentItem}>
              <Text>Word: {item.word}</Text>
              <Text>Meaning: {item.meaning}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.bottomTabsContainer} onPress={handleQuizTabPress}>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Quiz</Text>
        </View> 
      </TouchableOpacity>
    </View>
  );
};

HomeScreen.navigationOptions = {
  headerTitle: null, // Hide the header title
};

const LessonBlock = ({ selectedLesson, onPress }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {[...Array(20).keys()].map((lessonNo) => (
        <TouchableOpacity
          key={lessonNo}
          style={[styles.lessonButton, selectedLesson === lessonNo + 1 && styles.selectedLessonButton]}
          onPress={() => onPress(lessonNo + 1)}
        >
          <Text style={[styles.lessonButtonText, selectedLesson === lessonNo + 1 && styles.selectedLessonButtonText]}>
            Lesson {lessonNo + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
  },
  learningsHeader: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  learningsHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  lessonContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  lessonButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#007bff',
    marginHorizontal: 5,
  },
  selectedLessonButton: {
    backgroundColor: '#ffcc00',
  },
  lessonButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  selectedLessonButtonText: {
    color: '#333333',
  },
  lessonContent: {
    paddingHorizontal: 20,
  },
  lessonContentItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default HomeScreen;
