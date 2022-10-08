import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import AdminScreen from './AdminScreen'
import GroupScreen from './GroupScreen'
import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen'

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
          title: 'Search',
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="그룹"
        component={GroupScreen}
        options={{
          title: 'Group',
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="메인"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <BottomTab.Screen
        name="개인"
        component={AdminScreen}
        options={{
          title: 'Admin',
          tabBarIcon: () => null,
        }}
      />
    </BottomTab.Navigator>
  )
}
