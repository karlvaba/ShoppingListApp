import React from 'react';
import ShoppingList from './ShoppingList';
import getAll from './DataAccess';

import {
	Button,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
  } from 'react-native';

const ShoppingListPreview = ({navigation}) => {
	let { error, isPending, data } = getAll()
	console.log(data.shoppingLists)

	return (
		<View>
			{ isPending && <Text>Loading data...</Text>}
			{ !isPending && data && data.shoppingLists.map((shoppingList) => 
				(
					<TouchableHighlight onPress={ ()=> navigation.navigate('List details', { shoppingList: shoppingList })}>
						<View>
							<Text style={styles.bigBlue}>Created at: {shoppingList.created}, number of items: {shoppingList.items.length}</Text>
						</View>
					</TouchableHighlight>			
				)
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
	  marginTop: 50,
	},
	bigBlue: {
	  color: 'blue',
	  fontWeight: 'bold',
	  fontSize: 30,
	},
	red: {
	  color: 'red',
	},
  });
 
export default ShoppingListPreview;