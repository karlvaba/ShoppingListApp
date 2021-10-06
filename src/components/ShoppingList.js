import React from 'react';
import { useState } from 'react';

import {
	Button,
	Text,
	View,
	StyleSheet,
	TextInput
  } from 'react-native';


const ShoppingList = ({navigation, route}) => {
	const [shoppingList, setShoppingList]= useState(route.params.shoppingList);
	const [addingItem, setAddingItem] = useState(false);

	const [text, onChangeText] = React.useState("Item name");
  	const [number, onChangeNumber] = React.useState("1");

	console.log(shoppingList.items);

	const addItem = () => {
		const newItems = [...shoppingList.items, {name: text, quantity: number}];
		const newShoppingList = {id: shoppingList.id, created: shoppingList.created, items: newItems};
		onChangeText("Item name")
		onChangeNumber("1")
		setShoppingList(newShoppingList);
	}

	return (  
		<View>
			{shoppingList.items.map((item) => 
				(	
					<Text>{item.name}</Text>
				)
			)}

			{!addingItem && <Button onPress={() => setAddingItem(true)} title="Add new item"></Button>}
			{addingItem && <View>
				<TextInput
					style={styles.input}
					onChangeText={(itemName) => onChangeText(itemName)}
					placeholder="Enter item name"
					value={text}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(quantity) => onChangeNumber(quantity)}
					value={number}
					placeholder="1"
					keyboardType="numeric"
				/>
				<Button onPress={() => {
						setAddingItem(false)
						addItem({text, number})}} title="Confirm"></Button>
				<Button onPress={() => setAddingItem(false)} title="Cancel"></Button>
			</View>}
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	  padding: 10,
	},
  });
  

 
export default ShoppingList;