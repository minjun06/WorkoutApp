import React from 'react';
import { Button, View, Text, TextInput, Image } from 'react-native';
import styles from '../stylesheet'

const IndexScreen = ({ navigation, route }) => {
  return (
    <View style = {styles.center}>
      <Text style = {styles.titleText}>Select Workout</Text>


        <View style = {styles.rowContainer}>
          <Button style = {styles.buttonText}
            title="Bench Press"
            color="#87CEEB"
            onPress={() =>
              navigation.navigate('Input', {name: 'benchPress'})
            }
          />
          <Image
            source={{uri: "https://image.shutterstock.com/image-illustration/closegrip-barbell-bench-press-3d-260nw-430936051.jpg"}}
            style={{width: 400, height: 200}}
          />
        </View>

        <View style = {styles.rowContainer}>
          <Button style = {styles.buttonText}
            title="Dead Lift"
            color="#87CEEB"
            onPress={() =>
              navigation.navigate('Input', {name: 'deadLift'})
            }
          />
          <Image
            source={{uri: "https://i1.wp.com/physicalculturestudy.com/wp-content/uploads/2016/01/romaniandeadlift1.jpg?resize=563%2C331&ssl=1"}}
            style={{width: 400, height: 200}}
          />
        </View>

        <View style = {styles.rowContainer}>
          <Button style = {styles.buttonText}
            title="Squat"
            color="#87CEEB"
            onPress={() =>
              navigation.navigate('Input', {name: 'squat'})
            }
          />
          <Image
            source={{uri: "https://png.pngitem.com/pimgs/s/281-2810409_body-weight-squat-anatomy-png-download-bodyweight-squat.png"}}
            style={{width: 400, height: 200}}
          />
        </View>

    </View>
  );
}

export default IndexScreen
