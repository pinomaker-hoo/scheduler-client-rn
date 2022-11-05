import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {getDay} from '../api/day'
import {getTodos} from '../api/todos'
import {formatDate} from '../common/common'
import constant from '../common/constant'

export default function HomeScreen({navigation}: any) {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [dataList, setDataList] = useState([])
  const [day, setDay]: any = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos().then(res => {
      const {data} = res
      setDataList(() => data)
    })
    getDay().then(res => {
      const {data: data2}: any = res
      setDay(() => data2)
      setLoading(() => false)
    })
  }, [dataList])

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
  const getDday = (dateData: string) => {
    const now = new Date()
    const dday = new Date(dateData)
    const gap = dday.getTime() - now.getTime()
    return Math.ceil(gap / (1000 * 60 * 60 * 24))
  }
  if (loading) return null
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{day.name}</Text>
        <Text>D - {getDday(day.date)}</Text>
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
          <Text style={styles.title}>To Do</Text>
          <ScrollView style={styles.listBox}>
            {dataList
              .filter((item: any) => item.date === selectedDate)
              .map((item: any) => (
                <View style={styles.listBox2} key={item.idx}>
                  <Text style={styles.textList}> - {item.title}</Text>
                </View>
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
    width: constant.width * 0.9,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  listBox: {
    width: constant.width * 0.8,
    borderRadius: 10,
    backgroundColor: '#E1D7F4',
  },
  listOut: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1D7F4',
    width: 100,
    height: 40,
  },
  addBtnText: {
    color: 'white',
  },
  title: {
    fontSize: 30,
    marginTop: -30,
    marginBottom: 30,
  },
  listBox2: {
    width: constant.width * 0.7,
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  textList: {
    fontSize: 20,
    borderBottomWidth: 1,
    marginLeft: 15,
  },
})
