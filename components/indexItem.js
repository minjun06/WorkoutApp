import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity} from 'react-native';


export default function IndexItem( props ) {
  return (

      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Image style={styles.image} source={props.imagePath}/>
        <Text style={styles.name}> {props.name}  </Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: 50,
    height: 50,
  },
  subContainer: {

  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

});
