import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen from '../screens/Screen';
import Screen2 from '../screens/Screen2';
import MyTabBar from '../components/MyTabBar'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: 'blue'
      }}>
      <Tab.Screen
        name="Home"
        component={Screen}
        options={{
          title: 'Home',
          icon: require('../assets/icon/members.png')
        }} />
      <Tab.Screen
        name="News"
        component={Screen}
        options={{
          title: 'News',
          icon: require('../assets/icon/news.png')
        }} />
      <Tab.Screen
        name="Contacts"
        component={Screen}
        options={{
          title: 'Contacts',
          icon: require('../assets/icon/requests.png')
        }} />
      <Tab.Screen
        name="About"
        component={Screen2}
        options={{
          title: 'About',
          icon: require('../assets/icon/events.png')
        }} />
      <Tab.Screen
        name="Settings"
        component={Screen2}
        options={{
          title: 'Settings',
          icon: require('../assets/icon/account.png')
        }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;