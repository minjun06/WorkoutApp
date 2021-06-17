import React, {useState} from 'react';
import { Button, View, Text, TextInput, Image } from 'react-native';
import styles from '../stylesheet'

const InputScreen = ({ navigation }) => {
  return (
    <View style = {styles.center}>
      <Text style = {styles.regularText}>Record KG and Rep</Text>
      <Text> </Text>
      <OneSet setNum={1}/>
      <Text> </Text>
      <OneSet setNum={3}/>
      <Text> </Text>
      <OneSet setNum={5}/>
      <Text> </Text>
      <OneSet setNum={10}/>
    </View>
  );
}

const OneSet = ( props ) => {
  const [kg, setKg] = useState(0);
  const [rep, setRep] = useState(0);

  return (
    <View style = {styles.center}>
      <Text style={styles.header}>
        Set:  {props.setNum}
      </Text>
        <View style = {styles.rowContainer}>
          <TextInput
            style={styles.myTextInput}
            placeholder="#"
            onChangeText={setKg}
          />
          <Text>KG</Text>
          <TextInput
            style={styles.myTextInput}
            placeholder="#"
            onChangeText={setRep}
          />
          <Text>Rep</Text>
          <Text> Total Volume: {kg*rep*props.setNum} </Text>
        </View>
    </View>
  );
}


export default InputScreen
