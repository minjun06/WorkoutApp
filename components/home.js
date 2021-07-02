import React, { useState, useEffect} from "react";
import { Button, View, Text, TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native';
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
    <View style={homeStyles.screenContainer}>
      <Image source={require('../assets/banner-min.jpg')} style={homeStyles.bannerImg} />
      <View style={homeStyles.btnContainer}>
        <Text style={homeStyles.helloTitle}>
          Hello
          {
            username && ' ' + username 
          }
          !
        </Text>
        <Text style={homeStyles.helloText}>
          Start your today's workout right now
        </Text> 
        <Text style={homeStyles.helloText}>
          and note your workout list and check it
        </Text> 
        <TouchableOpacity 
          style={homeStyles.selectBtn}
          onPress={() => {
            navigation.navigate('Index')
          }}
          >
          <Text
            style={homeStyles.selectBtnText}
          >
            Select Workout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={homeStyles.loginBtn}
          onPress={() => {
            navigation.navigate('Login', {onSetUsername: setUsername})
          }}
          >
          <Text
            style={homeStyles.loginBtnText}
          >
            Log In
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const homeStyles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: "25%"
  },
  bannerImg: {
    width: "80%",
    height: "40%",
    marginTop: "11%"

  },
  btnContainer: {
    width: "100%",
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "5%",
  },
  helloTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 15,
  },
  helloText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "500",
    color: 'grey',
    textAlign: "center",
  },
  selectBtn: {
    marginTop: 50,
    width: "70%",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#484BF4',
    borderRadius: 5,
  },
  selectBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  loginBtn: {
    marginTop: 20,
    width: "70%",
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#484BF4',
    borderWidth: 3,
    borderRadius: 5,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#484BF4'
  },
});

export default HomeScreen
