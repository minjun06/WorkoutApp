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
    padding:5,
    width: "100%",
  },

  text: {
    fontSize: 18,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  date: {
    width: "30%",
  },
  kg: {
    width: "15%",
  },
  rep: {
    width: "15%",
  },
  set: {
    width: "15%",
  },
  volume: {
    width: "25%",
  }

});
