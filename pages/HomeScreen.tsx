import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {formatDate} from '../common/common'

export default function HomeScreen({navigation}: any) {
  const data = ['오늘은 치킨 먹자', '오늘은 개발하자']
  const onPressNewBtn = () => {
    navigation.navigate('NewDo')
  }
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))

  const posts = [
    {
      id: 1,
      title: '제목입니다.',
      contents: '내용입니다.',
      date: '2022-02-26',
    },
    {
      id: 2,

      text: '내용입니다.',
      date: '2022-02-27',
    },
  ]

  const markedDates = posts.reduce((acc: any, current) => {
    console.log(selectedDate)
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
        <View style={styles.listBox}>
          {data.map(item => (
            <Text>{item}</Text>
          ))}
        </View>
        <TouchableOpacity onPress={onPressNewBtn}>
          <Text>새로운 할 것</Text>
        </TouchableOpacity>
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
    flex: 1.3,
  },
  listBox: {
    flex: 1,
  },
})
