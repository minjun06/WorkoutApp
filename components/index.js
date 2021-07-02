import React from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet } from 'react-native';
import styles from '../stylesheet'
import IndexItem from './indexItem'

const IndexScreen = ({ navigation, route }) => {
  return (
    <View style = {homeStyles.screenContainer}>
        <Text style={homeStyles.title}>Select Your Workout</Text>
        <Text style={homeStyles.subTitle}>Please choose your workout</Text>
        <View style = {homeStyles.rowContainer}>
        <IndexItem 
          imagePath={require('../assets/workout/bench-press.png')} 
          name={"Bench Press"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Bench Press'})
          }
          />

        <IndexItem 
          imagePath={require('../assets/workout/dead-lift.png')} 
          name={"Dead Lift"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Dead Lift'})
          }
          />
        </View>

        <View style = {homeStyles.rowContainer}>
        <IndexItem 
          imagePath={require('../assets/workout/squat.png')} 
          name={"Squat"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Squat'})
          }
          />

        <IndexItem 
          imagePath={require('../assets/workout/lunge.png')} 
          name={"Lunge"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Lunge'})
          }
          />
        </View>

        <View style = {homeStyles.rowContainer}>
        <IndexItem 
          imagePath={require('../assets/workout/shoulder-press.png')} 
          name={"Shoulder Press"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Shoulder Press'})
          }
          />

        <IndexItem 
          imagePath={require('../assets/workout/arm-row.png')} 
          name={"Arm Row"}
          onPress={() => 
              navigation.navigate('Input', {name: 'Arm Row'})
          }
          />
        </View>


    </View>
  );
}


const homeStyles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: "6%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
    marginBottom: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
})

export default IndexScreen
