import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';


export default function ListItem( props ) {
  return (

      <View style={styles.container}>

          <Text style={[styles.text, styles.date]}> {props.data.item.date}  </Text>
          <Text style={[styles.text, styles.kg]}> {props.data.item.kg} </Text>
          <Text style={[styles.text, styles.rep]}> {props.data.item.rep} </Text>
          <Text style={[styles.text, styles.set]}> {props.data.item.set} </Text>
          <Text style={[styles.text, styles.volume]}> {props.data.item.volume} </Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'center',
    marginTop:10,
    marginHorizontal: 30,
    padding:10,
  },

  text: {
    fontSize: 20,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  date: {
    width: 100
  },
  kg: {
    width: 60
  },
  rep: {
    width: 60
  },
  set: {
    width: 60
  },
  volume: {
    width: 200
  }

});
