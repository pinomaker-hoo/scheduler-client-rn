import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default function AdminScreen({navigation}: any) {
  const onPressUpdate = () => {
    navigation.navigate('Update')
  }

  const onPressMoney = () => {
    navigation.navigate('Money')
  }

  const onPressDate = () => {
    navigation.navigate('Date')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nameText}>김도연</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={onPressUpdate}>
          <Text>수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>2002.06.13</Text>
        <Text style={styles.bodyText}>이달의 월급 xx원</Text>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressMoney}>
          <Text>임금 확인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bodyBtn} onPress={onPressDate}>
          <Text>디데이 설정</Text>
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
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    marginTop: 30,
    alignItems: 'center',
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  headerBtn: {
    width: 60,
    height: 40,
    backgroundColor: '#CDC2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  nameText: {
    fontSize: 30,
    width: 200,
    marginLeft: 30,
  },
  bodyText: {
    marginTop: 30,
    fontSize: 30,
  },
  bodyBtn: {
    width: 60,
    height: 40,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
})
