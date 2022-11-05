import React, {useState} from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {saveGroup} from '../api/group'
import {joinGroup} from '../api/groupUser'
import {nullCheck} from '../common/common'
import RNPickerSelect from 'react-native-picker-select'

export default function MakeGroupScreen({navigation}: any) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [memberCount, setMemberCount] = useState('')
  const [color, setColor] = useState('')

  const onPress = async () => {
    if (!nullCheck([name, password, memberCount, color]))
      return Alert.alert('입력 하세요.')
    const {data} = await saveGroup(name, password, Number(memberCount), color)
    const {data: data2}: any = await joinGroup(data.idx)
    if (data2) return navigation.navigate('Root')
    return Alert.alert('ERROR')
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
      <View style={styles.select}>
        <RNPickerSelect
          onValueChange={value => setColor(value)}
          items={[
            {label: 'BLUE', value: 'blue'},
            {label: 'GREEN', value: 'green'},
            {label: 'RED', value: 'red'},
            {label: 'YELLOW', value: 'yellow'},
            {label: 'ORANGE', value: 'orange'},
          ]}
          placeholder="색상 선택"
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>생성하기</Text>
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
  select: {
    width: 240,
    height: 45,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
})
