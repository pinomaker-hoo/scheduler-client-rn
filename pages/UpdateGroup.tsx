import React, {useEffect, useState} from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {deleteGroup, getGroup, saveGroup, updateGroup} from '../api/group'
import {joinGroup} from '../api/groupUser'
import {nullCheck} from '../common/common'
import RNPickerSelect from 'react-native-picker-select'

export default function UpdateGroup(props: any) {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [memberCount, setMemberCount] = useState('')
  const [color, setColor] = useState('')
  const [data, setData]: any = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    callApi()
  }, [])

  const callApi = async () => {
    const {data}: any = await getGroup(props.route.params.state)
    setName(data.name)
    setPassword(data.password)
    setColor(data.color)
    setMemberCount(data.memberCount)
    setLoading(false)
  }

  const onPressUpdate = async () => {
    if (!nullCheck([name, password, memberCount, color]))
      return Alert.alert('입력 하세요.')
    const {data} = await updateGroup(
      name,
      password,
      Number(memberCount),
      color,
      props.route.params.state,
    )
    if (data) return props.navigation.navigate('그룹')
    return Alert.alert('ERROR')
  }

  const onPressAddTodos = async () => {}

  const onPressDeleteGroup = async () => {
    const {data}: any = await deleteGroup(props.route.params.state)
    if (!data) return Alert.alert('ERROR')
    Alert.alert('삭제하였습니다.')
    return props.navigation.navigate('그룹')
  }

  if (loading) return null
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>그룹 설정</Text>
      <TextInput
        onChangeText={name => setName(name)}
        value={name}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={memberCount => setMemberCount(memberCount)}
        value={String(memberCount)}
        style={styles.textInput}
      />
      <View style={styles.select}>
        <RNPickerSelect
          value={color}
          onValueChange={value => setColor(value)}
          items={[
            {label: 'BLUE', value: 'blue'},
            {label: 'GREEN', value: 'green'},
            {label: 'RED', value: 'red'},
            {label: 'YELLOW', value: '#E9FF52'},
            {label: 'ORANGE', value: '#E99C52'},
          ]}
          placeholder="색상 선택"
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPressUpdate}>
        <Text style={styles.btnText}>재설정하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressAddTodos}>
        <Text style={styles.btnText}>일정 추가하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onPressDeleteGroup}>
        <Text style={styles.btnText}>그룹 삭제하기</Text>
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
