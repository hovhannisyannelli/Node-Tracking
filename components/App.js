/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from "react-navigation";
import ListScreen from "./ListScreen";
import MenuScreen from "./MenuScreen";
import { Provider } from "react-redux";
import store from "./reducers/wrapper";
import AddNewListScreen from './AddNewListScreen'


const Root=  StackNavigator({
  MenuScreen: { screen: MenuScreen, 
         navigationOptions: { title: "Main Menu" } },
  ListScreen: { 
      screen: ListScreen, 
      navigationOptions: { title: "List of Items" } },
});

const AddNewListModal = StackNavigator({
AddNewListScreen: 
{ screen: AddNewListScreen , 
  navigationOptions: { title: "Adding" },
}
});

export default StackNavigator(
{
  Main: { screen: Root },
  NewList: { screen: AddNewListModal }
},
{ mode: "modal", headerMode: "none" }
);

