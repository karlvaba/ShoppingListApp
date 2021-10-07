import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { update } from './DataAccess';

/*
  A screen to display all existing shopping list. The preview shows the date the list was created at,
  and the number of items that are in that list.
*/

const ShoppingListPreview = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    //Fetches data from cloud storage
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsPending(true);
            fetch('https://api.jsonbin.io/b/615e21759548541c29bf2c80/latest')
                .then(res => {
                    if (!res.ok) {
                        throw Error(
                            'could not fetch the data for that resource',
                        );
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setError(null);
                    setIsPending(false);
                    return unsubscribe;
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
        });
    }, []);

    /*
      Function to create a new shopping list. 
      Creates a new shopping list object with an empty array for items.
      Then navigates to the details view of that list (which is, of course, empty)
    */
    const createNewList = () => {
        const newId = Math.max(data.shoppingLists.map(o => parseInt(o.id))) + 1;
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const day = today.getDay();

        const date = day + '.' + month + '.' + year;

        const newShoppingList = { id: newId, created: date, items: [] };

        navigation.navigate('List details', {
            shoppingList: newShoppingList,
            onSave: onSave,
            onDelete: onDelete,
        });
    };

    /*
      Callback passed to a single shopping list. Called when 
      the "save" button is pressed in that list view. 
    */
    const onSave = shoppingList => {
        const filtered = data.shoppingLists.filter(
            existingList => existingList.id !== shoppingList.id,
        );
        const newLists = [...filtered, shoppingList];
        const newData = { shoppingLists: newLists };

        update(newData);
    };

    /*
      Callback passed to a single shopping list. Called when 
      the "delete" button is pressed in that list view. 
    */
    const onDelete = shoppingListId => {
        const filtered = data.shoppingLists.filter(
            existingList => existingList.id !== shoppingListId,
        );
        const newData = { shoppingLists: filtered };

        update(newData);
    };

    //The returned view

    return (
        <View
            style={isPending ? styles.loading : styles.normal}
            pointerEvents={isPending ? 'none' : 'auto'}>
            <ScrollView style={styles.mainScroll}>
                {!isPending &&
                    data &&
                    data.shoppingLists.map(shoppingList => (
                        <View style={styles.container} key={shoppingList.id}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('List details', {
                                        shoppingList: shoppingList,
                                        onSave: onSave,
                                        onDelete: onDelete,
                                    })
                                }>
                                <View style={styles.textContainer}>
                                    <Text style={styles.bigBlue}>
                                        Date: {shoppingList.created}
                                    </Text>
                                    <Text style={styles.bigBlue}>
                                        Items: {shoppingList.items.length}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity onPress={() => createNewList()}>
                    <View>
                        <Image source={require('../assets/images/add.png')} />
                        <Text>New list</Text>
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

        backgroundColor: '#d9ffee',
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
    verticalCenter: {
        marginLeft: 40,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
    },
    textContainer: {
        margin: 15,
        marginLeft: 30,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        opacity: 0.5,
    },
    normal: {
        opacity: 1,
    },
});

export default ShoppingListPreview;
