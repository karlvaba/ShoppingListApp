import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ShoppingList from './src/components/ShoppingList';
import ShoppingListPreview from './src/components/ShoppingListPreview';


const Stack = createNativeStackNavigator();

/*
  The root component. Uses a stack navigator to navigate between
  the list preview screen (where all the shopping lists are displayed)
  and a single list's detailed view. 
*/
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen //Preview screen
          name="All shopping lists"
          component={ShoppingListPreview}
        /> 
        <Stack.Screen name="List details" component={ShoppingList}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
