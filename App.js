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
import getAll from './src/components/DataAccess';

const Stack = createNativeStackNavigator();

const App = ()  => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="All shopping lists" component={ShoppingListPreview} />
        <Stack.Screen name="List details" component={ShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
