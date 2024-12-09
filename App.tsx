import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { useColorScheme } from 'react-native';
import DetailsScreen from './src/screens/DetailsScreen'; // @ts-ignore
import DubaiToursScreen from './src/screens/DubaiToursScreen'; // @ts-ignore
import { LightTheme, DarkThemes } from './src/assets/colors/themes';

const Stack = createNativeStackNavigator();

function App() {



  // const handleHideSplashScreen = () => {
  //   SplashScreen.hide(); 
  // };
  useEffect(() => {
    // Show splash screen initially
    const timer = setTimeout(() => {
      console.log("SplashScreen hidden",SplashScreen);
      SplashScreen.hide(); // Hide splash screen after 2 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkThemes : LightTheme}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          animation: 'slide_from_right', // Apply animation globally
        }}
      >
        <Stack.Screen
          name="Home"
          component={DubaiToursScreen}
          options={{
            headerShown: false,
          }}
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
}

export default App;
