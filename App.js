import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import WelcomeScreen from './components/Welcome';
import SignInScreen from './components/signIn';
import SignUpScreen from './components/signUp';
import HomeScreen from './components/Home';
import QuizScreen from './components/Quiz';
import ProfileScreen from './components/Profile';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreens = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Quiz') {
          iconName = focused ? 'question-circle' : 'question-circle';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'user' : 'user';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Quiz" component={QuizScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ title: ' ' }}/>
        <AuthStack.Screen name="signIn" component={SignInScreen} options={{ title: 'Login' }} /> 
        <AuthStack.Screen name="signUp" component={SignUpScreen} options={{ title: 'SignIn' }}/>
        <AuthStack.Screen name="Main" component={MainScreens} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
