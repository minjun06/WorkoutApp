import React, {useState, useEffect, Component} from 'react';
import { Button, View, Text, TextInput, Image, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import styles from '../stylesheet'
import uuidv4 from '../uuid'
import ListItem from './listItem'



const InputScreen = ({route, navigation }) => {
  const [kg, setKg] = useState(0);
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);
  const [date, setDate] = useState(0);
  const [todayData, setTodayData] = useState([]);
  const tableHead = ['Date', 'KG', 'Rep', 'Set', 'Total Volume', 'Delete']
  const dataKey = `@${route.params.name}_data`;
  useEffect(() => {getData()}, [])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem(dataKey)
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setTodayData(data)
          } else {
          }


        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(dataKey, jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const renderItem = (item) => (
    <ListItem data={item}/>
  );

  const data = {
      labels: ["15 Jan", "17 Jan", "18 Jan", "25 Jan", "1 Feb", "2 Feb"],
      datasets: [
        {
          data: [30, 45, 35, 60, 70, 75]
        }
      ]
    };

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };


  return (
    <View style = {styles.center}>
        <Text style = {styles.regularText}>Record KG Rep and Set</Text>
        <Text> </Text>
        <View style = {styles.center}>


            <View style = {styles.rowContainer}>
              <Text>Date: </Text>
              <TextInput
                style={styles.myTextInput}
                placeholder=""
                onChangeText={setDate}
                value={date}
              />

              <TextInput
                style={styles.myTextInput}
                placeholder="#"
                onChangeText={setKg}
                value={kg}
              />
              <Text>KG</Text>
              <TextInput
                style={styles.myTextInput}
                placeholder="#"
                onChangeText={setRep}
                value={rep}
              />
              <Text>Rep</Text>
              <TextInput
                style={styles.myTextInput}
                placeholder="#"
                onChangeText={setSet}
                value={set}
              />
              <Text>Set</Text>
              <Text> Total Volume for this set: {kg*rep*set} </Text>

              <Button
                   title={"Add"}
                   color="#87CEEB"
                   onPress = {() => {
                     let data = {
                       'date':date,
                       'kg':kg,
                       'rep':rep,
                       'set':set,
                       'volume':kg*rep*set,
                       'id':uuidv4()
                     }
                     const newData=
                       todayData.concat(data)
                     setTodayData(newData)
                     storeData(newData)
                     setKg("")
                     setRep("")
                     setSet("")
                     setDate("")
                   }}
                   />


            </View>

            <ListItem data={{item:
                {
                  date: 'Date',
                  kg: 'Kg',
                  rep: 'Rep',
                  set: 'Set',
                  volume: 'Total Volume'
              }
            }}/>
            <FlatList
              data={todayData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />

            <View style={styles.graphContainer}>
              <BarChart
                data={data}
                width={500}
                height={320}
                yAxisLabel="KG: "
                style={{backgroundColor:"#fff"}}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
              />
            </View>

        </View>
    </View>
  );
}



export default InputScreen
