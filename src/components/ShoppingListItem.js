import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/*
  Component to display a single shopping list item
*/
const ShoppingListItem = ({ item, onDelete, onChecked }) => {
    const [checked, setChecked] = useState(item.checked);

    /*
      Used for determining which image to use for the "checked" property
    */
    const getImageUrl = checked => {
        return checked
            ? require('../assets/images/checked.png')
            : require('../assets/images/unchecked.png');
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}></View>
            <Text style={styles.bigBlue}>{item.name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setChecked(!checked);
                        onChecked({
                            //Calls the update callback
                            id: item.id,
                            checked: !checked,
                            name: item.name,
                        });
                    }}>
                    <View>
                        <Image source={getImageUrl(checked)} />
                        <Text>Check</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item)}>
                    <View>
                        <Image
                            source={require('../assets/images/delete.png')}
                        />
                        <Text>Remove</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

//Styles

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
        justifyContent: 'space-between',

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
        alignItems: 'center',
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 15,
        flex: 3,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export default ShoppingListItem;
