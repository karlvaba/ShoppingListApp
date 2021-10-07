import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import CreateItem from './CreateItem';
import ShoppingListItem from './ShoppingListItem';

/*
    Helper function to return a new list by adding a new item
    to an existing shopping list.

    Returns the updated shopping list object
*/
export const addItemToShoppingList = ({ shoppingList, itemName }) => {
    if (shoppingList.items.length === 0) {
        const items = [{ id: '1', name: itemName, checked: false }];
        const newShoppingList = {
            id: shoppingList.id,
            created: shoppingList.created,
            items: items,
        };
        return newShoppingList;
    } else {
        const itemId =
            Math.max(...shoppingList.items.map(o => parseInt(o.id))) + 1;
        const newItems = [
            ...shoppingList.items,
            { id: itemId, name: itemName, checked: false },
        ];
        const newShoppingList = {
            id: shoppingList.id,
            created: shoppingList.created,
            items: newItems,
        };
        return newShoppingList;
    }
};

/*
    Helper function to return a new list by removing an new item
    from an existing shopping list.

    Returns the updated shopping list object
*/

export const removeItemFromShoppingList = ({ shoppingList, item }) => {
    const newItems = shoppingList.items.filter(
        listItem => listItem.id !== item.id,
    );
    const newShoppingList = {
        id: shoppingList.id,
        created: shoppingList.created,
        items: newItems,
    };
    return newShoppingList;
};

/*
    Helper function to return a new list by changing an item
    in the shopping list, found by the id of the item

    Returns the updated shopping list object
*/

export const updateItemInShoppingList = ({ shoppingList, item }) => {
    const filtered = shoppingList.items.filter(
        listItem => listItem.id !== item.id,
    );
    const newItems = [...filtered, item];
    const newShoppingList = {
        id: shoppingList.id,
        created: shoppingList.created,
        items: newItems,
    };
    return newShoppingList;
};

/*
    Component to display a single shopping list.
    It shows all the items in the list. There are options to add items, delete items,
    delete the list or cancel (go back to list preview)
*/

const ShoppingList = ({ navigation, route }) => {
    const [shoppingList, setShoppingList] = useState(route.params.shoppingList);
    const [addingItem, setAddingItem] = useState(false);

    /*
        Callback to add a new item; called from the "add item" dialog when
        the user submits a new item's name
    */
    const addItem = itemName => {
        setAddingItem(false);
        const updatedList = addItemToShoppingList({ shoppingList, itemName });
        console.log(updatedList);
        setShoppingList(updatedList);
    };

    /*
        Callback to delete an item from the shopping list. Called when delete
        button is pressed for the respective shopping list item.
    */
    const deleteItem = item => {
        const updatedList = removeItemFromShoppingList({ shoppingList, item });
        setShoppingList(updatedList);
    };

    /*
        Callback to change the state (checked or unchecked) of a shopping list item.
        Called when the state changes. 
    */
    const updateItem = item => {
        console.log(item);
        const updatedList = updateItemInShoppingList({ shoppingList, item });
        setShoppingList(updatedList);
    };

    //The view.
    return (
        <View>
            <ScrollView style={styles.mainScroll}>
                {shoppingList.items.map(item => (
                    <ShoppingListItem
                        key={item.id}
                        item={item}
                        onDelete={item => deleteItem(item)}
                        onChecked={item => updateItem(item)}></ShoppingListItem>
                ))}

                {addingItem && (
                    <CreateItem
                        onConfirm={itemName => addItem(itemName)}
                        onCancel={() => setAddingItem(false)}
                        visible={addingItem}></CreateItem>
                )}
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                    onPress={() => setAddingItem(true)}
                    disabled={addingItem}>
                    <View style={styles.verticalCenter}>
                        <Image
                            source={require('../assets/images/add.png')}
                            style={
                                addingItem
                                    ? styles.disabledImage
                                    : styles.regularImage
                            }
                        />
                        <Text>Add</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setAddingItem(false);
                        route.params.onSave(shoppingList);
                        navigation.navigate('All shopping lists');
                    }}
                    disabled={addingItem}>
                    <View style={styles.verticalCenter}>
                        <Image
                            source={require('../assets/images/save.png')}
                            style={
                                addingItem
                                    ? styles.disabledImage
                                    : styles.regularImage
                            }
                        />
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setAddingItem(false);
                        navigation.navigate('All shopping lists');
                    }}
                    disabled={addingItem}>
                    <View style={styles.verticalCenter}>
                        <Image
                            source={require('../assets/images/cancel.png')}
                            style={
                                addingItem
                                    ? styles.disabledImage
                                    : styles.regularImage
                            }
                        />
                        <Text>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setAddingItem(false);
                        route.params.onDelete(shoppingList.id);
                        navigation.navigate('All shopping lists');
                    }}
                    disabled={addingItem}>
                    <View style={styles.verticalCenter}>
                        <Image
                            source={require('../assets/images/delete.png')}
                            style={
                                addingItem
                                    ? styles.disabledImage
                                    : styles.regularImage
                            }
                        />
                        <Text>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//Styles
const styles = StyleSheet.create({
    mainScroll: {
        marginBottom: 100,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

        backgroundColor: '#ebeac5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        margin: 10,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
    },
    verticalCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    actionButtonContainer: {
        backgroundColor: '#d9ffee',
        borderTopWidth: 6,
        position: 'absolute',
        height: 100,
        left: 0,
        top: Dimensions.get('window').height - 150,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    verticalCenter: {
        marginLeft: 40,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    disabledImage: {
        opacity: 0.5,
    },
    regularImage: {
        opacity: 1,
    },
});

export default ShoppingList;
