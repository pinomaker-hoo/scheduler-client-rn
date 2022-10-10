import React, {useState} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {formatDate} from '../common/common'

export default function NewDoingScreen() {
  const [text, onChangeText] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    hideDatePicker()
    onChangeText(formatDate(date))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>일정 추가</Text>
      </View>
      <View style={styles.body}>
        <TextInput placeholder="제목" style={styles.textInput} />
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder="날짜 입력"
            placeholderTextColor="#000000"
            underlineColorAndroid="transparent"
            editable={false}
            value={text}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </TouchableOpacity>
        <TextInput placeholder="장소" style={styles.textInput} />
        <TouchableOpacity>
          <Text>추가하기</Text>
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
  textInput: {
    width: 240,
    height: 45,
    borderWidth: 3,
    borderColor: '#D9D9D9',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
})
