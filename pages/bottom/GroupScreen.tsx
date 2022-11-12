import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {getGroup, getGroupList} from '../../api/group'
import {getGroupTodosList} from '../../api/groupTodos'
import {deleteGroupUser, findGroupUser} from '../../api/groupUser'
import {formatDate} from '../../common/common'
import constant from '../../common/constant'

export default function GroupScreen({navigation}: any) {
  const [loading, setLoading] = useState(true)
  const [dataList, setDataList]: any = useState([])
  const [groupList, setGroupList]: any = useState([])
  const [user, setUser]: any = useState()

  useEffect(() => {
    callApi()
  }, [dataList])

  const callApi = async () => {
    const {data}: any = await findGroupUser()
    const {data: data2}: any = await getGroupList()
    const user = await AsyncStorage.getItem('user')
    const jsonParser = user && (await JSON.parse(user))
    setUser(jsonParser)
    setGroupList(data2)
    setDataList(data)
    setLoading(false)
  }

  const moveToUpdate = (page: string, idx: string) => {
    navigation.navigate(page, {state: idx})
  }

  if (loading) return null
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 그룹</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {dataList
            .filter((item: any) => item.group.madePersonIdx === user.idx)
            .map((item: any) => (
              <CalenderView key={item.idx} data={item} func={moveToUpdate} />
            ))}
          {dataList
            .filter((item: any) => item.group.madePersonIdx !== user.idx)
            .map((item: any) => (
              <CalenderView key={item.idx} data={item} func={moveToUpdate} />
            ))}
        </ScrollView>
      </View>
    </View>
  )
}

const CalenderView = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [schedulerData, setSchedulerData] = useState([])
  const [toggled, setToggled] = useState(false)
  const [data, setData]: any = useState()
  const [loading, setLoading] = useState(true)
  const [user, setUser]: any = useState()

  useEffect(() => {
    callApi()
  }, [data])

  const callApi = async () => {
    const {data}: any = await getGroup(props.data.group.idx)
    const {data: todoData} = await getGroupTodosList(props.data.group.idx)
    setSchedulerData(todoData)
    setData(data)
    const user = await AsyncStorage.getItem('user')
    const jsonParser = user && (await JSON.parse(user))
    setUser(jsonParser)
    setLoading(false)
  }

  const onPressDeleteBtn = async () => {
    const {data}: any = await deleteGroupUser(props.data.group.idx)
    console.log(data)
    if (data) return Alert.alert('삭제 완료')
    return Alert.alert('ERROR')
  }

  const onPressUpdateBtn = async () => {
    props.func('UpdateGroup', data.idx)
  }

  const onPressScheduler = async (idx: number) => {
    setToggled(current => !current)
  }

  const markedDates = schedulerData.reduce((acc: any, current: any) => {
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

  if (loading) return null
  return (
    <View>
      <View style={styles.lows}>
        <Text style={styles.text}>{data.name}</Text>
        {user.idx && user.idx === data.madePerson.idx ? (
          <TouchableOpacity style={styles.btn} onPress={onPressUpdateBtn}>
            <Text style={styles.btnText}>수정</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.btn} onPress={onPressDeleteBtn}>
          <Text style={styles.btnText}>탈퇴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onPressScheduler(data.idx)}
        >
          <Text style={styles.btnText}>스케줄표</Text>
        </TouchableOpacity>
      </View>
      <View>
        {toggled ? (
          <>
            <Calendar
              markedDates={markedSelectedDates}
              onDayPress={day => {
                setSelectedDate(day.dateString)
              }}
              theme={{
                selectedDayBackgroundColor: data.color,
                arrowColor: data.color,
                dotColor: data.color,
                todayTextColor: data.color,
              }}
              style={styles.calendar}
            />
            <ScrollView style={styles.listBox}>
              {schedulerData
                .filter((item: any) => item.date === selectedDate)
                .map((item: any) => (
                  <View style={styles.listBox2} key={item.idx}>
                    <Text style={styles.textList}> - {item.title}</Text>
                  </View>
                ))}
            </ScrollView>
          </>
        ) : null}
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
    marginLeft: 20,
    marginTop: 20,
    fontSize: 30,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  lows: {
    flexDirection: 'row',
    width: constant.width - 40,
    height: constant.width / 7,
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginLeft: 20,
    width: constant.width - 250,
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
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  listBox2: {
    width: constant.width * 0.7,
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  textList: {
    fontSize: 20,
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  listBox: {
    width: constant.width * 0.8,
    marginLeft: 20,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#E1D7F4',
  },
})
