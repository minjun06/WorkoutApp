import React, {useState, useEffect, Component} from 'react';
import { Button, View, Text, TextInput, Image, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import styles from '../stylesheet'
import uuidv4 from '../uuid'
import ListItem from './listItem'
import { max } from 'react-native-reanimated';



const InputScreen = ({route, navigation }) => {
  const [kg, setKg] = useState("");
  const [rep, setRep] = useState("");
  const [set, setSet] = useState("");
  const [date, setDate] = useState("");

  const [todayData, setTodayData] = useState([]);

  const [visDate, setVisDate] = useState([]);
  const [visTotalVolume, setVisTotalVolume] = useState([]);

  const dataKey = `@${route.params.name}_data`;
  useEffect(() => {initTodayData()}, [])

  const initTodayData = () => {
    getData().then((data) => {
      // Initialize today data
      let today = new Date()
      let todayStr = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
      setTodayData(data[todayStr])

      // Initialize chart
      loadChartData(data)
    })
  }

  const getSortedTotalVolumeArr = (data) => {
      let totalVolumeArr = []

      // Calculate total volume
      for(const [date, dataList] of Object.entries(data)) {
        // Calculate total volume value
        let totalVolume = 0
        for(let i = 0; i < dataList.length; i++) {
          totalVolume += dataList[i].volume
        }
        totalVolumeArr.push({date: new Date(date), volume: totalVolume, visDate: date})
      }

      // Sort total volume array
      let sortedTotalVolumeArr = totalVolumeArr.sort((a, b) => a.date - b.date)

      return sortedTotalVolumeArr
  }

  const loadChartData = (data) => {
      let sortedTotalVolumeArr = getSortedTotalVolumeArr(data)
      let arrLength = sortedTotalVolumeArr.length
      const maxNumOfX = 5
      let numOfX = Math.min(maxNumOfX, arrLength)

      let visData = sortedTotalVolumeArr.slice(arrLength - numOfX, arrLength)
      let visX = visData.map((oneTotalVolume) => oneTotalVolume.visDate)
      let visY = visData.map((oneTotalVolume) => oneTotalVolume.volume)
      setVisDate(visX)
      setVisTotalVolume(visY)

  }

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem(dataKey)
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            return data
          } else {
            return {}
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
      labels: visDate,
      datasets: [
        {
          data: visTotalVolume,
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
                placeholder="M/D/YYYY"
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
                     let newData = {
                       'date': date,
                       'kg':kg,
                       'rep':rep,
                       'set':set,
                       'volume':kg*rep*set,
                       'id':uuidv4()
                     }
                     getData().then((data) => {
                        // Add new data
                        if(date in data){
                          data[date].push(newData)
                        } else {
                          data[date] = [newData]
                        }

                        storeData(data)
                        let today = new Date()
                        let today_str = `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`
                        setTodayData(data[today_str])

                        // Reload chart
                        loadChartData(data)

                        // Reset input state
                        setKg("")
                        setRep("")
                        setSet("")
                        setDate("")
                     })
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
                //yAxisLabel="KG: "
                fromZero={true}
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
