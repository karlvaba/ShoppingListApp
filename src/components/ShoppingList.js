import React from 'react';
import ShoppingListPreview from './ShoppingListPreview';

import {
	Button,
	Text,
	View,
	StyleSheet
  } from 'react-native';

const ShoppingList = ({navigation, route}) => {
	const items = route.params.shoppingList.items
	return (  
		<View>
			{items.map((item) => 
				(
					<Text>{item.name}</Text>
				)
			)}
		</View>
	);
}

 
export default ShoppingList;