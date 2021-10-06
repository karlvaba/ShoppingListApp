/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ShoppingListPreview from './src/components/ShoppingListPreview';
import ShoppingList from './src/components/ShoppingList';

const Stack = createNativeStackNavigator();

const App = ()  => {

  const shoppingList = [
    {
      id: 1,
      created: "21 aug 2021", 
      items: [
        {name: "Milk", quantity: 2},
        {name: "Eggs", quantity: 1}
      ]}, 
    {
      id: 2,
      created: "22 aug 2021", 
      items: [
        {name: "Bread", quantity: 7},
        {name: "Beer", quantity: 2}
      ]}
  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="All shopping lists">
          {(props) => <ShoppingListPreview {...props} shoppingListList={shoppingList} />}
        </Stack.Screen>
        <Stack.Screen name="List details" component={ShoppingList}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
