import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DubaiToursScreen from './src/screens/DubaiToursScreen'; // @ts-ignore
import DetailsScreen from './src/screens/DetailsScreen'; // @ts-ignore

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Control splash visibility
  useEffect(() => {
    // Hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Set your desired splash screen duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('./src/assets/Images/splash_screen.png')} // Update with your image
          style={[styles.fullScreenImage, ]}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'slide_from_right', // Apply animation globally
        }}
      >
        <Stack.Screen
          name="Home"
          component={DubaiToursScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            animation: 'slide_from_bottom', // Specific animation for this screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background color to match the splash screen
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust to fit the screen
  },
});

export default App;
