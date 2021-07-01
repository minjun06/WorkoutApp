import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const SignUpScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

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
        title="Sign Up"
        onPress={() =>
          {
            isUsernameValidation().then((success) => {
              if(success) {
                storeData(username, password)
                navigation.goBack()
              } else {
                // Show username is not validate
                setResult('username already exist')
              }

            })
          }
        }
      />
      <Text style={styles.alert}>{result}</Text>
    </View>
  );
}

export default SignUpScreen
