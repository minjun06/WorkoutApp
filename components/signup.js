import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const SignUpScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(' ');

  const storeData = async (username, password) => {
        try {
          const jsonValue = await AsyncStorage.getItem('signup_list')
          let data = null
          if(jsonValue != null) {
            data = JSON.parse(jsonValue)
            data.push({username: username, password: password})
            await AsyncStorage.setItem('signup_list', JSON.stringify(data))
          } else {
            console.log('json value error')

          }
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const isUsernameValidation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('signup_list')
      let data = null
      if(jsonValue != null) {
        data = JSON.parse(jsonValue)
        for(let i = 0; i < data.length; i++) {
          if(data[i].username === username) {
            return false
          }
        }
        return true
      } else {
        console.log('json value error')
        return false
      }

    } catch(e) {
        console.log("error in isUsernameValidation ")
    }
  }

  return (
    <View style = {signupStyles.screenContainer}>
      <Text style = {signupStyles.welcomeTitle}>Hi!</Text>
      <Text style = {signupStyles.welcomeText}>Create a new account</Text>
      <View style={signupStyles.subContainer} >
        <TextInput
          style={signupStyles.myTextInput}
          placeholder="UserName"
          onChangeText={setUsername}
        />
        <TextInput
          style={signupStyles.myTextInput}
          placeholder="PassWord"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Text style={signupStyles.alert}>{result}</Text>
          <TouchableOpacity 
            style={signupStyles.signupBtn}
            onPress={() => {
              isUsernameValidation().then((success) => {
                if(success) {
                  storeData(username, password)
                  navigation.goBack()
                } else {
                  // Show username is not validate
                  setResult('username already exist')
                }

              })
            }}
            >
            <Text
              style={signupStyles.signupBtnText}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  );
}


const signupStyles = StyleSheet.create({
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
  signupBtn: {
    marginTop: 20,
    width: "100%",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#484BF4',
    borderRadius: 5,
  },
  signupBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
})

export default SignUpScreen
