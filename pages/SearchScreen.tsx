import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {getGroupList} from '../api/group'
import constant from '../common/constant'

export default function SearchScreen({navigation}: any) {
  const onPress = () => {
    navigation.navigate('MakeGroup')
  }
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    getGroupList().then(res => {
      const {data} = res
      console.log(data)
      setDataList(() => data)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.textInput} placeholder="그룹 찾기" />
        <TouchableOpacity style={styles.groupBtn} onPress={onPress}>
          <Text>그룹 만들기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {dataList.map((item: any) => (
          <View style={styles.rows}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.madePerson.name}</Text>
            <Text style={styles.text}>{item.memberCount}</Text>
            <Text style={styles.text}>잠김</Text>
            <TouchableOpacity style={styles.rowsBtn}>
              <Text style={styles.btnText}>입장</Text>
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
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 6,
  },
  textInput: {
    width: 200,
    height: 30,
    marginRight: 20,
    backgroundColor: '#D9D9D9',
  },
  groupBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CDC2DF',
    width: 100,
    height: 30,
  },
  rows: {
    width: constant.width,
    backgroundColor: '#CDC2DF',
    height: constant.height / 13,
    borderWidth: 1,
    marginBottom: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginRight: 20,
  },
  rowsBtn: {
    width: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A59CB5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  btnText: {
    fontSize: 10,
  },
})
