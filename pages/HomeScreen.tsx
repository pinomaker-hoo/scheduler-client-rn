import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Calendar} from 'react-native-calendars'

export default function HomeScreen() {
  const data = ['오늘은 치킨 먹자', '오늘은 개발하자']
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>졸업</Text>
        <Text>D-291</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.calendarBox}>
          <Calendar style={styles.calendar} />
        </View>
        <View style={styles.listBox}>
          {data.map(item => (
            <Text>{item}</Text>
          ))}
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
    flex: 1.3,
  },
  listBox: {
    flex: 1,
  },
})
