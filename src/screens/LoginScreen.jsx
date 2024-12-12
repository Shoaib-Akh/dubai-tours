import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between signup and login

  const handleAuthAction = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignUp) {
      // Sign up user
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Success', 'User account created & signed in!');
        })
        .catch(error => {
          console.log(error);
          let errorMessage = 'Something went wrong. Please try again.';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email address is already in use.';
          } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'This email address is invalid.';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password should be at least 6 characters.';
          }
          Alert.alert('Error', errorMessage);
        });
    } else {
      // Log in user
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Success', 'Logged in successfully!');
        })
        .catch(error => {
          console.log(error);
          let errorMessage = 'Something went wrong. Please try again.';
          if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with this email.';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password.';
          }
          Alert.alert('Error', errorMessage);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
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
      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuthAction} />
      <Text
        style={styles.toggleText}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
