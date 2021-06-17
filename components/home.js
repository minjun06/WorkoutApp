import React, { useState } from "react";
import { Button, View, Text, TextInput, Image } from 'react-native';
import styles from '../stylesheet'

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
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

      {
        username &&  <Text> Hello, {username} </Text>
      }


    </View>
  );
};

export default HomeScreen
