import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import {Calendar} from 'react-native-calendars'

export default function HomeScreen() {
  return (
    <View>
      <Calendar style={styles.calendar} />
    </View>
  )
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
})
