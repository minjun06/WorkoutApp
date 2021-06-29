import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const storeData = async (value) => {
        try {
          //const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('login', value)
          console.log('just stored '+value)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
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
            onChangeText={setPassword}
          />
      <Button
        title="Log In"
        onPress={() =>
          {
            const onSetUsername = route.params.onSetUsername
            onSetUsername(username)
            storeData(username)
            navigation.goBack()
          }
        }
      />
    </View>
  );
}

export default LoginScreen
