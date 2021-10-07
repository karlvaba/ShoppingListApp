import React from 'react';
import { useState,useEffect } from 'react';
import ShoppingList from './ShoppingList';
import getAll from './DataAccess';
import { Dimensions } from 'react-native';

import {
	Button,
	Text,
	View,
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	TouchableOpacity,
	Image
  } from 'react-native';


const dbUrl = "https://api.jsonbin.io/b/615e21759548541c29bf2c80/latest"

const ShoppingListPreview = ({navigation}) => {
	
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);


	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			fetch(dbUrl)
			.then(res => {
				if (!res.ok) {
				throw Error('could not fetch the data for that resource');
				} 
				return res.json();
			})
			.then(data => {
				setData(data);
				setError(null);
				setIsPending(false)
				return unsubscribe;
			})
			.catch(err => {
				setIsPending(false);
				setError(err.message);
			})
		});
	  	
	}, [navigation])

	const updateList = (shoppingList) => {
	
		const filtered = data.shoppingLists.filter(existingList => existingList.id !== shoppingList.id)

		const newLists = [...filtered, shoppingList]
		const newData = {shoppingLists: newLists}


		fetch('https://api.jsonbin.io/b/615e21759548541c29bf2c80', {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newData)
		}).then(() => {
			console.log("fetch done")
			
		}).catch(err => {
			console.log(err)
		  })
	}

	const createNewList = () => {
		const newId = Math.max(data.shoppingLists.map(o => parseInt(o.id))) + 1;
		const today = new Date()
		const month = today.getMonth()
		const year = today.getFullYear()
		const day = today.getDay()

		const date = day + "." + month + "." + year

		const newShoppingList = {id: newId, created: date, items: []}

		navigation.navigate('List details', { shoppingList: newShoppingList, onUpdate: updateList })
	}

	const deleteList = (listId) => {

		const filtered = data.shoppingLists.filter(existingList => existingList.id !== listId)

		const newData = {shoppingLists: filtered}

		fetch('https://api.jsonbin.io/b/615e21759548541c29bf2c80', {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newData)
		}).then(() => {
			console.log("fetch done")	
		}).catch(err => {
			console.log(err)
		})
	}

	return (
		<ScrollView>
			{ !isPending && 
			<View style={styles.centered}>
				<TouchableOpacity onPress={() => createNewList()}>
							<View>
								<Image source={require('../assets/images/add.png')} />
								<Text>New list</Text>
							</View>
				</TouchableOpacity>
			</View>}
			{ isPending && <Text>Loading data...</Text>}
			{ !isPending && data && data.shoppingLists.map((shoppingList) => 
				(	
					<View style={styles.container}>
						<TouchableOpacity onPress={ ()=> navigation.navigate('List details', { shoppingList: shoppingList, onUpdate: updateList })}>
							<View style={styles.textContainer}>
								<Text style={styles.bigBlue}>Date: {shoppingList.created}</Text>
								<Text style={styles.bigBlue}>Items: {shoppingList.items.length}</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteList(shoppingList.id)}>
							<View style={styles.verticalCenter}>
								<Image source={require('../assets/images/delete.png')} />
								<Text>Delete</Text>
							</View>
						</TouchableOpacity>
					</View>
				)
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: 'center'
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
	verticalCenter: {
		marginLeft: 40,
		marginRight: 30,
		justifyContent: 'center', //Centered horizontally
    	alignItems: 'center', //Centered vertically
    	flex:1
	},
	centered: {
		justifyContent: 'center', //Centered horizontally
    	alignItems: 'center', //Centered vertically
		margin: 30
	},
	bigBlue: {
	  color: 'blue',
	  fontWeight: 'bold',
	  fontSize: 25
	},
	textContainer: {
		margin: 15,
		marginLeft: 30,
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36
	  }
  });
 
export default ShoppingListPreview;