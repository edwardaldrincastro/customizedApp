import React, { Component } from 'react';
import LoginScreen from "./src/components/screens/LoginScreen";
import AuthScreen from "./src/components/screens/AuthScreen";
import BirthdayScreen from "./src/components/screens/SignUpScreens/SignUpBirthdayScreen";
import NameScreen from "./src/components/screens/SignUpScreens/SignUpNameScreen";
import EmailScreen from "./src/components/screens/SignUpScreens/SignUpEmailScreen";
import PasswordScreen from "./src/components/screens/SignUpScreens/SignUpPasswordScreen";
import SuccessScreen from "./src/components/screens/SignUpScreens/SignUpSuccessScreen";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import TabNavigator from "./src/components/navigators/tabNavigator";

export default class App extends Component {
  render() {
    return (
      <SwitchNav />
    );
  }
}

const AuthStack = createStackNavigator({
  Auth: AuthScreen,
  Name: NameScreen,
  Email: EmailScreen,
  Password: PasswordScreen,
  Birthday: BirthdayScreen,
  Success: SuccessScreen,
  Login: LoginScreen,
}, {
    initialRouteName: 'Auth',
    navigationOptions: {
      header: null
    }
  })

const SwitchNav = createSwitchNavigator({
  App: AuthStack,
  Entry: TabNavigator,
},
  {
    initialRouteName: 'App'
  });


