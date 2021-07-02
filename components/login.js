import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(' ');

  const storeData = async (value) => {
        try {
          //const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('login', value)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const isLoginValidation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('signup_list')
      let data = null
      if(jsonValue != null) {
        data = JSON.parse(jsonValue)
        for(let i = 0; i < data.length; i++) {
          if(data[i].username === username && data[i].password === password) {
            return true
          }
        }
        return false
      } else {
        console.log('json value error')
        return false
      }

    } catch(e) {
        console.log("error in isUsernameValidation ")
    }
  }

  return (
    <View style = {loginStyles.screenContainer}>
      <Text style = {loginStyles.welcomeTitle}>Welcome!</Text>
      <Text style = {loginStyles.welcomeText}>Sign In to Continue</Text>
      <View style={loginStyles.subContainer} >
        <TextInput
          style={loginStyles.myTextInput}
          placeholder="username"
          onChangeText={setUsername}
        />
        <TextInput
          style={loginStyles.myTextInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <Text style={loginStyles.alert}>{result}</Text>

        <TouchableOpacity 
          style={loginStyles.loginBtn}
          onPress={() => {
              isLoginValidation().then((success) => {
                if(success) {
                  const onSetUsername = route.params.onSetUsername
                  onSetUsername(username)
                  storeData(username)
                  navigation.goBack()
                } else {
                  setResult('username or password is wrong')
                }

              })
          }}
          >
          <Text
            style={loginStyles.loginBtnText}
          >
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text 
            style={loginStyles.signUpBtn}
            onPress={() => 
              {
                navigation.navigate('SignUp')
              }
            }
            >Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: "12%",
    paddingVertical: "15%",
  },
  welcomeTitle: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "700",
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "500",
    color: 'grey',
  },
  subContainer: {
    width: "100%",
    marginTop: 60,
    alignItems: "center",
  },
  myTextInput: {
    marginTop: 20,
    width: "100%",
    height: 45,
    borderWidth: 2,
    borderColor: '#91B3F9',
    borderRadius: 5,
  },
  alert: {
    marginTop: 10,
    color: '#e33232',
  },
  loginBtn: {
    marginTop: 20,
    width: "100%",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#484BF4',
    borderRadius: 5,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  signUpBtn: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "600",
    color: '#484BF4',
  },
})

export default LoginScreen
