import React from 'react';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row'
  },
  titleText: {
    color: 'blue',
    fontSize: 40
  },
  regularText: {
    color: 'black',
    fontSize: 20
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    width: 50
  },
  myTextInput: {
    height: 20,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  graphContainer: {
    paddingHorizontal: 200
  },
  signUpBtn: {
    color: 'blue',
    marginTop: 5,
    padding: 5,
  },
  alert: {
    color: 'red',
    marginTop: 5,
  }

});

export default styles
