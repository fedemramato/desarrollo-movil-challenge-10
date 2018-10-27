import React, { Component } from 'react'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Platform, Alert } from 'react-native'

import HomeScreen from './screens/Home'
import FavoritesScreen from './screens/Favorites'
import AuthLoadingScreen from './screens/AuthLoadingScreen'

import { registerForNotification } from './notification'
import firebase, { db } from './firebase'

import { Notifications } from 'expo'

const AppStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Favorites: FavoritesScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = Platform.select({
            ios: `ios-home${focused ? '' : '-outline'}`,
            android: `md-home`,
          })
        } else if (routeName === 'Favorites') {
          iconName = Platform.select({
            ios: `ios-star${focused ? '' : '-outline'}`,
            android: `md-star${focused ? '' : '-outline'}`,
          })
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends Component {
  componentWillMount() {
    registerForNotification()
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }
  _handleNotification = notification => {
    const { data } = notification
    Alert.alert(data.msg)
  }
  render() {
    return <MainNavigator />
  }
}
