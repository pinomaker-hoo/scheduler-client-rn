import React, {memo, useState} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native'

export default function MoneyScreen({navigation}: any) {
  const [pay, setPay] = useState(0)
  const [hours, setHours] = useState(0)
  const [money, setMoney] = useState(0)

  const onPress = () => {
    setMoney(pay * hours)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>돈 계산</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.rowsView}>
          <Text>시급</Text>
          <TextInput
            onChangeText={pay => setPay(Number(pay))}
            style={styles.textInput}
            // value={pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </View>
        <View style={styles.rowsView}>
          <Text>시간</Text>
          <TextInput
            onChangeText={hours => setHours(Number(hours))}
            style={styles.textInput}
          />
        </View>
        <View style={styles.rowsView}>
          <Text>급여</Text>
          <Text style={styles.textInput}>
            {String(money)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text>계산하기</Text>
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
  },
  textInput: {
    width: 240,
    height: 45,
    borderWidth: 3,
    borderColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  rowsView: {
    flexDirection: 'row',
  },
  btn: {
    width: 240,
    height: 45,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
