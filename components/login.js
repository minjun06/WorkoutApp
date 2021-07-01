import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

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
    <View style = {styles.center}>
      <Text style = {styles.regularText}>Enter User name and Password</Text>
          <TextInput
            style={styles.myTextInput}
            placeholder="UserName"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.myTextInput}
            placeholder="PassWord"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
      <Button
        title="Log In"
        onPress={() =>
          {
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
          }
        }
      />
      <Text style={styles.alert}>{result}</Text>
      <TouchableOpacity>
        <Text 
          style={styles.signUpBtn}
          onPress={() => 
            {
              navigation.navigate('SignUp')
            }
          }
          >Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen
