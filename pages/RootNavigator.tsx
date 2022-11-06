import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomNavigator'
import DateScreen from './DateScreen'
import LoginScreen from './LoginScreen'
import MakeGroupScreen from './MakeGroupScreen'
import MoneyScreen from './MoneyScreen'
import NewDoingScreen from './NewDoingScreen'
import RegisterScreen from './RegisterScreen'
import UpdateGroup from './UpdateGroup'
import UpdateInfoScreen from './UpdateInfoScreen'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Update"
          component={UpdateInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MakeGroup"
          component={MakeGroupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Money"
          component={MoneyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Date"
          component={DateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewDo"
          component={NewDoingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateGroup"
          component={UpdateGroup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
