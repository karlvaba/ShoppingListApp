import React from 'react';
import ShoppingList from './ShoppingList';

import {
	Button,
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
  } from 'react-native';

const ShoppingListPreview = ({navigation, shoppingListList}) => {
	return (  
		<View>
			{shoppingListList.map((shoppingList) => 
				 (
					<TouchableHighlight key={shoppingList.id} onPress={() => navigation.navigate('List details', {shoppingList: shoppingList})}>
						<View>
							<Text style={styles.bigBlue}>{shoppingList.created}</Text>
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