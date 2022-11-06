import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import AdminScreen from './AdminScreen'
import GroupScreen from './GroupScreen'
import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'
import {Image, StyleSheet} from 'react-native'

const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="메인"
      screenOptions={{headerShown: false}}
    >
      <BottomTab.Screen
        name="검색"
        component={SearchScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <Image
              style={styles.logo}
              source={require('../assets/search.png')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="그룹"
        component={GroupScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <Image
              style={styles.logo}
              source={require('../assets/group.png')}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="메인"
        component={HomeScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <Image style={styles.logo} source={require('../assets/home.png')} />
          ),
        }}
      />
      <BottomTab.Screen
        name="개인"
        component={AdminScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <Image
              style={styles.logo}
              source={require('../assets/admin.png')}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
const styles = StyleSheet.create({
  logo: {
    marginTop: 35,
  },
})
