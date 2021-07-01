import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheet'

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  useEffect(() => {getData()}, [])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const value = await AsyncStorage.getItem('login')
          if (value!=null) {
            setUsername(value)
            console.log('value exist')
          } else {
            console.log('value does not exist')

          }

          // Initialize signup_list
          const signup_list = await AsyncStorage.getItem('signup_list')
          if (signup_list===null) {
            await AsyncStorage.setItem('signup_list', JSON.stringify([]))
          }



        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
          // error reading value
        }
  }

  return (
    <View>
      <Button
        title="Select Workout"
        onPress={() =>
          navigation.navigate('Index')
        }
      />

      <Button
        title="Log In"
        onPress={() =>
          navigation.navigate('Login', {onSetUsername: setUsername})
        }
      />

      <Text> </Text>
      <Text style = {{textAlign: 'center', fontSize: 20}}>
        {
          username &&  <Text> Hello, {username} </Text>
        }
      </Text>

    </View>
  );
};

export default HomeScreen
