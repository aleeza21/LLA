import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import supabase from '../supabase'; // Import the Supabase client

const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [quizType, setQuizType] = useState(null); // State to track the selected quiz type
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    // Fetch questions when component mounts if quizType is set
    if (quizType) {
      fetchQuestions();
    }
  }, [quizType]);

  const fetchQuestions = async () => {
    try {
      const { data: questions, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('type', quizType); // Fetch questions based on quizType

      if (error) {
        throw error;
      }

      setQuestions(questions);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      // Handle error
    }
  };

  const handleQuizTypeSelect = (type) => {
    setQuizType(type);
    setQuizStarted(true);
    setShowResult(false);
  };

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correct_option) {
        score++;
      }
    });
    setShowResult(true);
    Alert.alert('Quiz Result', `You scored ${score}/${questions.length}`);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setSelectedOptions({});
    setShowResult(false);
    navigation.navigate('Quiz');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz!</Text>
      {!quizStarted && !showResult && (
        <>
          <TouchableOpacity style={styles.quizTypeButton} onPress={() => handleQuizTypeSelect('easy')}>
            <Text style={styles.quizTypeButtonText}>Easy Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizTypeButton} onPress={() => handleQuizTypeSelect('medium')}>
            <Text style={styles.quizTypeButtonText}>Medium Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizTypeButton} onPress={() => handleQuizTypeSelect('hard')}>
            <Text style={styles.quizTypeButtonText}>Hard Quiz</Text>
          </TouchableOpacity>
        </>
      )}
      {quizStarted && !showResult && (
        <>
          {questions.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.question}>{question.question}</Text>
              <View style={styles.optionsContainer}>
                {[
                  question.option1,
                  question.option2,
                  question.option3,
                  question.option4,
                ].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      selectedOptions[question.id] === option && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(question.id, option)}
                    disabled={!!selectedOptions[question.id]}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.submitButton, { display: Object.keys(selectedOptions).length === questions.length ? 'flex' : 'none' }]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Result</Text>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeQuiz}>
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  quizTypeButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
  },
  quizTypeButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  optionsContainer: {},
  optionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  selectedOption: {
    backgroundColor: '#ffcc00',
    borderColor: '#ffcc00',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  retakeButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
