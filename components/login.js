import React, { useState } from "react";
import { Button, View, Text, TextInput, Image } from 'react-native';
import styles from '../stylesheet'

const LoginScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            navigation.goBack()
          }
        }
      />
    </View>
  );
}

export default LoginScreen
