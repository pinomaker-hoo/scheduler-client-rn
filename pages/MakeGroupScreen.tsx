import React, {useState} from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'

export default function MakeGroupScreen({navigation}: any) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [memberCount, setMemberCount] = useState('')
  const [color, setColor] = useState('')

  const onPress = () => {
    navigation.navigate('Root')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>그룹 만들기</Text>
      <TextInput
        onChangeText={name => setName(name)}
        placeholder="그룹 이름"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={password => setPassword(password)}
        placeholder="비밀번호"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={memberCount => setMemberCount(memberCount)}
        placeholder="정원 선택"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={color => setColor(color)}
        placeholder="그룹 색상 지정"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>JOIN</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  btn: {
    width: 240,
    height: 45,
    backgroundColor: '#C47DFF',
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  textInput: {
    width: 240,
    height: 45,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    color: '#C47DFF',
    marginBottom: 30,
  },
})
