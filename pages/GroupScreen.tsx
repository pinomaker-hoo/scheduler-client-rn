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
import {getGroup} from '../api/group'
import {getTodosList} from '../api/groupTodos'
import {deleteGroupUser, findGroupUser} from '../api/groupUser'
import {formatDate} from '../common/common'
import constants from '../common/constant'

export default function GroupScreen() {
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    callApi()
  }, [])

  const callApi = async () => {
    const {data} = await findGroupUser()
    setDataList(data)
    setLoading(false)
  }

  if (loading) return null
  console.log(dataList)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 그룹</Text>
      </View>
      <View style={styles.body}>
        <ScrollView>
          {dataList.map((item: any) => (
            <CalenderView key={item.idx} data={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const CalenderView = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const [schedulerData, setSchedulerData] = useState([])
  const [toggled, setToggled] = useState(true)
  const [data, setData]: any = useState()
  const [loading, setLoading] = useState(true)
  const [user, setUser]: any = useState()

  useEffect(() => {
    callApi()
  }, [])

  const callApi = async () => {
    const {data}: any = await getGroup(props.data.idx)
    setData(data)
    const user = await AsyncStorage.getItem('user')
    const jsonParser = user && (await JSON.parse(user))
    setUser(jsonParser)
    setLoading(false)
  }

  const onPressDeleteBtn = async (idx: string) => {
    const {data}: any = await deleteGroupUser(idx)
    console.log(data)
    if (data) return Alert.alert('삭제 완료')
    return Alert.alert('ERROR')
  }

  const onPressScheduler = async (idx: number) => {
    const {data} = await getTodosList(String(idx))
    setSchedulerData(() => data)
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
  console.log(data)
  return (
    <View>
      <View style={styles.lows}>
        <Text style={styles.text}>{data.name}</Text>
        {user.madePerson && user.idx === data.madePerson.idx ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onPressDeleteBtn(String(data.idx))}
          >
            <Text style={styles.btnText}>삭제</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onPressDeleteBtn(String(data.idx))}
        >
          <Text style={styles.btnText}>삭제</Text>
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
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
})
