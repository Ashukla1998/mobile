import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import StaticScreen from './screens/StaticScreen';
import ScreenWrapper from './screens/SearchScreen';
import ReelsScreen from './screens/ReelsScreen';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{flex:1}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#6200EE',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              elevation: 5,
              height: 80,
              paddingBottom: 20, 
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Search':
                  iconName = focused ? 'search' : 'search-outline';
                  break;
                case 'Reel':
                  iconName = focused ? 'videocam' : 'videocam-outline';
                  break;
                case 'Activity':
                  iconName = focused ? 'notifications' : 'notifications-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={ScreenWrapper}/>
          <Tab.Screen name="Reel" component={ReelsScreen} />
          <Tab.Screen name="Activity" component={ActivityScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
