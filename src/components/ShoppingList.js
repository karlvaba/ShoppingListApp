import React from 'react';
import { useState } from 'react';

import {
	Button,
	Text,
	View,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image
  } from 'react-native';


const ShoppingList = ({navigation, route}) => {
	const [shoppingList, setShoppingList]= useState(route.params.shoppingList);
	const [addingItem, setAddingItem] = useState(false);

	const [text, onChangeText] = React.useState("Item name");

	console.log(shoppingList.items);

	const addItem = () => {
		const newItems = [...shoppingList.items, {name: text, checked: false}];
		const newShoppingList = {id: shoppingList.id, created: shoppingList.created, items: newItems};
		onChangeText("Item name")
		setShoppingList(newShoppingList);
	}

	const deleteItem = (itemName) => {
		const newItems = shoppingList.items.filter(item => item.name !== itemName)
		const newShoppingList = {id: shoppingList.id, created: shoppingList.created, items: newItems};
		onChangeText("Item name")
		setShoppingList(newShoppingList);
	}

	const toggleItemChecked = (item) => {
		item.checked = !item.checked;
		const filtered = shoppingList.items.filter(oldItem => oldItem.name !== item.name)
		const newItems = [...filtered, item];
		const newShoppingList = {id: shoppingList.id, created: shoppingList.created, items: newItems};
		setShoppingList(newShoppingList);
	}

	const getImageUrl = (checked) => {
		return checked ? require('../assets/images/checked.png') : require('../assets/images/unchecked.png')
	}

	return (  
		<ScrollView>
			{shoppingList.items.map((item) => 
				(	
					<View style={styles.container}>
								<Text style={styles.bigBlue}>{item.name}</Text>
								<TouchableOpacity onPress={() => toggleItemChecked(item)}>
									<View style={styles.verticalCenter}>
										<Image source={getImageUrl(item.checked)} />
										<Text>{item.checked ? "checked" : "unchecked"}</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => deleteItem(item.name)}>
									<View style={styles.verticalCenter}>
										<Image source={require('../assets/images/delete.png')} />
										<Text>Remove</Text>
									</View>
								</TouchableOpacity>
					</View>		
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
				<Button onPress={() => {
						setAddingItem(false)
						addItem()}} title="Confirm"></Button>
				<Button onPress={() => setAddingItem(false)} title="Cancel"></Button>
			</View>}

			<Button onPress={() => {
						setAddingItem(false)
						route.params.onUpdate(shoppingList)}} title="Save list"></Button>
			<Button onPress={() => setAddingItem(false)} title="Cancel"></Button>

		</ScrollView>
	);
}

const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	  padding: 10,
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		
		backgroundColor: "#ebeac5",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 9,
		margin: 20
	},
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 25
	},
	verticalCenter: {
		justifyContent: 'center',
    	alignItems: 'center',
    	flex:1
	}
  });
  

 
export default ShoppingList;