import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VirusList from './screens/VirusList';
import VirusDetails from './screens/VirusDetails';
import UserScreen from './screens/UserScreen';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VirusStack = createStackNavigator();
const UserStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();


const defaultNavigatorOption = (navigation) => {
  return {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'brown', },
    headerRight: () => {
      return <Ionicons name='ios-add' size={25} color='white' />;
    }
  }

}


const MyVirusStack = props => {
  return (
    <VirusStack.Navigator screenOptions={defaultNavigatorOption}>
      <VirusStack.Screen name="List" component={VirusList} />
      <VirusStack.Screen name="Details" component={VirusDetails} />
    </VirusStack.Navigator>
  );
}

const MyUserStack = props => {
  return (
    <UserStack.Navigator screenOptions={defaultNavigatorOption}>
      <UserStack.Screen name="User" component={UserScreen} />
    </UserStack.Navigator>
  );
}

const MyTabs = props => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Users') {
            iconName = 'ios-contact';
          } else if (route.name === 'Virus') {
            iconName = 'ios-cog';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Users" component={MyUserStack} />
      <Tab.Screen name="Virus" component={MyVirusStack} />
    </Tab.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MyTabs} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App

