import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import constants from '../common/constant'

export default function GroupScreen() {
  const title = [
    '동미대 모임',
    '동미대 모임',
    '동미대 모임',
    '동미대 모임',
    '동미대 모임',
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 그룹</Text>
      </View>
      <View style={styles.body}>
        {title.map(item => (
          <View style={styles.lows}>
            <Text style={styles.text}>{item}</Text>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>스케줄표</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  lows: {
    flexDirection: 'row',
    width: constants.width - 40,
    height: constants.width / 7,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginLeft: 20,
    width: constants.width - 200,
  },
  btn: {
    width: 50,
    height: 33,
    backgroundColor: '#A59CB5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnText: {
    fontSize: 10,
  },
})
