import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Icon } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Foundation from 'react-native-vector-icons/Foundation'


import Settings from '../containers/settings'
import Transcribe from '../containers/transcribe'
import Transcripts from '../containers/transcripts'

const Tabs = createBottomTabNavigator()

const TabsNavigator = () => {
  return (
    <Tabs.Navigator screenOptions={{ 
      headerShown: false, 
      tabBarStyle: {
        position: 'absolute',
        marginBottom: '1%',
        marginTop: '1%',
        marginHorizontal: '5%',
        borderRadius: 10,
        height: 50,
        ...styles.shadow
      },
      tabBarShowLabel: false,  
      }}>
      <Tabs.Screen
        component={Transcribe}
        name="Transcribe"
        options={{
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="hearing-aid"
              size={35}
              color={focused ? '#F3D432' : '#fff'} />
            //   as={Foundation}
            //   color={'#F3D432'}
            //   name="hearing-aid"
            //   size={30}
            //   textAlign="center"
            // />
          ),
        }}
      />
      <Tabs.Screen
        component={Transcripts}
        name="Transcripts"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
            name="inbox"
            size={30}
            color={focused ? '#F3D432' : '#fff'} />
            //   as={AntDesign}
            //   color={'#F3D432'}
            //   name="inbox"
            //   size={30}
            // />
          ),
        }}
      />
      <Tabs.Screen
        component={Settings}
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="setting"
              size={30}
              color={focused ? '#F3D432' : '#fff'} />
            //   as={AntDesign}
            //   color={'#F3D432'}
            //   name="setting"
            //   size={30}
            // />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    backgroundColor: '#00003F',
    borderWidth: 1,
    borderColor: 'transparent'
  }
})
