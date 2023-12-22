import React, { useContext, useState} from "react";
import { AuthContext } from "../provider/auth";
import { useNavigation } from '@react-navigation/native';
import { Layout, Button} from "@ui-kitten/components";
import { Text, View, TextInput, StyleSheet } from 'react-native';
import {
  BASE_URI
} from "../data/constants";

const LoginScreen = () => {
  const { isAuthenticated, promptAsync, request } = useContext(AuthContext);
  
    const navigation = useNavigation(); // Use the useNavigation hook to get the navigation object
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handleUsernameChange = (text) => {
      setUsername(text);
    };
  
    const handlePasswordChange = (text) => {
      setPassword(text);
    };
  
    const handleEmailChange = (text) => {
      setEmail(text);
    };
  
    const handleSubmit = () => {
      // You can perform form validation and submission logic here
      // navigation.navigate('Home'); // Navigate to the home screen or another screen as needed
      const data = {
          username: username,
          password: password,
          email: email,
      };
  // API_URL' with your actual API endpoint
  const apiUrl = `${BASE_URI}/api/method/ce_customization.ce_customization.doctype.pd_vendor_signup.api.create_record`;
  
  // Make the API call using fetch
  fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then(response => response.json())
      .then(responseData => {
          console.log('API Response:', responseData);
          // Handle the response as needed
      })
      .catch(error => {
          console.error('Error:', error);
          // Handle the error as needed
      });
  
      // Rest of your code...
    };

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        rowGap: 20,
      }}
    >
      

      <View style={{ marginHorizontal: 50, marginVertical: 50 }}>
        <Text style={{ marginHorizontal: 50, marginVertical: 50, color: 'white' }}>Signup</Text>
        <View>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={handleUsernameChange}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
          />
          <Button onPress={handleSubmit}> Submit </Button>
          {!isAuthenticated && (
        <Button 
        style={styles.seperator} 
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          Login with Frappe
        </Button>
      )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 6,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  seperator: {
 marginTop:10,
  }
});


export default LoginScreen;
