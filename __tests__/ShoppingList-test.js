/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import { updateItemInShoppingList, removeItemFromShoppingList, addItemToShoppingList, ShoppingList} from '../src/components/ShoppingList';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 
 test('adding item to empty list adds item', () => {
	
	let shoppingList = {id: 1, items: [], created: "4.4.2020"}
	let expectedItem = {id: "1", name: "beer", checked: false}

	const updatedList = addItemToShoppingList({shoppingList: shoppingList, itemName:expectedItem.name})

	expect(updatedList.items).toEqual(
		[expectedItem]
	  );
  });

  test('adding item to non-empty list adds item', () => {
	
	let items = [{id: 1, name: "beer", checked: false}]
	let shoppingList = {id: 1, items: items, created: "4.4.2020"}
	let expectedItem = {id: 2, name: "milk", checked: false}

	const updatedList = addItemToShoppingList({shoppingList: shoppingList, itemName:expectedItem.name})

	expect(updatedList.items).toEqual(
		[...items, expectedItem]
	  );
  });

  test('removing existing item removes item', () => {
	
	let existingItem = {id: 1, name: "milk", checked: false}
	let items = [existingItem]
	let shoppingList = {id: 1, items: items, created: "4.4.2020"}
	

	const updatedList = removeItemFromShoppingList({shoppingList: shoppingList, item:existingItem})

	expect(updatedList.items).toEqual(
		[]
	  );
  });


  test('removing non-existing item does not change anything', () => {
	
	let existingItem = {id: 1, name: "milk", checked: false}
	let nonExistingItem = {id: 2, name: "beer", checked: false}
	let items = [existingItem]
	let shoppingList = {id: 1, items: items, created: "4.4.2020"}
	

	const updatedList = removeItemFromShoppingList({shoppingList: shoppingList, item:nonExistingItem})

	expect(updatedList.items).toEqual(
		[existingItem]
	  );
  });

  test('updating item updates item', () => {
	
	let oldItem = {id: 1, name: "milk", checked: false}
	let newItem = {id: 1, name: "milk", checked: true}
	let items = [oldItem]
	let shoppingList = {id: 1, items: items, created: "4.4.2020"}
	

	const updatedList = updateItemInShoppingList({shoppingList: shoppingList, item:newItem})

	expect(updatedList.items).toEqual(
		[newItem]
	  );
  });
 