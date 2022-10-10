import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {getTodos} from '../api/todos'
import {formatDate} from '../common/common'
import constant from '../common/constant'

export default function HomeScreen({navigation}: any) {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    getTodos().then(res => {
      const {data} = res
      setDataList(() => data)
    })
  }, [])

  const onPressNewBtn = () => {
    navigation.navigate('NewDo')
  }

  const markedDates = dataList.reduce((acc: any, current: any) => {
    const formattedDate = formatDate(new Date(current.date))
    acc[formattedDate] = {marked: true}
    return acc
  }, {})

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>졸업</Text>
        <Text>D-291</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.calendarBox}>
          <Calendar
            markedDates={markedSelectedDates}
            onDayPress={day => {
              setSelectedDate(day.dateString)
            }}
            style={styles.calendar}
          />
        </View>
        <View style={styles.listOut}>
          <ScrollView style={styles.listBox}>
            {dataList
              .filter((item: any) => item.date === selectedDate)
              .map((item: any) => (
                <Text style={styles.textList}>{item.title}</Text>
              ))}
          </ScrollView>
        </View>
        <View style={styles.addBtnView}>
          <TouchableOpacity style={styles.addBtn} onPress={onPressNewBtn}>
            <Text style={styles.addBtnText}>새로운 할 것</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 6,
  },
  calendarBox: {
    flex: 5,
  },
  listBox: {
    width: constant.width - 100,
    backgroundColor: '#A59CB5',
  },
  listOut: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textList: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  addBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A59CB5',
    width: 100,
    height: 40,
  },
  addBtnText: {
    color: 'white',
  },
})
