import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import ExploreScreen from "../screens/ExploreScreens/ExploreScreen";
import InboxScreen from "../screens/InboxScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SavedScreen from "../screens/SavedScreen";
import TripsScreen from "../screens/TripsScreen";
import MapScreen from "../screens/TripsScreens/PickLocation"



const TabNavigator = createBottomTabNavigator({
    EXPLORE: ExploreScreen,
    SAVED: SavedScreen,
    TRIPS: TripsScreen,
    INBOX: InboxScreen,
    PROFILE: ProfileScreen
  },
  
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'EXPLORE') {
          iconName = `ios-search`;
        } else if (routeName === 'SAVED') {
          iconName = `md-heart-outline`;
        } else if (routeName === 'TRIPS') {
            iconName = `ios-plane`;
        } else if (routeName === 'INBOX') {
            iconName = `ios-chatbubbles-outline`;
        } else if (routeName === 'PROFILE') {
            iconName = `md-person`;
        }
        return <Icon name={iconName} size={24} color={tintColor} style={{
          marginTop: 10}}/>;
      },     
    }),
    tabBarOptions: {
      activeTintColor: '#FE6A6A',
      inactiveTintColor: '#E1E1E1',
      showLabel: true,
      labelStyle: {
        fontSize: 8,
        marginBottom: 8
      },
      style: {
        height: 50,
        backgroundColor: "#212424"
    }
    },  
  },
  {
    initialRouteName: 'Home'
  },
);
  


export default TabNavigator;
